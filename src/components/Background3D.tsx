import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'motion/react';
import * as THREE from 'three';

// Global continuous pointer coordinates across all DOM overlays and layers
const mouseTracker = {
  currentX: 0,
  currentY: 0,
  targetX: 0,
  targetY: 0,
  initialized: false,
};

if (typeof window !== 'undefined') {
  const updatePointer = (clientX: number, clientY: number) => {
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    mouseTracker.targetX = Math.max(-1, Math.min(1, x));
    mouseTracker.targetY = Math.max(-1, Math.min(1, y));

    if (!mouseTracker.initialized) {
      mouseTracker.currentX = mouseTracker.targetX;
      mouseTracker.currentY = mouseTracker.targetY;
      mouseTracker.initialized = true;
    }
  };

  const onPointerMove = (e: PointerEvent | MouseEvent) => {
    updatePointer(e.clientX, e.clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
}

// 1. The Floating Dust Particles
function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const count = 500;

  // Generate random coordinates in a sphere
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 16 * Math.cbrt(Math.random());
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 35;

      // Responsive, continuous mouse dampening (no input delay, tracks everywhere)
      const dampSpeed = Math.min(1, delta * 6);
      mouseTracker.currentX += (mouseTracker.targetX - mouseTracker.currentX) * dampSpeed;
      mouseTracker.currentY += (mouseTracker.targetY - mouseTracker.currentY) * dampSpeed;

      // Parallax mouse follow - responsive tracking with full travel speed
      const targetX = (mouseTracker.currentX * viewport.width) / 5;
      const targetY = (mouseTracker.currentY * viewport.height) / 5;

      const followSpeed = Math.min(1, delta * 5);
      ref.current.position.x += (targetX - ref.current.position.x) * followSpeed;
      ref.current.position.y += (targetY - ref.current.position.y) * followSpeed;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent opacity={0.6} color="#3b82f6" size={0.05} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

// 2. The Connecting Network Lines
function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();
  const count = 60;

  const { lines } = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) p.push(new THREE.Vector3((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15));
    
    // Draw line if points are close enough
    const lines = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (p[i].distanceTo(p[j]) < 5) {
          lines.push(p[i].x, p[i].y, p[i].z, p[j].x, p[j].y, p[j].z);
        }
      }
    }
    return { lines: new Float32Array(lines) };
  }, [count]);

  useFrame((_, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.x += delta / 40;
      lineRef.current.rotation.y += delta / 50;

      // Constellation parallax tracking
      const targetX = (mouseTracker.currentX * viewport.width) / 10;
      const targetY = (mouseTracker.currentY * viewport.height) / 10;

      const followSpeed = Math.min(1, delta * 4);
      lineRef.current.position.x += (targetX - lineRef.current.position.x) * followSpeed;
      lineRef.current.position.y += (targetY - lineRef.current.position.y) * followSpeed;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[lines, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export default function Background3D() {
  return (
    <motion.div
      id="ambient-background-system"
      initial={{ opacity: 0, y: -30, clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* 1. Top Zenith Ambient Light */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(59,130,246,0.22),transparent_70%)] pointer-events-none"
      />

      {/* 2. Cybernetic Grid Texture */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="absolute inset-0 bg-grid opacity-75 pointer-events-none"
      />

      {/* 3. Three.js Particle Swarm & Constellations Canvas */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ParticleSwarm />
          <Connections />
        </Canvas>
      </motion.div>

      {/* 4. Mid-to-Lower Ambient Depth Glow */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_65%)] pointer-events-none"
      />
    </motion.div>
  );
}

