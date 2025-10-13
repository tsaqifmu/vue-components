<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const multiSelectTriggerVariants = cva(
  // Base styles
  [
    'inline-flex w-full px-4 py-3 items-center justify-between gap-x-2 bg-surface-primary-white rounded-lg whitespace-nowrap shadow-small',
    // Text styles
    'text-sm text-text-title font-medium',

    // Transition styles
    'transition-all duration-200 ease-in-out',

    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
  ],
  {
    variants: {
      disabled: {
        true: 'opacity-50 cursor-not-allowed bg-surface-secondary/50 border-gray-300/50',
        false:
          ' border-gray-300 hover:bg-surface-secondary focus:ring-primary/50 focus:border-primary',
      },
    },
  },
)

interface Props {
  disabled?: boolean
  class?: string
  maxDisplay?: number
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

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  maxDisplay: 5,
})

const contextKey = inject<InjectionKey<MultiSelectContext>>('multi-select-context-key')
const multiSelect = contextKey ? inject(contextKey) : null

// --- State & Computed ----
const displayText = computed(() => multiSelect?.getDisplayText() || '')

const triggerClasses = computed(() =>
  cn(
    multiSelectTriggerVariants({
      disabled: props.disabled,
    }),
    props.class,
  ),
)
</script>

<template>
  <button
    type="button"
    data-multi-select-trigger
    :class="triggerClasses"
    :disabled="disabled ?? false"
    :aria-expanded="multiSelect?.isOpen.value ?? false"
    aria-haspopup="listbox"
    role="combobox"
    @click="multiSelect?.toggle"
  >
    <span :class="cn('text-text-placeholder flex-1 truncate text-left font-normal')">
      <slot :value="multiSelect?.modelValue.value">
        {{ displayText }}
      </slot>
    </span>

    <svg
      :class="
        cn(
          'flex-shrink-0 transition-transform duration-200',
          multiSelect?.isOpen.value && 'rotate-180',
        )
      "
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976314 1.31658 -0.0976314 0.683418 0.292893 0.292893C0.683417 -0.0976309 1.31658 -0.0976309 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>
