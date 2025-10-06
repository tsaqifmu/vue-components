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
  cn('flex items-center justify-between border-b border-gray-200 p-6', props.class),
)
</script>
