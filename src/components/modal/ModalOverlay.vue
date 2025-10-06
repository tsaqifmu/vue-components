<template>
  <Teleport to="body">
    <Transition
      name="modal-overlay"
      enter-active-class="modal-overlay-enter-active"
      enter-from-class="modal-overlay-enter-from"
      leave-active-class="modal-overlay-leave-active"
      leave-to-class="modal-overlay-leave-to"
    >
      <div v-if="isModalOpen" :class="overlayClasses" @click="handleOverlayClick"></div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
  closeOnClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnClick: true,
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

const overlayClasses = computed(() =>
  cn('fixed inset-0 right-0 z-[998] w-screen bg-black/50 backdrop-blur-sm', props.class),
)

const handleOverlayClick = () => {
  if (props.closeOnClick) {
    modal?.close()
  }
}
</script>

<style scoped>
.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: opacity 0.5s ease;
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}
</style>
