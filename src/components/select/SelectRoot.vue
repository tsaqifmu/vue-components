<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, watch, type InjectionKey, type Ref } from 'vue'

// Generate unique context key for each SelectRoot instance
let selectInstanceCounter = 0
const selectId = `select-${++selectInstanceCounter}`
const contextKey: InjectionKey<SelectContext> = Symbol(`select-context-${selectId}`)

// TypeScript interface for type safety
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

// Props
interface Props {
  modelValue?: string | number
  placeholder?: string
}

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
}>()

// --- State & Computed ----
// State management
const isOpen = ref(false)
const container = ref<HTMLElement>()
const internalValue = ref<string | number | undefined>(props.modelValue)
const itemLabels = ref<Map<string | number, string>>(new Map())

// --- Watchers ---
// Watch for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  },
)

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
  internalValue.value = value
  if (label) {
    itemLabels.value.set(value, label)
  }
  emit('update:modelValue', value)
  close()
}

const registerItem = (value: string | number, label: string) => {
  itemLabels.value.set(value, label)
}

const getDisplayText = () => {
  if (internalValue.value !== undefined) {
    return itemLabels.value.get(internalValue.value) ?? internalValue.value.toString()
  }
  return props.placeholder
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
  id: selectId,
  isOpen,
  modelValue: internalValue,
  open,
  close,
  toggle,
  selectValue,
  registerItem,
  getDisplayText,
})

// Provide context key for child components
provide('select-context-key', contextKey)
</script>

<template>
  <div ref="container" class="group relative inline-block" :data-state="isOpen ? 'open' : 'closed'">
    <slot />
  </div>
</template>
