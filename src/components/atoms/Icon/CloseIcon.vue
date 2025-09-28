<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface CloseIconProps {
  size?: number | string
  class?: string
}

const props = withDefaults(defineProps<CloseIconProps>(), {
  size: 12,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :class="cn('transition-colors', props.class)"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <line x1="23" y1="1" x2="1" y2="23"></line>
  </svg>
</template>
