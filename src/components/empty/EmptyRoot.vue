<script lang="ts">
import type { HTMLAttributes } from 'vue'

export interface EmptyRootProps extends /* @vue-ignore */ HTMLAttributes {
  class?: string
}
</script>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'

// --- Props & Emits ---
const props = withDefaults(defineProps<EmptyRootProps>(), {})

// --- State & Computed ----
const rootClasses = computed(() =>
  cn(
    'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
    props.class,
  ),
)
</script>

<template>
  <div data-slot="empty" :class="rootClasses">
    <slot />
  </div>
</template>
