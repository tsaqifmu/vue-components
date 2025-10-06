<template>
  <slot />
</template>

<script setup lang="ts">
import { onUnmounted, provide, ref, watch, type InjectionKey, type Ref } from 'vue'

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

const props = withDefaults(defineProps<Props>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}>()

// State management with Vue native ref
const isOpen = ref(props.open)

// Watch props.open for external changes
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal
  },
)

/**
 * Get scrollbar width for layout shift prevention
 * Industry standard approach: window.innerWidth - document.documentElement.clientWidth
 */
const getScrollbarWidth = (): number => {
  return window.innerWidth - document.documentElement.clientWidth
}

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

    const scrollbarWidth = getScrollbarWidth()

    // Add padding compensation if there's actually a scrollbar
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    document.body.classList.add('overflow-hidden')
  } else {
    // Wait for modal animation to finish (500ms) before restoring scrollbar
    // This prevents layout shift during modal fade-out animation
    cleanupTimeoutId = setTimeout(() => {
      document.body.style.paddingRight = ''
      document.body.classList.remove('overflow-hidden')
      cleanupTimeoutId = null
    }, 500)

    emit('close')
  }
})

// Simple methods
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

// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
  if (cleanupTimeoutId) {
    clearTimeout(cleanupTimeoutId)
  }
  // Ensure body styles are cleaned up if component is unmounted while modal is open
  document.body.style.paddingRight = ''
  document.body.classList.remove('overflow-hidden')
})
</script>
