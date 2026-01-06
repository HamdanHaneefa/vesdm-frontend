import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  const location = useLocation();
  
  useEffect(() => {
    const isPortalPage = location.pathname.includes('/portal/');
    
    // For portal pages, target the scroll container
    if (isPortalPage) {
      // Wait for portal container to be ready
      const initPortalScroll = () => {
        const portalContainer = document.querySelector('.portal-content-scroll');
        if (!portalContainer) return;

        const lenis = new Lenis({
          wrapper: portalContainer,
          content: portalContainer.firstElementChild,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
          lenis.destroy();
        };
      };

      // Small delay to ensure DOM is ready
      const timer = setTimeout(initPortalScroll, 100);
      return () => clearTimeout(timer);
    }

    // For public pages, use window scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);
};

export default useSmoothScroll;
