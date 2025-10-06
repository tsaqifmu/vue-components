<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {})

// --- State & Computed ----
const bodyClasses = computed(() => cn('flex-grow overflow-y-auto px-6 py-4', props.class))
</script>

<template>
  <div :class="bodyClasses">
    <slot />
  </div>
</template>
