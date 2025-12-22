import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseFABScrollOptions {
  /** Scroll threshold before hiding (in pixels) */
  threshold?: number;
  /** Element to attach scroll listener to (default: window) */
  scrollElement?: HTMLElement | null;
}

export interface UseFABScrollResult {
  /** Whether the FAB should be visible */
  visible: boolean;
  /** Manually show the FAB */
  show: () => void;
  /** Manually hide the FAB */
  hide: () => void;
}

/**
 * Hook to control FAB visibility based on scroll direction.
 * Hides FAB when scrolling down, shows when scrolling up.
 */
export function useFABScroll(options: UseFABScrollOptions = {}): UseFABScrollResult {
  const { threshold = 10, scrollElement = null } = options;
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const target = scrollElement || window;

    const getScrollY = () => {
      if (scrollElement) {
        return scrollElement.scrollTop;
      }
      return window.scrollY || window.pageYOffset;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = getScrollY();
          const diff = currentScrollY - lastScrollY.current;

          // At the top of the page, always show
          if (currentScrollY <= 0) {
            setVisible(true);
          }
          // Scrolling down past threshold - hide
          else if (diff > threshold) {
            setVisible(false);
          }
          // Scrolling up past threshold - show
          else if (diff < -threshold) {
            setVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [scrollElement, threshold]);

  return { visible, show, hide };
}

export default useFABScroll;
