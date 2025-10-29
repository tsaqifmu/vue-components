<script setup lang="ts">
import { cva } from 'class-variance-authority'
import {
  computed,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '../../lib/scrollLock'
import { cn } from '../../lib/utils'
import { Z_INDEX } from '../z-index'

const multiSelectContentVariants = cva(
  'min-w-[8rem] rounded-lg bg-surface-primary-white shadow-card-float border border-gray-300 py-1 max-h-[var(--radix-select-content-available-height)] overflow-y-auto',
  {
    variants: {
      position: {
        top: 'origin-bottom',
        bottom: 'origin-top',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  },
)

interface Props {
  position?: 'bottom' | 'top'
  class?: string
  teleport?: boolean
  align?: 'start' | 'center' | 'end'
}

interface MultiSelectContext {
  id: string
  isOpen: Ref<boolean>
  modelValue: Ref<Array<string | number>>
  open: () => void
  close: () => void
  toggle: () => void
  selectValue: (value: string | number, label?: string) => void
  removeValue: (value: string | number) => void
  isSelected: (value: string | number) => boolean
  registerItem: (value: string | number, label: string) => void
  getDisplayText: () => string
  getSelectedLabels: () => Array<{ value: string | number; label: string }>
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  teleport: true,
  align: 'start',
})

const contextKey = inject<InjectionKey<MultiSelectContext>>('multi-select-context-key')
const multiSelect = contextKey ? inject(contextKey) : null

// --- State & Computed ----
const panelRef = ref<HTMLElement>()
const isPositioned = ref(false)
const teleportStyle = ref<Record<string, string>>({})

const isMultiSelectOpen = computed(() => multiSelect?.isOpen.value ?? false)

const overlayClasses = computed(() => {
  return cn(`fixed inset-0 z-[${Z_INDEX.MULTI_SELECT_OVERLAY}] w-screen bg-transparent`)
})

const panelClasses = computed(() => {
  const baseClasses = multiSelectContentVariants({
    position: props.position as 'bottom' | 'top',
  })

  const positionClass = props.teleport
    ? `fixed z-[${Z_INDEX.MULTI_SELECT_CONTENT}]`
    : `absolute z-[${Z_INDEX.NON_TELEPORT.MULTI_SELECT_CONTENT}] top-full mt-1`

  return cn(baseClasses, positionClass, props.class)
})

const combinedStyle = computed(() => {
  return teleportStyle.value
})

// --- Constants ----
const DROPDOWN_GAP_BOTTOM = 4 // Gap when dropdown opens below the trigger
const DROPDOWN_GAP_TOP = 17 // Gap when dropdown opens above the trigger
const VIEWPORT_PADDING = 8 // Minimum padding from viewport edges

// --- Methods ----
// Calculate position when teleported
const updatePosition = () => {
  if (!props.teleport || !isMultiSelectOpen.value) return

  const container = document.querySelector(
    `[data-state="${multiSelect?.isOpen.value ? 'open' : 'closed'}"]`,
  )
  if (!container) return

  // Find the trigger button specifically (not badge buttons)
  const button = container.querySelector('button[data-multi-select-trigger]')
  if (!button) return

  const buttonRect = button.getBoundingClientRect()
  const panelElement = panelRef.value

  if (!panelElement) return

  const panelRect = panelElement.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // Calculate position
  let top = buttonRect.bottom + DROPDOWN_GAP_BOTTOM
  let left = buttonRect.left

  // Alignment
  if (props.align === 'center') {
    left = buttonRect.left + buttonRect.width / 2 - panelRect.width / 2
  } else if (props.align === 'end') {
    left = buttonRect.right - panelRect.width
  }

  // Check if would go off bottom
  if (top + panelRect.height > viewportHeight && buttonRect.top > panelRect.height) {
    top = buttonRect.top - panelRect.height - DROPDOWN_GAP_TOP
  }

  // Check if would go off right edge
  const right = left + panelRect.width
  if (right > window.innerWidth) {
    left = window.innerWidth - panelRect.width - VIEWPORT_PADDING
  }

  // Check if would go off left edge
  if (left < VIEWPORT_PADDING) {
    left = VIEWPORT_PADDING
  }

  teleportStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    minWidth: `${buttonRect.width}px`,
  }
}

// --- Watchers ---
// Watch for multi select open state changes
watch(isMultiSelectOpen, async (newVal) => {
  if (newVal) {
    if (props.teleport) {
      isPositioned.value = false
      lockBodyScroll()

      await nextTick()
      updatePosition()

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isPositioned.value = true
        })
      })
    }
  } else {
    if (props.teleport) {
      unlockBodyScroll()
      isPositioned.value = false
    }
  }
})

// --- Lifecycle Hooks ----
// Update position on resize
onMounted(() => {
  if (props.teleport) {
    window.addEventListener('resize', updatePosition)
  }
})

onUnmounted(() => {
  if (props.teleport) {
    window.removeEventListener('resize', updatePosition)
    if (isMultiSelectOpen.value) {
      unlockBodyScroll()
    }
  }
})
</script>

<template>
  <!-- Overlay -->
  <Teleport to="body" :disabled="!teleport">
    <Transition
      name="multi-select-overlay"
      enter-active-class="multi-select-overlay-enter-active"
      enter-from-class="multi-select-overlay-enter-from"
      leave-active-class="multi-select-overlay-leave-active"
      leave-to-class="multi-select-overlay-leave-to"
    >
      <div v-if="isMultiSelectOpen" :class="overlayClasses" @click="multiSelect?.close()"></div>
    </Transition>
  </Teleport>

  <!-- Multi Select Content Panel -->
  <Teleport to="body" :disabled="!teleport">
    <div
      v-if="isMultiSelectOpen"
      ref="panelRef"
      :class="panelClasses"
      :style="combinedStyle"
      :data-state="isPositioned ? 'positioned' : 'calculating'"
      role="listbox"
      :aria-labelledby="multiSelect?.id"
      @click.stop
    >
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
/* Overlay transitions */
.multi-select-overlay-enter-active,
.multi-select-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.multi-select-overlay-enter-from,
.multi-select-overlay-leave-to {
  opacity: 0;
}

/* Initial state - hidden while calculating position */
[data-state='calculating'] {
  opacity: 0;
  transform: scale(0.95);
  transition: none;
}

/* Final state - visible with smooth transition */
[data-state='positioned'] {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out;
}
</style>
