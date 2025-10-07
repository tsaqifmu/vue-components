<script setup lang="ts">
import { provide, readonly, ref, watch } from 'vue'

export interface TabsRootProps {
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
}

// --- Props & Emits ---
const props = withDefaults(defineProps<TabsRootProps>(), {
  orientation: 'horizontal',
})

// Use defineModel for v-model binding
const modelValue = defineModel<string>()

// --- State & Computed ---
// Internal state for uncontrolled mode
const internalValue = ref(props.defaultValue || '')

// Computed active value - use controlled value if provided, otherwise use internal state
const activeValue = ref(modelValue.value ?? internalValue.value)

// --- Watchers ---
// Watch for external changes to modelValue
watch(modelValue, (newValue) => {
  if (newValue !== undefined) {
    activeValue.value = newValue
  }
})

// --- Methods ---
// Update active tab
const setActiveValue = (value: string) => {
  activeValue.value = value
  internalValue.value = value
  modelValue.value = value
}

// Provide context for child components
provide('tabsContext', {
  activeValue: readonly(activeValue),
  setActiveValue,
  orientation: readonly(ref(props.orientation)),
})
</script>

<template>
  <div
    data-slot="tabs"
    :data-orientation="orientation"
    class="flex flex-col gap-2"
    :class="{ 'flex-row': orientation === 'vertical' }"
  >
    <slot />
  </div>
</template>
