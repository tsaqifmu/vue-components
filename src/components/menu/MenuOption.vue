<template>
  <button :class="optionClasses" :disabled="disabled ?? false" role="menuitem" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const menuOptionVariants = cva(
  'w-full text-left px-4 py-2 text-sm transition-colors duration-150 ease-in-out focus:outline-none focus:bg-surface-secondary',
  {
    variants: {
      destructive: {
        true: 'text-red-600 dark:text-red-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20',
        false: 'text-text-title hover:bg-surface-secondary hover:text-text-title',
      },
      disabled: {
        true: 'opacity-60 cursor-not-allowed text-text-disable bg-surface-secondary/30 hover:bg-surface-secondary/30 hover:text-text-disable',
        false: '',
      },
    },
    defaultVariants: {
      destructive: false,
      disabled: false,
    },
  },
)

interface Props {
  disabled?: boolean
  destructive?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  destructive: false,
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

const optionClasses = computed(() =>
  cn(
    menuOptionVariants({
      destructive: props.destructive as boolean,
      disabled: props.disabled as boolean,
    }),
    props.class,
  ),
)

const handleClick = () => {
  if (!props.disabled) {
    menu?.close()
  }
}
</script>
