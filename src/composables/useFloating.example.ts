/**
 * Example: Popover Component using positionUtils
 *
 * This is a demonstration of how to use the shared position utilities
 * in other floating components like Popover, Tooltip, etc.
 */

import { nextTick, ref, watch, type Ref } from 'vue'
import {
  calculateDropdownPosition,
  getElementRect,
  positionResultToStyle,
  type AlignOption,
} from '../lib/positionUtils'

interface UseFloatingOptions {
  triggerRef: Ref<HTMLElement | undefined>
  floatingRef: Ref<HTMLElement | undefined>
  isOpen: Ref<boolean>
  align?: AlignOption
  offset?: {
    bottom?: number
    top?: number
  }
}

/**
 * Composable for managing floating element positioning
 * Can be used in Popover, Tooltip, Dropdown Menu, etc.
 */
export function useFloating(options: UseFloatingOptions) {
  const { triggerRef, floatingRef, isOpen, align = 'start', offset } = options

  const floatingStyle = ref<Record<string, string>>({})
  const placement = ref<'top' | 'bottom'>('bottom')

  const updatePosition = () => {
    const triggerRect = getElementRect(triggerRef.value ?? null)
    const floatingRect = getElementRect(floatingRef.value ?? null)

    if (!triggerRect || !floatingRect) return

    const position = calculateDropdownPosition({
      triggerRect,
      panelRect: floatingRect,
      align,
      gap: offset,
    })

    floatingStyle.value = positionResultToStyle(position)
    placement.value = position.placement
  }

  // Update position when opened
  watch(isOpen, async (newVal) => {
    if (newVal) {
      await nextTick()
      updatePosition()
    }
  })

  // Update on window resize
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updatePosition)
  }

  return {
    floatingStyle,
    placement,
    updatePosition,
  }
}

/**
 * USAGE EXAMPLE IN A POPOVER COMPONENT:
 *
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useFloating } from './composables/useFloating'
 *
 * const triggerRef = ref<HTMLElement>()
 * const popoverRef = ref<HTMLElement>()
 * const isOpen = ref(false)
 *
 * const { floatingStyle, placement } = useFloating({
 *   triggerRef,
 *   floatingRef: popoverRef,
 *   isOpen,
 *   align: 'center',
 * })
 * </script>
 *
 * <template>
 *   <button ref="triggerRef" @click="isOpen = !isOpen">
 *     Open Popover
 *   </button>
 *
 *   <Teleport to="body">
 *     <div
 *       v-if="isOpen"
 *       ref="popoverRef"
 *       :style="floatingStyle"
 *       :data-placement="placement"
 *       class="fixed bg-white shadow-lg rounded-lg p-4"
 *     >
 *       Popover content here
 *     </div>
 *   </Teleport>
 * </template>
 */
