<script setup lang="ts">
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'vue'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[16rem] font-semibold',

    // Transition styles
    'transition-all',

    // Focus styles
    'focus-visible:ring-primary',
    'focus-visible:ring-2',
    'focus-visible:outline-none',
    'focus-visible:ring-offset-2',

    // Disabled styles
    'disabled:pointer-events-none',
    'disabled:opacity-50',

    // SVG styles
    '[&_svg]:pointer-events-none',
    '[&_svg]:size-4',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-primary text-surface-primary-white hover:bg-button-hover-primary hover:shadow-button',
        outline:
          'border border-primary text-primary hover:bg-surface-primary-white hover:shadow-button',
        destructive:
          'border border-notification-error text-notification-error  hover:bg-surface-primary-white hover:shadow-button',
        ghost: 'text-primary hover:text-button-hover-primary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-6 py-2 text-sm',
        sm: 'px-3 py-1 text-xs',
        icon: 'h-10 w-10',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        class: 'px-0 py-2',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  asChild?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  asChild: false,
})
</script>

<template>
  <component
    :is="asChild ? 'slot' : 'button'"
    :class="cn(buttonVariants({ variant, size }), $attrs.class as string)"
    v-bind="asChild ? {} : $attrs"
  >
    <slot />
  </component>
</template>
