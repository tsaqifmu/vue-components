<template>
  <Teleport to="body">
    <Transition
      name="modal-content"
      enter-active-class="modal-content-enter-active"
      enter-from-class="modal-content-enter-from"
      leave-active-class="modal-content-leave-active"
      leave-to-class="modal-content-leave-to"
    >
      <div
        v-if="isModalOpen"
        :class="contentClasses"
        role="dialog"
        :aria-labelledby="modal?.id"
        aria-modal="true"
        @click.stop
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, onMounted, onUnmounted, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const modalContentVariants = cva(
  'fixed top-1/2 left-1/2 z-[999] flex h-auto max-h-[90vh] flex-col rounded-2xl bg-white shadow-xl',
  {
    variants: {
      size: {
        sm: 'w-[90vw] max-w-sm',
        md: 'w-[90vw] max-w-md',
        lg: 'w-[90vw] max-w-lg',
        xl: 'w-[90vw] max-w-xl',
        '2xl': 'w-[90vw] max-w-2xl',
        full: 'w-[95vw] h-[95vh] max-h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

interface ModalContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const contextKey = inject<InjectionKey<ModalContext>>('modal-context-key')
const modal = contextKey ? inject(contextKey) : null

const isModalOpen = computed(() => modal?.isOpen.value ?? false)

const contentClasses = computed(() =>
  cn(
    modalContentVariants({
      size: props.size as 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full',
    }),
    props.class,
  ),
)

// Handle escape key
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    modal?.close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
/* Base transform for centering */
div[role='dialog'] {
  transform: translate(-50%, -50%);
}

/* Handle dialog transition */
.modal-content-enter-active,
.modal-content-leave-active {
  transition:
    opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.95);
}
</style>
