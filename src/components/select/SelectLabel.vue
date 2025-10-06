<template>
  <div :id="groupLabelId" :class="labelClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '../../lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const groupLabelId = inject<string>('select-group-label-id', '')

const labelClasses = computed(() =>
  cn('px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400', props.class),
)
</script>
