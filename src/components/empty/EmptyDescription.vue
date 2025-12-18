<script lang="ts">
import type { HTMLAttributes } from 'vue'

export interface EmptyDescriptionProps extends /* @vue-ignore */ HTMLAttributes {
  class?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// --- Props & Emits ---
const props = withDefaults(defineProps<EmptyDescriptionProps>(), {})

// --- State & Computed ----
const descriptionClasses = computed(() =>
  cn(
    'text-text-subtitle [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
    props.class,
  ),
)
</script>

<template>
  <div data-slot="empty-description" :class="descriptionClasses">
    <slot />
  </div>
</template>

