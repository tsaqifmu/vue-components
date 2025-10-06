<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {})

// --- State & Computed ----
const titleClasses = computed(() => cn('text-xl font-semibold text-black-700', props.class))
</script>

<template>
  <h2 :class="titleClasses">
    <slot />
  </h2>
</template>
