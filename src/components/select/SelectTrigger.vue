<template>
  <button
    type="button"
    :class="triggerClasses"
    :disabled="disabled ?? false"
    :aria-expanded="select?.isOpen.value ?? false"
    :aria-haspopup="listbox"
    role="combobox"
    @click="select?.toggle"
  >
    <span class="flex-1 truncate text-left">
      <slot :value="select?.modelValue.value" :is-placeholder="!select?.modelValue.value">
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

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const selectTriggerVariants = cva(
  'inline-flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 whitespace-nowrap shadow-sm',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        default: 'h-9',
        lg: 'h-10',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed bg-surface-secondary/50 border-gray-300/50',
        false:
          'bg-transparent border-gray-300 hover:bg-surface-secondary focus:ring-primary/50 focus:border-primary',
      },
    },
    defaultVariants: {
      size: 'default',
      disabled: false,
    },
  },
)

interface Props {
  size?: 'sm' | 'default' | 'lg'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  disabled: false,
})

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

const triggerClasses = computed(() =>
  cn(
    selectTriggerVariants({
      size: props.size,
      disabled: props.disabled,
    }),
    props.class,
  ),
)
</script>
