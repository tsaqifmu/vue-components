<script setup lang="ts">
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { computed, inject, type Ref } from 'vue'

export interface TabsTriggerProps {
  value: string
  disabled?: boolean
}

// --- Props & Emits ---
const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: false,
})

const tabsContext = inject<{
  activeValue: Readonly<Ref<string>>
  setActiveValue: (value: string) => void
  orientation: Readonly<Ref<'horizontal' | 'vertical'>>
}>('tabsContext')

// Get variant from TabsList
const variant = inject<'default' | 'submenu'>('tabsListVariant', 'default')

// --- State & Computed ---
const isActive = computed(() => tabsContext?.activeValue.value === props.value)

// --- Methods ---
const handleClick = () => {
  if (!props.disabled && tabsContext) {
    tabsContext.setActiveValue(props.value)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick()
  }
}

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5',
    'text-sm font-medium whitespace-nowrap',
    'transition-all duration-200',
    'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: '',
        submenu: [
          'relative',
          'after:content-[""]',
          'after:absolute',
          'after:bottom-0',
          'after:left-0',
          'after:w-full',
          'after:h-0',
          'after:rounded-t-lg',
          'after:transition-all',
          'after:duration-300',
        ],
      },
      isActive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Default variant styles
      {
        variant: 'default',
        class: 'h-[calc(100%-1px)] flex-1 rounded-lg px-3 py-2',
      },
      {
        variant: 'default',
        isActive: true,
        class: 'bg-surface-primary-white text-text-title shadow-large font-semibold',
      },
      {
        variant: 'default',
        isActive: false,
        class: 'text-text-title hover:text-text-title font-normal',
      },
      // Submenu variant styles
      {
        variant: 'submenu',
        class: 'px-1 py-2.5 rounded-t-lg',
      },
      {
        variant: 'submenu',
        isActive: true,
        class: 'text-primary after:bg-primary after:h-1',
      },
      {
        variant: 'submenu',
        isActive: false,
        class: 'text-gray-600 hover:text-gray-900 hover:after:bg-gray-300 hover:after:h-1',
      },
    ],
    defaultVariants: {
      variant: 'default',
      isActive: false,
    },
  },
)
</script>

<template>
  <button
    type="button"
    role="tab"
    data-slot="tabs-trigger"
    :aria-selected="isActive"
    :aria-controls="`panel-${value}`"
    :id="`tab-${value}`"
    :tabindex="isActive ? 0 : -1"
    :disabled="disabled"
    :data-state="isActive ? 'active' : 'inactive'"
    :class="
      cn(
        tabsTriggerVariants({
          variant,
          isActive,
        }),
      )
    "
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot />
  </button>
</template>
