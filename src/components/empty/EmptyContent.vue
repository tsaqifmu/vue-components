<script lang="ts">
import type { HTMLAttributes } from 'vue'

export interface EmptyContentProps extends /* @vue-ignore */ HTMLAttributes {
  class?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// --- Props & Emits ---
const props = withDefaults(defineProps<EmptyContentProps>(), {})

// --- State & Computed ----
const contentClasses = computed(() =>
  cn(
    'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
    props.class,
  ),
)
</script>

<template>
  <div data-slot="empty-content" :class="contentClasses">
    <slot />
  </div>
</template>


