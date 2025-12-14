<script setup lang="ts">
import { cn } from '@/lib/utils'
import { inject, type HTMLAttributes } from 'vue'
import type { BadgeContext } from './BadgeRoot.vue'

export interface BadgeCloseProps extends /* @vue-ignore */ HTMLAttributes {
  class?: string
}

defineProps<BadgeCloseProps>()

// Inject context from BadgeRoot
const badgeContext = inject<BadgeContext>('badgeContext')

const handleClick = (event: Event) => {
  event.stopPropagation()
  badgeContext?.dismiss()
}
</script>

<template>
  <button
    type="button"
    data-slot="badge-close"
    :class="
      cn(
        'ml-0.5 inline-flex items-center justify-center',
        'rounded-full',
        'opacity-70 hover:opacity-100',
        'focus:ring-1 focus:ring-offset-1 focus:outline-none',
        'transition-opacity',
        $attrs.class as string,
      )
    "
    @click="handleClick"
    aria-label="Dismiss"
  >
    <slot>
      <!-- Default close icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-3 w-3"
      >
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        />
      </svg>
    </slot>
  </button>
</template>

