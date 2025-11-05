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
  /**
   *  Untuk variant solid, warna background dioverlay menggunakan shadow inset dan color-mix untuk memberikan efek hover dan active.
   *  Untuk variant ghost dan link, warna text dioverlay menggunakan color-mix untuk memberikan efek hover dan active.
   */
  {
    variants: {
      variant: {
        default:
          'bg-surface-primary-white text-text-subtitle border border-[#D5D5D5] shadow-[0_1px_2px_0_rgba(86,86,86,0.06)] hover:shadow-[0_1px_4px_0_rgba(86,86,86,0.50)] active:bg-[#F6F6F6] active:shadow-[0_1px_4px_0_rgba(86,86,86,0.50)] active:duration-100',
        solid:
          'bg-primary shadow-[inset_0_0_0_1000px_rgba(0,0,0,0),0_1px_4px_0_color-mix(in_srgb,var(--color-primary)_50%,transparent)] text-surface-primary-white hover:shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2),0_1px_4px_0_color-mix(in_srgb,var(--color-primary)_50%,transparent)] active:shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.4),0_1px_4px_0_color-mix(in_srgb,var(--color-primary)_50%,transparent)] disabled:bg-surface-disable disabled:text-text-disable',
        outline:
          'border border-primary text-primary hover:bg-surface-primary-white hover:shadow-[0_1px_4px_0_rgba(86,86,86,0.50)] active:bg-[#F6F6F6] active:duration-100 disabled:border-surface-disable disabled:text-text-disable',
        ghost:
          'text-primary hover:[color:color-mix(in_srgb,var(--color-primary)_80%,black_20%)] active:[color:color-mix(in_srgb,var(--color-primary)_60%,black_40%)] disabled:text-text-disable',
        link: 'text-notification-link underline-offset-auto underline hover:[color:color-mix(in_srgb,var(--color-notification-link)_80%,black_20%)] active:[color:color-mix(in_srgb,var(--color-notification-link)_60%,black_40%)]',
      },
      size: {
        default: 'px-4 py-2 ',
        icon: 'p-2',
      },
      inactive: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
      rounded: {
        true: 'rounded-[16rem] px-6 py-2',
        false: 'rounded-lg px-4 py-2',
      },
    },
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
