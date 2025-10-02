<template>
  <button
    type="button"
    :class="buttonClasses"
    :disabled="disabled ?? false"
    :aria-expanded="menu?.isOpen.value ?? false"
    :aria-haspopup="true"
    @click="menu?.toggle"
  >
    <slot :is-open="menu?.isOpen.value">
      <span>{{ props.label }}</span>
      <svg
        :class="[
          'ml-2 h-4 w-4 transition-transform duration-200',
          menu?.isOpen.value ? 'rotate-180' : 'rotate-0',
        ]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const menuButtonVariants = cva(
  'peer inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-surface-primary-white hover:bg-primary-hover focus:ring-primary/50 active:bg-primary/90',
        secondary:
          'bg-surface-secondary text-text-title hover:bg-surface-disable focus:ring-primary/30 active:bg-surface-secondary/90',
        ghost:
          'text-text-title hover:bg-surface-secondary focus:ring-primary/30 active:bg-surface-secondary/80',
      },
      disabled: {
        true: 'opacity-60 cursor-not-allowed text-text-disable bg-surface-secondary/50 border-gray-300/50 hover:bg-surface-secondary/50 hover:text-text-disable',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      disabled: false,
    },
  },
)

interface Props {
  label?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Menu',
  variant: 'primary',
  disabled: false,
})

interface MenuContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const contextKey = inject<InjectionKey<MenuContext>>('menu-context-key')
const menu = contextKey ? inject(contextKey) : null

const buttonClasses = computed(() =>
  cn(
    menuButtonVariants({
      variant: props.variant as 'primary' | 'secondary' | 'ghost',
      disabled: props.disabled,
    }),
    props.class,
  ),
)
</script>
