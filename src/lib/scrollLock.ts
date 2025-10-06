/**
 * Scroll Lock Utility
 *
 * Manages body scroll locking with support for nested locks (e.g., modal + dropdown).
 * Uses a reference counter to ensure scroll is only unlocked when all locks are released.
 */

let lockCount = 0
let originalPaddingRight = ''
let originalOverflow = ''

/**
 * Get scrollbar width for layout shift prevention
 * Industry standard approach: window.innerWidth - document.documentElement.clientWidth
 */
const getScrollbarWidth = (): number => {
  return window.innerWidth - document.documentElement.clientWidth
}

/**
 * Lock body scroll and prevent layout shift
 * Safe to call multiple times - uses reference counting
 */
export const lockBodyScroll = (): void => {
  // Increment counter first
  lockCount++

  // Only apply styles on first lock
  if (lockCount === 1) {
    // Store original values
    originalPaddingRight = document.body.style.paddingRight
    originalOverflow = document.body.style.overflow

    const scrollbarWidth = getScrollbarWidth()

    // Add padding compensation if there's actually a scrollbar
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    document.body.style.overflow = 'hidden'
  }
}

/**
 * Unlock body scroll
 * Safe to call multiple times - only unlocks when all locks are released
 */
export const unlockBodyScroll = (): void => {
  // Decrement counter
  lockCount = Math.max(0, lockCount - 1)

  // Only remove styles when counter reaches 0
  if (lockCount === 0) {
    document.body.style.paddingRight = originalPaddingRight
    document.body.style.overflow = originalOverflow
  }
}

/**
 * Force unlock (useful for cleanup in edge cases)
 * Use with caution - this bypasses the counter system
 */
export const forceUnlockBodyScroll = (): void => {
  lockCount = 0
  document.body.style.paddingRight = originalPaddingRight
  document.body.style.overflow = originalOverflow
}

/**
 * Get current lock count (useful for debugging)
 */
export const getLockCount = (): number => {
  return lockCount
}
