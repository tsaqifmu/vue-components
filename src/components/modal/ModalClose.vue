<template>
  <button type="button" :class="closeClasses" aria-label="Close modal" @click="modal?.close">
    <slot>
      <CloseIcon class="h-5 w-5" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'
import CloseIcon from '../atoms/Icon/CloseIcon.vue'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

interface ModalContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const contextKey = inject<InjectionKey<ModalContext>>('modal-context-key')
const modal = contextKey ? inject(contextKey) : null

const closeClasses = computed(() =>
  cn(
    'cursor-pointer rounded-md p-1 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400',
    props.class,
  ),
)
</script>
