<script setup lang="ts">
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed } from 'vue'

const labelVariants = cva('block text-sm font-normal text-text-subtitle', {
  variants: {
    state: {
      default: '',
      disabled: 'opacity-60 cursor-not-allowed',
    },
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-danger",
      false: '',
    },
  },
  defaultVariants: {
    state: 'default',
    required: false,
  },
})

export type LabelVariants = VariantProps<typeof labelVariants>

export interface LabelProps extends /* @vue-ignore */ LabelVariants {
  htmlFor?: string
  class?: string
}

const props = defineProps<LabelProps>()

const labelClasses = computed(() =>
  cn(labelVariants({ state: props.state, required: props.required }), props.class),
)
</script>

<template>
  <label :for="htmlFor" :class="labelClasses">
    <slot />
  </label>
</template>
