<script setup lang="ts">
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, type InputHTMLAttributes } from 'vue'

const inputVariants = cva(
  [
    'block w-full border-0 bg-transparent',
    'text-text-title placeholder:text-text-placeholder',
    'sm:text-sm sm:leading-6 outline-none rounded-lg',
    'transition-all duration-200',
  ],
  {
    variants: {
      state: {
        default: '',
        disabled: 'cursor-not-allowed text-gray-500 bg-surface-disable',
        error: '',
        focus: '',
      },
      spacing: {
        default: 'py-3  px-4',
        withCounter: 'pt-3 pb-8 px-4',
      },
    },
    defaultVariants: {
      state: 'default',
      spacing: 'default',
    },
  },
)

export type InputVariants = VariantProps<typeof inputVariants>

export interface TextInputProps
  extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'class' | 'disabled'>,
    /* @vue-ignore */ InputVariants {
  id?: string
  disabled?: boolean
  class?: string
  spacing?: 'default' | 'withCounter'
  state?: 'default' | 'disabled' | 'error' | 'focus'
}

const props = defineProps<TextInputProps>()

const model = defineModel<string | number>({ default: '' })

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  model.value = target.value
}

const inputClasses = computed(() =>
  cn(inputVariants({ state: props.state, spacing: props.spacing }), props.class),
)

console.log('ini data space', props.spacing)
</script>

<template>
  <input
    v-bind="$attrs"
    :id="id"
    :value="model"
    :disabled="disabled"
    :class="inputClasses"
    @input="handleInput"
  />
</template>
