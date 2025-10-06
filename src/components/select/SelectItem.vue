<template>
  <button
    :class="itemClasses"
    :disabled="disabled ?? false"
    role="option"
    :aria-selected="isSelected"
    @click="handleClick"
  >
    <span class="flex flex-1 items-center gap-2">
      <slot :selected="isSelected" />
    </span>
    <span
      v-if="isSelected"
      class="text-primary absolute right-2 flex size-3.5 items-center justify-center"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, onMounted, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const selectItemVariants = cva(
  'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 pr-8 text-sm outline-none select-none transition-colors duration-150 ease-in-out',
  {
    variants: {
      selected: {
        true: 'bg-surface-secondary text-text-title font-medium',
        false: 'text-text-title hover:bg-surface-secondary focus:bg-surface-secondary',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  },
)

interface Props {
  value: string | number
  label?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
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

const isSelected = computed(() => select?.modelValue.value === props.value)

const itemClasses = computed(() =>
  cn(
    selectItemVariants({
      selected: isSelected.value,
      disabled: props.disabled,
    }),
    props.class,
  ),
)

const handleClick = () => {
  if (!props.disabled && select) {
    select.selectValue(props.value, props.label)
  }
}

// Register this item's label on mount
onMounted(() => {
  if (select && props.label) {
    select.registerItem(props.value, props.label)
  }
})
</script>
