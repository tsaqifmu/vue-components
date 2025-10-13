<script setup lang="ts">
import { computed, inject, type InjectionKey, type Ref } from 'vue'

interface Props {
  maxDisplay?: number
  class?: string
  emptyText?: string
}

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

const props = withDefaults(defineProps<Props>(), {
  maxDisplay: 10,
  emptyText: '',
})

const contextKey = inject<InjectionKey<MultiSelectContext>>('multi-select-context-key')
const multiSelect = contextKey ? inject(contextKey) : null

// --- State & Computed ----
const selectedItems = computed(() => multiSelect?.getSelectedLabels() || [])
const displayItems = computed(() => selectedItems.value.slice(0, props.maxDisplay))
const remainingCount = computed(() => Math.max(0, selectedItems.value.length - props.maxDisplay))
const hasSelection = computed(() => selectedItems.value.length > 0)

// --- Methods ---
const handleRemove = (event: Event, value: string | number) => {
  event.stopPropagation()
  multiSelect?.removeValue(value)
}
</script>

<template>
  <div v-if="hasSelection" :class="class">
    <div class="flex flex-wrap gap-2">
      <div
        v-for="item in displayItems"
        :key="item.value"
        class="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-normal text-gray-700"
      >
        <span>{{ item.label }}</span>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-sm text-gray-500 transition-colors hover:text-gray-700"
          @click="(e) => handleRemove(e, item.value)"
          :aria-label="`Remove ${item.label}`"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </button>
      </div>
      <!-- Show remaining count if there are more items -->
      <div
        v-if="remainingCount > 0"
        class="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-normal text-gray-600"
      >
        +{{ remainingCount }} more
      </div>
    </div>
  </div>
  <div v-else-if="emptyText" :class="class">
    <p class="text-sm text-gray-500">{{ emptyText }}</p>
  </div>
</template>
