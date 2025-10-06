<script setup lang="ts">
import { onUnmounted, provide, ref, watch, type InjectionKey, type Ref } from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '../../lib/scrollLock'

// Generate unique context key for each ModalRoot instance
let modalInstanceCounter = 0
const modalId = `modal-${++modalInstanceCounter}`
const contextKey: InjectionKey<ModalContext> = Symbol(`modal-context-${modalId}`)

// TypeScript interface for type safety
interface ModalContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

interface Props {
  open?: boolean
}

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}>()

// --- State & Computed ----
const isOpen = ref(props.open)

// --- Watchers ---
// Watch props.open for external changes
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal
  },
)

// Track cleanup timeout to prevent race conditions
let cleanupTimeoutId: ReturnType<typeof setTimeout> | null = null

// Watch internal isOpen and emit updates
watch(isOpen, (newVal) => {
  emit('update:open', newVal)

  // Body scroll lock with layout shift prevention
  if (newVal) {
    // Clear any pending cleanup if modal is reopened before animation finishes
    if (cleanupTimeoutId) {
      clearTimeout(cleanupTimeoutId)
      cleanupTimeoutId = null
    }

    lockBodyScroll()
  } else {
    // Wait for modal animation to finish (500ms) before unlocking scroll
    // This prevents layout shift during modal fade-out animation
    cleanupTimeoutId = setTimeout(() => {
      unlockBodyScroll()
      cleanupTimeoutId = null
    }, 500)

    emit('close')
  }
})

// --- Methods ---
const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

// Provide context with unique key to prevent conflicts
provide(contextKey, {
  id: modalId,
  isOpen,
  open: openModal,
  close: closeModal,
  toggle: toggleModal,
})

// Also provide the context key for child components to use
provide('modal-context-key', contextKey)

// --- Lifecycle Hooks ---
// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
  if (cleanupTimeoutId) {
    clearTimeout(cleanupTimeoutId)
  }
  // Ensure scroll is unlocked if component is unmounted while modal is open
  if (isOpen.value) {
    unlockBodyScroll()
  }
})
</script>

<template>
  <slot />
</template>
