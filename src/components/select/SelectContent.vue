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
import {
  calculateDropdownPosition,
  getElementRect,
  positionResultToStyle,
} from '../../lib/positionUtils'
import { lockBodyScroll, unlockBodyScroll } from '../../lib/scrollLock'
import { cn } from '../../lib/utils'
import { Z_INDEX } from '../z-index'

const selectContentVariants = cva(
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

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  teleport: true,
  align: 'start',
})

const contextKey = inject<InjectionKey<SelectContext>>('select-context-key')
const select = contextKey ? inject(contextKey) : null

// --- State & Computed ----
const panelRef = ref<HTMLElement>()
const isPositioned = ref(false)
const teleportStyle = ref<Record<string, string>>({})

const isSelectOpen = computed(() => select?.isOpen.value ?? false)

const overlayClasses = computed(() => {
  return cn(`fixed inset-0 z-[${Z_INDEX.SELECT_OVERLAY}] w-screen bg-transparent`)
})

const panelClasses = computed(() => {
  const baseClasses = selectContentVariants({
    position: props.position as 'bottom' | 'top',
  })

  const positionClass = props.teleport
    ? `fixed z-[${Z_INDEX.SELECT_CONTENT}]`
    : `absolute z-[${Z_INDEX.NON_TELEPORT.SELECT_CONTENT}] top-full mt-1`

  return cn(baseClasses, positionClass, props.class)
})

const combinedStyle = computed(() => {
  return teleportStyle.value
})

// --- Methods ----
// Calculate position when teleported using the shared utility
const updatePosition = () => {
  if (!props.teleport || !isSelectOpen.value) return

  const container = document.querySelector(
    `[data-state="${select?.isOpen.value ? 'open' : 'closed'}"]`,
  )
  if (!container) return

  const button = container.querySelector('button')
  if (!button) return

  const triggerRect = getElementRect(button as HTMLElement)
  const panelRect = getElementRect(panelRef.value ?? null)

  if (!triggerRect || !panelRect) return

  // Use the shared position calculator utility
  const position = calculateDropdownPosition({
    triggerRect,
    panelRect,
    align: props.align,
  })

  // Convert to style object
  teleportStyle.value = positionResultToStyle(position)
}

// --- Watchers ---
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
    if (isSelectOpen.value) {
      unlockBodyScroll()
    }
  }
})
</script>

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
