import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import IntroAnimation from './components/IntroAnimation';
import Background3D from './components/Background3D';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const location = useLocation();

  return (
    <div className="bg-[#050505] bg-grid relative selection:bg-blue-500/30 selection:text-white min-h-screen flex flex-col">
      <CustomCursor />
      <IntroAnimation onComplete={() => setIntroDone(true)} />
      
      {introDone && (
        <>
          <Background3D />
          <Navbar />
          
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
          </div>
          
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
