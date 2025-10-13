<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, type InjectionKey, type Ref } from 'vue'

// Generate unique context key for each MultiSelectRoot instance
let multiSelectInstanceCounter = 0
const multiSelectId = `multi-select-${++multiSelectInstanceCounter}`
const contextKey: InjectionKey<MultiSelectContext> = Symbol(`multi-select-context-${multiSelectId}`)

// TypeScript interface for type safety
interface MultiSelectContext {
  id: string
  isOpen: Ref<boolean>
  modelValue: Ref<Array<string | number>>
  open: () => void
  close: () => void
  toggle: () => void
  selectValue: (value: string | number, label?: string) => void
  removeValue: (value: string | number) => void
  isSelected: (value: string | number) => boolean
  registerItem: (value: string | number, label: string) => void
  getDisplayText: () => string
  getSelectedLabels: () => Array<{ value: string | number; label: string }>
}

// Props
interface Props {
  placeholder?: string
  maxDisplay?: number // Maximum number of badges to display before showing "+N more"
}

// --- Props & Model ---
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select options...',
  maxDisplay: 5,
})

const model = defineModel<Array<string | number>>({ default: () => [] })

// --- State & Computed ----
// State management
const isOpen = ref(false)
const container = ref<HTMLElement>()
const itemLabels = ref<Map<string | number, string>>(new Map())

// --- Methods ---
const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectValue = (value: string | number, label?: string) => {
  if (label) {
    itemLabels.value.set(value, label)
  }

  const currentValues = model.value || []
  const index = currentValues.indexOf(value)

  if (index === -1) {
    // Add value if not exists
    model.value = [...currentValues, value]
  } else {
    // Remove value if already exists (toggle behavior)
    model.value = currentValues.filter((v) => v !== value)
  }

  // Don't close the dropdown for multi-select
  // close()
}

const removeValue = (value: string | number) => {
  const currentValues = model.value || []
  model.value = currentValues.filter((v) => v !== value)
}

const isSelected = (value: string | number): boolean => {
  const currentValues = model.value || []
  return currentValues.includes(value)
}

const registerItem = (value: string | number, label: string) => {
  itemLabels.value.set(value, label)
}

const getDisplayText = () => {
  const currentValues = model.value || []
  if (currentValues.length === 0) {
    return props.placeholder
  }
  // This is for fallback only, badges will be displayed instead
  return `${currentValues.length} selected`
}

const getSelectedLabels = (): Array<{ value: string | number; label: string }> => {
  const currentValues = model.value || []
  return currentValues.map((value) => ({
    value,
    label: itemLabels.value.get(value) ?? value.toString(),
  }))
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    close()
  }
}

// Handle escape key
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

// --- Lifecycle Hooks ---
// Setup event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
})

// Cleanup event listeners
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
})

// Provide context
provide(contextKey, {
  id: multiSelectId,
  isOpen,
  modelValue: model,
  open,
  close,
  toggle,
  selectValue,
  removeValue,
  isSelected,
  registerItem,
  getDisplayText,
  getSelectedLabels,
})

// Provide context key for child components
provide('multi-select-context-key', contextKey)
</script>

<template>
  <div ref="container" class="group relative inline-block" :data-state="isOpen ? 'open' : 'closed'">
    <slot />
  </div>
</template>
