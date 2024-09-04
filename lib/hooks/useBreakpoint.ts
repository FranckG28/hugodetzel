import { useWindowSize } from "usehooks-ts"

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const { width } = useWindowSize()
  return width >= breakpoints[breakpoint]
}
