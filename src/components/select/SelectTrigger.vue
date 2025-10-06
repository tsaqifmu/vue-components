<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const selectTriggerVariants = cva(
  // Base styles
  [
    'inline-flex w-full px-4 py-3 items-center justify-between bg-surface-primary-white rounded-lg whitespace-nowrap shadow-small',
    // Text styles
    'text-sm',

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
}

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

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const contextKey = inject<InjectionKey<SelectContext>>('select-context-key')
const select = contextKey ? inject(contextKey) : null

// --- State & Computed ----
const displayText = computed(() => select?.getDisplayText() ?? '')
const isPlaceholder = computed(() => !select?.modelValue.value)

const triggerClasses = computed(() =>
  cn(
    selectTriggerVariants({
      disabled: props.disabled,
    }),
    props.class,
  ),
)
</script>

<template>
  <button
    type="button"
    :class="triggerClasses"
    :disabled="disabled ?? false"
    :aria-expanded="select?.isOpen.value ?? false"
    aria-haspopup="listbox"
    role="combobox"
    @click="select?.toggle"
  >
    <span
      :class="[
        'flex-1 truncate text-left text-sm font-normal',
        isPlaceholder && 'text-text-placeholder',
      ]"
    >
      <slot :value="select?.modelValue.value" :is-placeholder="isPlaceholder">
        {{ displayText }}
      </slot>
    </span>
    <svg
      :class="[
        'ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200',
        select?.isOpen.value ? 'rotate-180' : 'rotate-0',
      ]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
</template>
