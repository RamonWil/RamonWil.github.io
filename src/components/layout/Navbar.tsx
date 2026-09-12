import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Mail, ArrowUpRight } from 'lucide-react';
import Magnetic from '../Magnetic';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none"
    >
      <div
        className={`max-w-5xl mx-auto rounded-full transition-all duration-500 pointer-events-auto border ${
          scrolled
            ? 'bg-[#07090e]/90 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl py-2 px-4 sm:px-6'
            : 'bg-[#080a0f]/75 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl py-2.5 px-4 sm:px-6'
        } flex items-center justify-between`}
      >
        {/* Brand / Monogram */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-hover select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-display font-bold text-white group-hover:border-blue-400/50 transition-colors">
            RW
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white flex items-center">
            Ramon<span className="text-blue-400">.</span>
          </span>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/5">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Magnetic key={item.name} strength={0.2}>
                <Link
                  to={item.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors duration-300 block cursor-hover ${
                    active ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/15 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <Magnetic strength={0.2}>
            <a
              href="./assets/files/Public_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all cursor-hover"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href="mailto:ramonwilliams09@gmail.com"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-gray-200 px-4 py-1.5 rounded-full shadow-lg transition-all cursor-hover font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/10 transition-colors pointer-events-auto cursor-hover"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown with Fade In/Out */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="max-w-5xl mx-auto mt-2 rounded-2xl bg-[#080a0f]/95 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl pointer-events-auto md:hidden flex flex-col gap-1.5"
          >
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                </Link>
              );
            })}

            <div className="h-[1px] bg-white/10 my-1" />

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="./assets/files/Public_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/10 text-gray-200 hover:bg-white/5 text-xs font-semibold uppercase tracking-wider"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Resume</span>
              </a>
              <a
                href="mailto:ramonwilliams09@gmail.com"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-semibold uppercase tracking-wider"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
