<template>
  <!-- Overlay -->
  <Teleport to="body" :disabled="!teleport">
    <Transition
      name="menu-overlay"
      enter-active-class="menu-overlay-enter-active"
      enter-from-class="menu-overlay-enter-from"
      leave-active-class="menu-overlay-leave-active"
      leave-to-class="menu-overlay-leave-to"
    >
      <div v-if="isMenuOpen" :class="overlayClasses" @click="menu?.close()"></div>
    </Transition>
  </Teleport>

  <!-- Menu Panel -->
  <Teleport to="body" :disabled="!teleport">
    <div
      v-if="isMenuOpen"
      ref="panelRef"
      :class="panelClasses"
      :style="combinedStyle"
      :data-state="isPositioned ? 'positioned' : 'calculating'"
      role="menu"
      :aria-labelledby="menu?.id"
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
import { cn } from '../../lib/utils'

const menuPanelVariants = cva(
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

interface MenuContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const contextKey = inject<InjectionKey<MenuContext>>('menu-context-key')
const menu = contextKey ? inject(contextKey) : null

const isMenuOpen = computed(() => menu?.isOpen.value ?? false)

const panelRef = ref<HTMLElement>()
const teleportStyle = ref<Record<string, string>>({})
const isPositioned = ref(false)

const overlayClasses = computed(() => {
  return cn('fixed inset-0 z-[9998] w-screen bg-transparent')
})

const panelClasses = computed(() => {
  const baseClasses = menuPanelVariants({
    position: props.position as 'bottom' | 'top',
  })

  // Add position class based on teleport mode
  const positionClass = props.teleport ? 'fixed z-[9999]' : 'absolute z-50 top-full mt-1'

  return cn(baseClasses, positionClass, props.class)
})

// Combine teleport style with positioning
const combinedStyle = computed(() => {
  return teleportStyle.value
})

// Calculate position when teleported
const updatePosition = () => {
  if (!props.teleport || !isMenuOpen.value) return

  // Find the button element (parent of MenuPanel)
  const container = document.querySelector(
    `[data-state="${menu?.isOpen.value ? 'open' : 'closed'}"]`,
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

// Lock/unlock body scroll when menu opens/closes
const lockBodyScroll = () => {
  // Get the scrollbar width before hiding it
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  // Only lock if there's actually a scrollbar (i.e., content is scrollable)
  if (scrollbarWidth > 0) {
    // Add padding to compensate for scrollbar removal (prevents layout shift)
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// Watch for menu open state changes
watch(isMenuOpen, async (newVal) => {
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
    if (isMenuOpen.value) {
      unlockBodyScroll()
    }
  }
})
</script>

<style scoped>
/* Overlay transitions */
.menu-overlay-enter-active,
.menu-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.menu-overlay-enter-from,
.menu-overlay-leave-to {
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
