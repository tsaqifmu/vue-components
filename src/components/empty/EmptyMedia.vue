<script lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

export const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: 'bg-surface-secondary text-text-title flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*="size-"])]:size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>['variant']

export interface EmptyMediaProps extends /* @vue-ignore */ HTMLAttributes {
  variant?: EmptyMediaVariant
  class?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// --- Props & Emits ---
const props = withDefaults(defineProps<EmptyMediaProps>(), {
  variant: 'default',
})

// --- State & Computed ----
const mediaClasses = computed(() =>
  cn(emptyMediaVariants({ variant: props.variant }), props.class),
)
</script>

<template>
  <div data-slot="empty-icon" :data-variant="variant" :class="mediaClasses">
    <slot />
  </div>
</template>

