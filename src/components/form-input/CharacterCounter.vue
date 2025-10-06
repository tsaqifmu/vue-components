<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'

export interface CharacterCounterProps {
  current: number
  max: number
  error?: boolean
  disabled?: boolean
  class?: string
}

// --- Props & Emits ---
const props = defineProps<CharacterCounterProps>()

// --- Computed ---
const isOverLimit = computed(() => props.current > props.max)

const counterClasses = computed(() =>
  cn(
    'pointer-events-none absolute right-3 bottom-2 text-xs font-semibold',
    props.error ? 'text-notification-error' : 'text-text-subtitle',
    props.disabled && 'opacity-60',
    props.class,
  ),
)
</script>

<template>
  <div :class="counterClasses" aria-live="polite" aria-atomic="true">
    <span :class="{ 'text-notification-error': isOverLimit }">
      {{ current }}
    </span>
    <span>/{{ max }}</span>
  </div>
</template>
