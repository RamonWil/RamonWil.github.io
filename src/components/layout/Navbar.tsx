import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from '../Magnetic';

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference pointer-events-none"
    >
      <Link to="/" className="text-xl font-display font-bold tracking-wider pointer-events-auto cursor-hover">
        RJW<span className="text-blue-500">.</span>
      </Link>
      <div className="flex gap-8 items-center pointer-events-auto">
        {navItems.map((item) => (
          <Magnetic key={item.name}>
            <Link 
              to={item.path} 
              className={`text-sm font-medium tracking-wide uppercase cursor-hover transition-colors ${
                location.pathname === item.path ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          </Magnetic>
        ))}
        <Magnetic>
          <a 
            href="mailto:ramonwilliams09@gmail.com" 
            className="text-sm font-medium tracking-wide uppercase px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors cursor-hover ml-4 hidden md:block"
          >
            Contact
          </a>
        </Magnetic>
      </div>
    </motion.nav>
  );
}
