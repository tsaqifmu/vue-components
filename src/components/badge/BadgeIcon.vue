<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'vue'

export interface BadgeIconProps extends /* @vue-ignore */ HTMLAttributes {
  class?: string
  position?: 'start' | 'end'
}

withDefaults(defineProps<BadgeIconProps>(), {
  position: 'start',
})
</script>

<template>
  <span
    data-slot="badge-icon"
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center',
        '[&_svg]:h-3 [&_svg]:w-3',
        position === 'start' ? '-ml-0.5' : '-mr-0.5',
        $attrs.class as string,
      )
    "
  >
    <slot />
  </span>
</template>

