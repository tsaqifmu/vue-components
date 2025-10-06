<template>
  <div :class="headerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

const headerClasses = computed(() =>
  cn('px-4 py-2 text-xs font-semibold text-text-subtitle uppercase tracking-wide', props.class),
)
</script>
