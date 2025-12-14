/**
 * Dropdown Position Calculator Utility
 *
 * This utility provides functions to calculate optimal positioning for dropdown/popover
 * components relative to their trigger elements, ensuring they stay within viewport bounds.
 */

// ==================== CONSTANTS ====================

export const DEFAULT_DROPDOWN_GAP = {
  BOTTOM: 4, // Gap when dropdown opens below the trigger
  TOP: 17, // Gap when dropdown opens above the trigger
} as const

export const DEFAULT_VIEWPORT_PADDING = 8 // Minimum padding from viewport edges

// ==================== TYPES ====================

export type AlignOption = 'start' | 'center' | 'end'
export type PlacementOption = 'bottom' | 'top'

export interface PositionOptions {
  /** The bounding rect of the trigger element */
  triggerRect: DOMRect
  /** The bounding rect of the panel/dropdown element */
  panelRect: DOMRect
  /** Horizontal alignment relative to trigger */
  align?: AlignOption
  /** Custom gaps for top and bottom placement */
  gap?: {
    bottom?: number
    top?: number
  }
  /** Minimum padding from viewport edges */
  viewportPadding?: number
  /** Viewport height (defaults to window.innerHeight) */
  viewportHeight?: number
  /** Viewport width (defaults to window.innerWidth) */
  viewportWidth?: number
}

export interface PositionResult {
  /** Top position in pixels */
  top: number
  /** Left position in pixels */
  left: number
  /** Minimum width (usually matches trigger width) */
  minWidth: number
  /** Final placement: whether dropdown is above or below trigger */
  placement: PlacementOption
}

// ==================== MAIN FUNCTION ====================

/**
 * Calculate optimal position for a dropdown/popover element
 *
 * This function determines the best position for a floating element (dropdown, popover, etc.)
 * relative to its trigger element. It automatically adjusts positioning to keep the element
 * within viewport bounds.
 *
 * @param options - Configuration options for position calculation
 * @returns Position coordinates and placement information
 *
 * @example
 * ```ts
 * const position = calculateDropdownPosition({
 *   triggerRect: button.getBoundingClientRect(),
 *   panelRect: dropdown.getBoundingClientRect(),
 *   align: 'start',
 * })
 *
 * dropdown.style.top = `${position.top}px`
 * dropdown.style.left = `${position.left}px`
 * ```
 */
export function calculateDropdownPosition(options: PositionOptions): PositionResult {
  const {
    triggerRect,
    panelRect,
    align = 'start',
    gap = {},
    viewportPadding = DEFAULT_VIEWPORT_PADDING,
    viewportHeight = window.innerHeight,
    viewportWidth = window.innerWidth,
  } = options

  const gapBottom = gap.bottom ?? DEFAULT_DROPDOWN_GAP.BOTTOM
  const gapTop = gap.top ?? DEFAULT_DROPDOWN_GAP.TOP

  // Initial position: below the trigger
  let top = triggerRect.bottom + gapBottom
  let left = triggerRect.left
  let placement: PlacementOption = 'bottom'

  // ==================== HORIZONTAL ALIGNMENT ====================

  if (align === 'center') {
    // Center the dropdown relative to trigger
    left = triggerRect.left + triggerRect.width / 2 - panelRect.width / 2
  } else if (align === 'end') {
    // Align right edges
    left = triggerRect.right - panelRect.width
  }
  // 'start' alignment uses the initial left position

  // ==================== VERTICAL POSITIONING ====================

  // Check if dropdown would overflow bottom of viewport
  const wouldOverflowBottom = top + panelRect.height > viewportHeight
  const hasSpaceAbove = triggerRect.top > panelRect.height

  if (wouldOverflowBottom && hasSpaceAbove) {
    // Position above trigger instead
    top = triggerRect.top - panelRect.height - gapTop
    placement = 'top'
  }

  // ==================== HORIZONTAL BOUNDARY CHECKS ====================

  // Check if would go off right edge
  const right = left + panelRect.width
  if (right > viewportWidth) {
    left = viewportWidth - panelRect.width - viewportPadding
  }

  // Check if would go off left edge
  if (left < viewportPadding) {
    left = viewportPadding
  }

  // ==================== RETURN RESULT ====================

  return {
    top,
    left,
    minWidth: triggerRect.width,
    placement,
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get the bounding rect of an element safely
 * Returns null if element doesn't exist
 */
export function getElementRect(element: HTMLElement | null): DOMRect | null {
  if (!element) return null
  return element.getBoundingClientRect()
}

/**
 * Convert PositionResult to CSS style object
 * Useful for applying position directly to element style
 */
export function positionResultToStyle(result: PositionResult): Record<string, string> {
  return {
    top: `${result.top}px`,
    left: `${result.left}px`,
    minWidth: `${result.minWidth}px`,
  }
}
