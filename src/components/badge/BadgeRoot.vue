<script lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

export const badgeVariants = cva(
  // Base styles
  [
    'inline-flex items-center gap-1',
    'rounded-full border',
    'px-2.5 py-0.5',
    'text-xs font-semibold',
    'transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-transparent',
          'bg-primary',
          'text-surface-primary-white',
          'hover:bg-primary-hover',
        ],
        secondary: [
          'border-transparent',
          'bg-surface-secondary',
          'text-text-subtitle',
          'hover:bg-gray-300',
        ],
        destructive: [
          'border-transparent',
          'bg-danger',
          'text-surface-primary-white',
          'hover:bg-danger/80',
        ],
        outline: [
          'text-text-title',
          'border-stroke-bold',
          'bg-transparent',
          'hover:bg-surface-secondary',
        ],
        success: [
          'border-transparent',
          'bg-success',
          'text-surface-primary-white',
          'hover:bg-success/80',
        ],
        warning: [
          'border-transparent',
          'bg-warning',
          'text-surface-primary-white',
          'hover:bg-warning/80',
        ],
        info: ['border-transparent', 'bg-info', 'text-text-title', 'hover:bg-info/80'],
        positive: ['border-transparent', 'bg-success-light', 'text-label-positive'],
        negative: ['border-transparent', 'bg-danger-light', 'text-label-negative'],
        progress: ['border-transparent', 'bg-info-light', 'text-link-800'],
        caution: ['border-transparent', 'bg-warning-light', 'text-label-warning'],
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant']
export type BadgeSize = VariantProps<typeof badgeVariants>['size']

export interface BadgeRootProps extends /* @vue-ignore */ HTMLAttributes {
  variant?: BadgeVariant
  size?: BadgeSize
  dismissible?: boolean
  class?: string
}

// Context interface for child components
export interface BadgeContext {
  variant: BadgeVariant
  size: BadgeSize
  dismissible: boolean
  dismiss: () => void
}
</script>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { provide, ref } from 'vue'

const props = withDefaults(defineProps<BadgeRootProps>(), {
  variant: 'default',
  size: 'default',
  dismissible: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

// --- State ---
const isVisible = ref(true)

// --- Methods ---
const dismiss = () => {
  isVisible.value = false
  emit('dismiss')
}

// Provide context for child components
provide<BadgeContext>('badgeContext', {
  variant: props.variant,
  size: props.size,
  dismissible: props.dismissible,
  dismiss,
})
</script>

<template>
  <div
    v-if="isVisible"
    data-slot="badge"
    :class="cn(badgeVariants({ variant, size }), props.class)"
  >
    <slot />
  </div>
</template>
