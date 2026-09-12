import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. The Floating Dust Particles
function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
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

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 35;
      // Parallax mouse follow
      ref.current.position.x += ((mouse.x * viewport.width) / 5 - ref.current.position.x) * 0.02;
      ref.current.position.y += ((mouse.y * viewport.height) / 5 - ref.current.position.y) * 0.02;
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
  const { mouse, viewport } = useThree();
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

  useFrame((state, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.x += delta / 40;
      lineRef.current.rotation.y += delta / 50;
      lineRef.current.position.x += ((mouse.x * viewport.width) / 10 - lineRef.current.position.x) * 0.01;
      lineRef.current.position.y += ((mouse.y * viewport.height) / 10 - lineRef.current.position.y) * 0.01;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ParticleSwarm />
        <Connections />
      </Canvas>
    </div>
  );
}

