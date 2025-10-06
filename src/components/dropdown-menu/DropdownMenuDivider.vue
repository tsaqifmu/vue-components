<template>
  <div :class="dividerClasses" role="separator" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

const dividerClasses = computed(() => cn('h-px bg-gray-300 my-1', props.class))
</script>
