<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed, inject } from 'vue'
import type { RadioGroupContext } from './RadioGroupRoot.vue'

export interface RadioGroupItemProps {
  value: string
  id?: string
  disabled?: boolean
  class?: string
}

// --- Props ---
const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  disabled: false,
})

// Generate unique ID if not provided
const itemId = computed(
  () => props.id || `radio-item-${props.value}-${Math.random().toString(36).substring(2, 7)}`,
)

// --- Inject Context ---
const radioGroupContext = inject<RadioGroupContext>('radioGroupContext')

// --- Computed ---
const isSelected = computed(() => radioGroupContext?.modelValue.value === props.value)
const isDisabled = computed(() => props.disabled || radioGroupContext?.disabled.value)

// --- Methods ---
const handleClick = () => {
  if (!isDisabled.value && radioGroupContext) {
    radioGroupContext.setValue(props.value)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <button
    :id="itemId"
    type="button"
    role="radio"
    data-slot="radio-group-item"
    :aria-checked="isSelected"
    :aria-disabled="isDisabled || undefined"
    :data-state="isSelected ? 'checked' : 'unchecked'"
    :data-disabled="isDisabled || undefined"
    :disabled="isDisabled"
    :class="
      cn(
        // Base styles
        'aspect-square size-4 shrink-0 rounded-full border-2',
        // Transition
        'transition-all duration-150',
        // Focus styles
        'focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]',
        // Invalid state
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Selected state - filled primary with white center
        isSelected && 'border-primary bg-primary',
        // Unselected state - primary ring only
        !isSelected && 'border-primary bg-transparent',
        props.class,
      )
    "
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Radio Indicator - White center dot when selected -->
    <span
      v-if="isSelected"
      data-slot="radio-group-indicator"
      class="flex size-full items-center justify-center"
    >
      <span class="size-1.5 rounded-full bg-white" />
    </span>
  </button>
</template>
