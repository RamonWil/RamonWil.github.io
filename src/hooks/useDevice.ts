import { useState, useEffect } from 'react';

export function useDevice() {
  const [device, setDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      return {
        isMobile: width < 768,
        isTablet: width >= 768 && width <= 1024,
        isDesktop: width > 1024,
        isTouch
      };
    }
    return { isMobile: false, isTablet: false, isDesktop: true, isTouch: false };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width <= 1024,
        isDesktop: width > 1024,
        isTouch
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}
