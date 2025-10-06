<template>
  <!-- Overlay -->
  <Teleport to="body" :disabled="!teleport">
    <Transition
      name="select-overlay"
      enter-active-class="select-overlay-enter-active"
      enter-from-class="select-overlay-enter-from"
      leave-active-class="select-overlay-leave-active"
      leave-to-class="select-overlay-leave-to"
    >
      <div v-if="isSelectOpen" :class="overlayClasses" @click="select?.close()"></div>
    </Transition>
  </Teleport>

  <!-- Select Content Panel -->
  <Teleport to="body" :disabled="!teleport">
    <div
      v-if="isSelectOpen"
      ref="panelRef"
      :class="panelClasses"
      :style="combinedStyle"
      :data-state="isPositioned ? 'positioned' : 'calculating'"
      role="listbox"
      :aria-labelledby="select?.id"
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

const selectContentVariants = cva(
  'min-w-[8rem] rounded-md bg-surface-primary-white shadow-card-float border border-gray-300 py-1 max-h-[var(--radix-select-content-available-height)] overflow-y-auto',
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

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  teleport: true,
  align: 'start',
})

interface SelectContext {
  id: string
  isOpen: Ref<boolean>
  modelValue: Ref<string | number | undefined>
  open: () => void
  close: () => void
  toggle: () => void
  selectValue: (value: string | number, label?: string) => void
  registerItem: (value: string | number, label: string) => void
  getDisplayText: () => string
}

const contextKey = inject<InjectionKey<SelectContext>>('select-context-key')
const select = contextKey ? inject(contextKey) : null

const isSelectOpen = computed(() => select?.isOpen.value ?? false)

const panelRef = ref<HTMLElement>()
const teleportStyle = ref<Record<string, string>>({})
const isPositioned = ref(false)

const overlayClasses = computed(() => {
  return cn('fixed inset-0 z-[9998] w-screen bg-transparent')
})

const panelClasses = computed(() => {
  const baseClasses = selectContentVariants({
    position: props.position as 'bottom' | 'top',
  })

  const positionClass = props.teleport ? 'fixed z-[9999]' : 'absolute z-50 top-full mt-1'

  return cn(baseClasses, positionClass, props.class)
})

const combinedStyle = computed(() => {
  return teleportStyle.value
})

// Calculate position when teleported
const updatePosition = () => {
  if (!props.teleport || !isSelectOpen.value) return

  const container = document.querySelector(
    `[data-state="${select?.isOpen.value ? 'open' : 'closed'}"]`,
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
  let top = buttonRect.bottom + 4
  let left = buttonRect.left

  // Alignment
  if (props.align === 'center') {
    left = buttonRect.left + buttonRect.width / 2 - panelRect.width / 2
  } else if (props.align === 'end') {
    left = buttonRect.right - panelRect.width
  }

  // Check if would go off bottom
  if (top + panelRect.height > viewportHeight && buttonRect.top > panelRect.height) {
    top = buttonRect.top - panelRect.height - 4
  }

  // Check if would go off right edge
  const right = left + panelRect.width
  if (right > window.innerWidth) {
    left = window.innerWidth - panelRect.width - 8
  }

  // Check if would go off left edge
  if (left < 8) {
    left = 8
  }

  teleportStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    minWidth: `${buttonRect.width}px`,
  }
}

// Lock/unlock body scroll
const lockBodyScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// Watch for select open state changes
watch(isSelectOpen, async (newVal) => {
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

// Update position on resize
onMounted(() => {
  if (props.teleport) {
    window.addEventListener('resize', updatePosition)
  }
})

onUnmounted(() => {
  if (props.teleport) {
    window.removeEventListener('resize', updatePosition)
    if (isSelectOpen.value) {
      unlockBodyScroll()
    }
  }
})
</script>

<style scoped>
/* Overlay transitions */
.select-overlay-enter-active,
.select-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.select-overlay-enter-from,
.select-overlay-leave-to {
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
