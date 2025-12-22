import { useState, useEffect, useCallback } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Get the current breakpoint based on window width.
 */
export function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * Check if the current breakpoint is at least the given breakpoint.
 */
export function isBreakpointUp(current: Breakpoint, target: Breakpoint): boolean {
  return breakpoints[current] >= breakpoints[target];
}

/**
 * Check if the current breakpoint is at most the given breakpoint.
 */
export function isBreakpointDown(current: Breakpoint, target: Breakpoint): boolean {
  return breakpoints[current] < breakpoints[target];
}

export interface UseResponsiveResult {
  /** Current breakpoint */
  breakpoint: Breakpoint;
  /** Window width */
  width: number;
  /** Window height */
  height: number;
  /** Check if current breakpoint is at least the target */
  isUp: (target: Breakpoint) => boolean;
  /** Check if current breakpoint is below the target */
  isDown: (target: Breakpoint) => boolean;
  /** Is mobile (below md breakpoint) */
  isMobile: boolean;
  /** Is tablet (md to lg breakpoint) */
  isTablet: boolean;
  /** Is desktop (lg and above) */
  isDesktop: boolean;
}

/**
 * Hook to get responsive information about the current viewport.
 */
export function useResponsive(): UseResponsiveResult {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoint = getBreakpoint(dimensions.width);

  const isUp = useCallback(
    (target: Breakpoint) => isBreakpointUp(breakpoint, target),
    [breakpoint]
  );

  const isDown = useCallback(
    (target: Breakpoint) => isBreakpointDown(breakpoint, target),
    [breakpoint]
  );

  return {
    breakpoint,
    width: dimensions.width,
    height: dimensions.height,
    isUp,
    isDown,
    isMobile: isBreakpointDown(breakpoint, 'md'),
    isTablet: isBreakpointUp(breakpoint, 'md') && isBreakpointDown(breakpoint, 'lg'),
    isDesktop: isBreakpointUp(breakpoint, 'lg'),
  };
}

/**
 * Hook to check if the current viewport is mobile.
 */
export function useIsMobile(): boolean {
  const { isMobile } = useResponsive();
  return isMobile;
}

/**
 * Hook to get the current breakpoint.
 */
export function useBreakpoint(): Breakpoint {
  const { breakpoint } = useResponsive();
  return breakpoint;
}

/**
 * Hook to run a media query.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use addEventListener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Fallback for older browsers
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, [query]);

  return matches;
}

export default useResponsive;
