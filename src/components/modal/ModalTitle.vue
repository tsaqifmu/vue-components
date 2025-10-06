<template>
  <h2 :class="titleClasses">
    <slot />
  </h2>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

const titleClasses = computed(() => cn('text-xl font-semibold text-black-700', props.class))
</script>
