<script setup lang="ts">
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'
import { Z_INDEX } from '../z-index'

interface Props {
  class?: string
  closeOnClick?: boolean
}

interface ModalContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {
  closeOnClick: true,
})

const contextKey = inject<InjectionKey<ModalContext>>('modal-context-key')
const modal = contextKey ? inject(contextKey) : null

// --- State & Computed ----
const isModalOpen = computed(() => modal?.isOpen.value ?? false)

const overlayClasses = computed(() =>
  cn(
    `fixed inset-0 right-0 z-[${Z_INDEX.MODAL_OVERLAY}] w-screen bg-black/50 backdrop-blur-sm`,
    props.class,
  ),
)

// --- Methods ---
const handleOverlayClick = () => {
  if (props.closeOnClick) {
    modal?.close()
  }
}
</script>

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
