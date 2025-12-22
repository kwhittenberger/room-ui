import { createContext, useContext, useMemo } from 'react';
import { useResponsive, type Breakpoint, type UseResponsiveResult } from './useResponsive';

export interface MobileContextValue extends UseResponsiveResult {
  /** Whether to prefer touch interactions */
  preferTouch: boolean;
  /** Whether the device supports touch */
  hasTouch: boolean;
}

const MobileContext = createContext<MobileContextValue | null>(null);

export interface MobileProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Force mobile mode regardless of screen size */
  forceMobile?: boolean;
  /** Force desktop mode regardless of screen size */
  forceDesktop?: boolean;
}

/**
 * Provider for mobile-related context and responsive state.
 */
function MobileProvider({
  children,
  forceMobile = false,
  forceDesktop = false,
}: MobileProviderProps) {
  const responsive = useResponsive();

  const value = useMemo<MobileContextValue>(() => {
    const hasTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Apply forced modes
    const isMobile = forceMobile ? true : forceDesktop ? false : responsive.isMobile;
    const isDesktop = forceDesktop ? true : forceMobile ? false : responsive.isDesktop;

    return {
      ...responsive,
      isMobile,
      isDesktop,
      hasTouch,
      preferTouch: hasTouch && isMobile,
    };
  }, [responsive, forceMobile, forceDesktop]);

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
}

/**
 * Hook to access mobile context.
 * Must be used within a MobileProvider.
 */
function useMobileContext(): MobileContextValue {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error('useMobileContext must be used within a MobileProvider');
  }
  return context;
}

/**
 * Hook to safely access mobile context (returns null if not in provider).
 */
function useMobileContextSafe(): MobileContextValue | null {
  return useContext(MobileContext);
}

export interface MobileOnlyProps {
  /** Content to show only on mobile */
  children: React.ReactNode;
  /** Fallback content for non-mobile */
  fallback?: React.ReactNode;
}

/**
 * Renders children only on mobile devices.
 */
function MobileOnly({ children, fallback = null }: MobileOnlyProps) {
  const context = useContext(MobileContext);
  const responsive = useResponsive();

  const isMobile = context?.isMobile ?? responsive.isMobile;

  if (!isMobile) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export interface DesktopOnlyProps {
  /** Content to show only on desktop */
  children: React.ReactNode;
  /** Fallback content for non-desktop */
  fallback?: React.ReactNode;
}

/**
 * Renders children only on desktop devices.
 */
function DesktopOnly({ children, fallback = null }: DesktopOnlyProps) {
  const context = useContext(MobileContext);
  const responsive = useResponsive();

  const isDesktop = context?.isDesktop ?? responsive.isDesktop;

  if (!isDesktop) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export interface ResponsiveProps {
  /** Content to show on mobile */
  mobile?: React.ReactNode;
  /** Content to show on tablet */
  tablet?: React.ReactNode;
  /** Content to show on desktop */
  desktop?: React.ReactNode;
  /** Breakpoint for mobile/tablet split (default: md) */
  mobileBreakpoint?: Breakpoint;
  /** Breakpoint for tablet/desktop split (default: lg) */
  desktopBreakpoint?: Breakpoint;
}

/**
 * Renders different content based on screen size.
 */
function Responsive({
  mobile,
  tablet,
  desktop,
  mobileBreakpoint = 'md',
  desktopBreakpoint = 'lg',
}: ResponsiveProps) {
  const context = useContext(MobileContext);
  const responsive = useResponsive();

  const r = context ?? responsive;

  // Desktop
  if (r.isUp(desktopBreakpoint)) {
    return <>{desktop ?? tablet ?? mobile}</>;
  }

  // Tablet
  if (r.isUp(mobileBreakpoint)) {
    return <>{tablet ?? mobile}</>;
  }

  // Mobile
  return <>{mobile}</>;
}

export {
  MobileContext,
  MobileProvider,
  useMobileContext,
  useMobileContextSafe,
  MobileOnly,
  DesktopOnly,
  Responsive,
};
