<template>
  <slot :value="select?.modelValue.value" :is-placeholder="!select?.modelValue.value">
    {{ displayText }}
  </slot>
</template>

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

const displayText = computed(() => select?.getDisplayText() ?? '')
</script>
