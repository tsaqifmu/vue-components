<script lang="ts">
import type { HTMLAttributes } from 'vue'

export interface EmptyHeaderProps extends /* @vue-ignore */ HTMLAttributes {
  class?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// --- Props & Emits ---
const props = withDefaults(defineProps<EmptyHeaderProps>(), {})

// --- State & Computed ----
const headerClasses = computed(() =>
  cn('flex max-w-sm flex-col items-center gap-2 text-center', props.class),
)
</script>

<template>
  <div data-slot="empty-header" :class="headerClasses">
    <slot />
  </div>
</template>

