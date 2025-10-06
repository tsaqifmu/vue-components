<template>
  <div :class="bodyClasses">
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

const bodyClasses = computed(() => cn('flex-grow overflow-y-auto px-6 py-4', props.class))
</script>
