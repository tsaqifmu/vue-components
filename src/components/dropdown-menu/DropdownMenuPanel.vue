<template>
  <!-- Overlay -->
  <Teleport to="body" :disabled="!teleport">
    <Transition
      name="dropdown-menu-overlay"
      enter-active-class="dropdown-menu-overlay-enter-active"
      enter-from-class="dropdown-menu-overlay-enter-from"
      leave-active-class="dropdown-menu-overlay-leave-active"
      leave-to-class="dropdown-menu-overlay-leave-to"
    >
      <div v-if="isDropdownMenuOpen" :class="overlayClasses" @click="dropdownMenu?.close()"></div>
    </Transition>
  </Teleport>

  <!-- Dropdown Menu Panel -->
  <Teleport to="body" :disabled="!teleport">
    <div
      v-if="isDropdownMenuOpen"
      ref="panelRef"
      :class="panelClasses"
      :style="combinedStyle"
      :data-state="isPositioned ? 'positioned' : 'calculating'"
      role="menu"
      :aria-labelledby="dropdownMenu?.id"
      @click.stop
    >
      <slot />
    </div>
  </Teleport>
</template>

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

const dropdownMenuPanelVariants = cva(
  'w-48 rounded-md bg-surface-primary-white shadow-card-float border border-gray-300 py-1',
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
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  teleport: true,
})

interface DropdownMenuContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const contextKey = inject<InjectionKey<DropdownMenuContext>>('dropdown-menu-context-key')
const dropdownMenu = contextKey ? inject(contextKey) : null

const isDropdownMenuOpen = computed(() => dropdownMenu?.isOpen.value ?? false)

const panelRef = ref<HTMLElement>()
const teleportStyle = ref<Record<string, string>>({})
const isPositioned = ref(false)

const overlayClasses = computed(() => {
  return cn(`fixed inset-0 z-[${Z_INDEX.DROPDOWN_MENU_OVERLAY}] w-screen bg-transparent`)
})

const panelClasses = computed(() => {
  const baseClasses = dropdownMenuPanelVariants({
    position: props.position as 'bottom' | 'top',
  })

  // Add position class based on teleport mode
  const positionClass = props.teleport
    ? `fixed z-[${Z_INDEX.DROPDOWN_MENU_PANEL}]`
    : `absolute z-[${Z_INDEX.NON_TELEPORT.DROPDOWN_MENU_PANEL}] top-full mt-1`

  return cn(baseClasses, positionClass, props.class)
})

// Combine teleport style with positioning
const combinedStyle = computed(() => {
  return teleportStyle.value
})

// Calculate position when teleported
const updatePosition = () => {
  if (!props.teleport || !isDropdownMenuOpen.value) return

  // Find the button element (parent of DropdownMenuPanel)
  const container = document.querySelector(
    `[data-state="${dropdownMenu?.isOpen.value ? 'open' : 'closed'}"]`,
  )
  if (!container) return

  const button = container.querySelector('button')
  if (!button) return

  const buttonRect = button.getBoundingClientRect()
  const panelElement = panelRef.value

  if (!panelElement) return

  const panelRect = panelElement.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // Calculate position
  let top = buttonRect.bottom + 4 // 4px gap
  let left = buttonRect.left

  // Check if dropdown would go off bottom of viewport
  if (top + panelRect.height > viewportHeight && buttonRect.top > panelRect.height) {
    // Open upward instead
    top = buttonRect.top - panelRect.height - 4
  }

  // Check if dropdown would go off right edge
  const right = left + panelRect.width
  if (right > window.innerWidth) {
    left = window.innerWidth - panelRect.width - 8
  }

  teleportStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    // Don't force width - let CSS classes handle it (w-48, etc)
  }
}

// Watch for dropdown menu open state changes
watch(isDropdownMenuOpen, async (newVal) => {
  if (newVal) {
    if (props.teleport) {
      // Reset positioned state when opening
      isPositioned.value = false
      lockBodyScroll()

      // Wait for DOM to render
      await nextTick()

      // Calculate position
      updatePosition()

      // Use requestAnimationFrame to ensure browser has painted the position
      // before we trigger the transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Double RAF ensures position is fully applied
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

// Update position on resize (scroll listener removed since body scroll is locked)
onMounted(() => {
  if (props.teleport) {
    window.addEventListener('resize', updatePosition)
  }
})

onUnmounted(() => {
  if (props.teleport) {
    window.removeEventListener('resize', updatePosition)
    // Ensure scroll is unlocked on unmount
    if (isDropdownMenuOpen.value) {
      unlockBodyScroll()
    }
  }
})
</script>

<style scoped>
/* Overlay transitions */
.dropdown-menu-overlay-enter-active,
.dropdown-menu-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.dropdown-menu-overlay-enter-from,
.dropdown-menu-overlay-leave-to {
  opacity: 0;
}

/* Initial state - hidden while calculating position */
[data-state='calculating'] {
  opacity: 0;
  transform: scale(0.95);
  transition: none; /* No transition while calculating */
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
