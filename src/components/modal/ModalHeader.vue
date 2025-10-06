<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {})

// --- State & Computed ----
const headerClasses = computed(() =>
  cn('flex items-center justify-between border-b border-gray-200 p-6', props.class),
)
</script>

<template>
  <div :class="headerClasses">
    <slot />
  </div>
</template>
