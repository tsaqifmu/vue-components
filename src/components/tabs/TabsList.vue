<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { inject, provide, type Ref } from 'vue'

export interface TabsListProps {
  variant?: 'default' | 'submenu'
}

const props = withDefaults(defineProps<TabsListProps>(), {
  variant: 'default',
})

const tabsContext = inject<{
  orientation: Readonly<Ref<'horizontal' | 'vertical'>>
}>('tabsContext')

const orientation = tabsContext?.orientation.value || 'horizontal'

// Provide variant to child TabsTrigger components
provide('tabsListVariant', props.variant)

const tabsListVariants = cva('inline-flex w-fit items-center justify-center', {
  variants: {
    variant: {
      default: 'rounded-lg p-1 bg-stroke-regular',
      submenu: 'border-b border-gray-200 p-0 rounded-t-[10px]',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      orientation: 'horizontal',
      class: 'h-9',
    },
    {
      variant: 'default',
      orientation: 'vertical',
      class: 'h-auto',
    },
    {
      variant: 'submenu',
      orientation: 'horizontal',
      class: 'h-10 gap-6',
    },
  ],
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
  },
})
</script>

<template>
  <div
    data-slot="tabs-list"
    role="tablist"
    :aria-orientation="orientation"
    :class="
      tabsListVariants({
        variant,
        orientation: orientation as 'horizontal' | 'vertical',
      })
    "
  >
    <slot />
  </div>
</template>
