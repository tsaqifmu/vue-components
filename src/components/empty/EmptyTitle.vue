<script lang="ts">
import type { HTMLAttributes } from 'vue'

export interface EmptyTitleProps extends /* @vue-ignore */ HTMLAttributes {
  class?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// --- Props & Emits ---
const props = withDefaults(defineProps<EmptyTitleProps>(), {})

// --- State & Computed ----
const titleClasses = computed(() =>
  cn('text-lg font-medium tracking-tight text-text-title', props.class),
)
</script>

<template>
  <div data-slot="empty-title" :class="titleClasses">
    <slot />
  </div>
</template>

