<script setup lang="ts">
import { computed, inject, type InjectionKey, type Ref } from 'vue'

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

// --- State & Computed ----
const displayText = computed(() => select?.getDisplayText() ?? '')
const isPlaceholder = computed(() => {
  const value = select?.modelValue.value
  return value === undefined || value === null || value === ''
})
</script>

<template>
  <slot :value="select?.modelValue.value" :is-placeholder="isPlaceholder">
    {{ displayText }}
  </slot>
</template>
