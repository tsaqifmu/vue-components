<script setup lang="ts">
import { cn } from '@/lib/utils'
import { provide, readonly, ref, watch, type Ref } from 'vue'

export interface RadioGroupRootProps {
  defaultValue?: string
  disabled?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

// Context interface for child components
export interface RadioGroupContext {
  modelValue: Readonly<Ref<string | undefined>>
  setValue: (value: string) => void
  disabled: Readonly<Ref<boolean>>
  name: string
}

// --- Props & Emits ---
const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  orientation: 'vertical',
  disabled: false,
})

// Use defineModel for v-model binding
const modelValue = defineModel<string>()

// --- State ---
// Internal state for uncontrolled mode
const internalValue = ref(props.defaultValue || '')

// Active value - use controlled value if provided, otherwise use internal state
const activeValue = ref(modelValue.value ?? internalValue.value)

// Generate unique name for the radio group
const groupName = props.name || `radio-group-${Math.random().toString(36).substring(2, 9)}`

// --- Watchers ---
// Watch for external changes to modelValue
watch(modelValue, (newValue) => {
  if (newValue !== undefined) {
    activeValue.value = newValue
  }
})

// --- Methods ---
const setValue = (value: string) => {
  if (props.disabled) return
  activeValue.value = value
  internalValue.value = value
  modelValue.value = value
}

// Provide context for child components
provide<RadioGroupContext>('radioGroupContext', {
  modelValue: readonly(activeValue),
  setValue,
  disabled: readonly(ref(props.disabled)),
  name: groupName,
})
</script>

<template>
  <div
    data-slot="radio-group"
    role="radiogroup"
    :aria-orientation="orientation"
    :aria-disabled="disabled || undefined"
    :class="
      cn('grid gap-3', orientation === 'horizontal' && 'auto-cols-max grid-flow-col', props.class)
    "
  >
    <slot />
  </div>
</template>
