<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface KeyIconProps {
  size?: number | string
  class?: string
}

const props = withDefaults(defineProps<KeyIconProps>(), {
  size: 20,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :class="cn('transition-colors', props.class)"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9167 12.083C15.6781 12.083 17.9167 9.84442 17.9167 7.08301C17.9167 4.32158 15.6781 2.08301 12.9167 2.08301C10.1553 2.08301 7.91671 4.32158 7.91671 7.08301C7.91671 7.81668 8.07472 8.51342 8.35862 9.14109L2.08337 15.4163V17.9163H4.58337V16.2497H6.25004V14.583H7.91671L10.8586 11.6411C11.4863 11.925 12.183 12.083 12.9167 12.083Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.5833 5.41699L13.75 6.25033"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
