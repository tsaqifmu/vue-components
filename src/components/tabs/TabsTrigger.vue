<script setup lang="ts">
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
    :class="[
      'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5',
      'rounded-lg px-3 py-2',
      'text-sm font-normal whitespace-nowrap',
      'transition-all duration-200',
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
      isActive
        ? 'bg-surface-primary-white text-text-title shadow-large font-semibold'
        : 'text-text-title hover:text-text-title',
    ]"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot />
  </button>
</template>
