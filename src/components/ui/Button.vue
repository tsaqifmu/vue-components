<script setup lang="ts">
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'vue'

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold text-sm',

    // Transition styles
    'transition-all duration-300',

    // Focus styles
    'focus-visible:ring-notification-link',
    'focus-visible:ring-2',
    'focus-visible:outline-none',
    'focus-visible:ring-offset-2',

    // Disabled styles
    'disabled:pointer-events-none',

    // SVG styles
    '[&_svg]:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        default: [
          // Base styles
          'bg-surface-primary-white',
          'text-text-subtitle',
          'border border-[#D5D5D5]',

          // Default shadow
          'shadow-[0_1px_2px_0_rgba(86,86,86,0.06)]',

          // Hover styles
          'hover:shadow-[0_1px_4px_0_rgba(86,86,86,0.50)]',

          // Active styles
          'active:bg-[#F6F6F6]',
          'active:shadow-[0_1px_4px_0_rgba(86,86,86,0.50)]',
          'active:duration-100',
        ],
        solid: [
          // Base styles
          'bg-primary',
          'text-surface-primary-white',

          // Default shadow (inset transparent + outer shadow)
          'shadow-[inset_0_0_0_1000px_rgba(0,0,0,0),0_1px_4px_0_color-mix(in_srgb,var(--color-primary)_50%,transparent)]',

          // Hover styles (inset with 20% black overlay)
          'hover:shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2),0_1px_4px_0_color-mix(in_srgb,var(--color-primary)_50%,transparent)]',

          // Active styles (inset with 40% black overlay)
          'active:shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.4),0_1px_4px_0_color-mix(in_srgb,var(--color-primary)_50%,transparent)]',

          // Disabled styles
          'disabled:bg-surface-disable',
          'disabled:shadow-none',
          'disabled:text-text-disable',
        ],
        outline: [
          // Base styles
          'border border-primary',
          'text-primary',

          // Hover styles
          'hover:bg-surface-primary-white',
          'hover:shadow-[0_1px_4px_0_rgba(86,86,86,0.50)]',

          // Active styles
          'active:bg-[#F6F6F6]',
          'active:shadow-[0_1px_4px_0_rgba(86,86,86,0.50)]',
          'active:duration-100',

          // Disabled styles
          'disabled:bg-surface-secondary',
          'disabled:border-surface-disable',
          'disabled:text-text-disable',
        ],
        ghost: [
          // Base styles
          'text-primary',

          // Hover styles (80% primary + 20% black)
          'hover:[color:color-mix(in_srgb,var(--color-primary)_80%,black_20%)]',

          // Active styles (60% primary + 40% black)
          'active:[color:color-mix(in_srgb,var(--color-primary)_60%,black_40%)]',

          // Disabled styles
          'disabled:text-text-disable',
        ],
        link: [
          // Base styles
          'text-notification-link',
          'underline-offset-auto',
          'underline',

          // Hover styles (80% link color + 20% black)
          'hover:[color:color-mix(in_srgb,var(--color-notification-link)_80%,black_20%)]',

          // Active styles (60% link color + 40% black)
          'active:[color:color-mix(in_srgb,var(--color-notification-link)_60%,black_40%)]',

          // Disabled styles
          'disabled:text-text-disable',
        ],
      },
      size: {
        default: '',
        icon: 'p-2',
      },
      inactive: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
      rounded: {
        true: 'rounded-[16rem]',
        false: 'rounded-lg',
      },
    },
    compoundVariants: [
      // Default size with normal rounded corners
      {
        size: 'default',
        rounded: false,
        class: 'px-4 py-2',
      },
      // Default size with pill shape (wider padding for better pill button appearance)
      {
        size: 'default',
        rounded: true,
        class: 'px-6 py-2',
      },
      // Icon size always uses p-2 regardless of rounded value (already handled in size variant)
      // No compound variant needed since p-2 covers all sides uniformly
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'default',
      rounded: false,
    },
  },
)

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  asChild?: boolean
  inactive?: boolean
  rounded?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'default',
  asChild: false,
  inactive: false,
  rounded: false,
})
</script>

<template>
  <component
    :is="asChild ? 'slot' : 'button'"
    :class="cn(buttonVariants({ variant, size, inactive, rounded }), $attrs.class as string)"
    v-bind="asChild ? {} : $attrs"
  >
    <slot />
  </component>
</template>
