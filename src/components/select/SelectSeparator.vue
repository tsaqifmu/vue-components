<template>
  <div :class="separatorClasses" role="separator"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const separatorClasses = computed(() =>
  cn('pointer-events-none -mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700', props.class),
)
</script>
