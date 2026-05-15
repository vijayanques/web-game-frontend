'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronUp } from './Icons';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] group"
          aria-label="Scroll to top"
        >
          {/* Main Button with Theme-consistent Orange and Glow */}
          <div className="relative group p-[2px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20 transition-all duration-300">
            {/* Outer Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />

            {/* Content Container */}
            <div className=" cursor-pointer relative bg-white rounded-full p-2.5 flex items-center justify-center overflow-hidden">
              {/* Subtle background pattern/gradient */}
              <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />

              <IconChevronUp size={22} className=" cursor-pointer text-orange-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          {/* Tooltip - Matching the site's dark elements */}
          {/* <div className=" cursor-pointer absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/10 shadow-xl">
            Scroll Up
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 border-l border-t border-white/10 bg-gray-900/90 rotate-45 -ml-1" />
          </div> */}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
