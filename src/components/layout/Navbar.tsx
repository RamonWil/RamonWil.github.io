import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Mail, ArrowUpRight } from 'lucide-react';
import Magnetic from '../Magnetic';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    <>
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-6 pointer-events-none"
      >
        <div
          className={`max-w-5xl mx-auto rounded-full transition-all duration-300 pointer-events-auto border ${
            scrolled
              ? 'bg-[#07090e]/95 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl py-2 px-3 sm:px-6'
              : 'bg-[#080a0f]/85 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl py-2.5 px-3.5 sm:px-6'
          } flex items-center justify-between`}
        >
          {/* Brand / Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group cursor-hover select-none min-h-[44px]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-display font-bold text-white group-hover:border-blue-400/50 transition-colors">
              RW
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white flex items-center">
              Ramon<span className="text-blue-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links (>= lg screens for optimal tablet/desktop balance) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/5">
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

          {/* Desktop Right Actions (>= lg) */}
          <div className="hidden lg:flex items-center gap-2.5">
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

          {/* Mobile & Tablet Quick Actions + Hamburger Button (< lg) */}
          <div className="flex items-center gap-2 lg:hidden pointer-events-auto">
            <a
              href="mailto:ramonwilliams09@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-gray-200 px-3 py-1.5 rounded-full shadow transition-all font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer min-w-[44px] min-h-[44px]"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
            />

            {/* Mobile Sheet / Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 sm:top-24 left-3 right-3 sm:left-6 sm:right-6 max-w-lg mx-auto z-50 rounded-3xl bg-[#080a0f]/95 border border-white/15 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-3xl lg:hidden flex flex-col gap-2"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 px-1">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold font-sans">
                  Navigation
                </span>
                <span className="text-xs text-blue-400 font-sans flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Available for work
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1.5 py-1">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-semibold uppercase tracking-wider flex items-center justify-between transition-all min-h-[48px] ${
                        active
                          ? 'bg-blue-500/15 text-white border border-blue-500/30'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                        {item.name}
                      </span>
                      <ArrowUpRight size={16} className={active ? 'text-blue-400' : 'text-gray-500'} />
                    </Link>
                  );
                })}
              </div>

              <div className="h-[1px] bg-white/10 my-1" />

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="./assets/files/Public_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-white/15 text-gray-200 hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-colors min-h-[48px]"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Resume</span>
                </a>

                <a
                  href="mailto:ramonwilliams09@gmail.com"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white text-black hover:bg-gray-200 text-xs font-semibold uppercase tracking-wider transition-colors min-h-[48px] font-bold"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </div>

              {/* Social links row */}
              <div className="flex items-center justify-center gap-4 pt-3 mt-1 border-t border-white/10 text-gray-400">
                <a
                  href="https://linkedin.com/in/itsramon-williams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon />
                </a>
                <span className="text-xs font-sans text-gray-500">
                  Ramon J. Williams &copy; {new Date().getFullYear()}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
