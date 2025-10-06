<template>
  <div :class="footerClasses">
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

const footerClasses = computed(() =>
  cn(
    'flex items-center justify-center gap-3.5 border-t border-gray-200 p-4 shadow-[0px_-4px_8px_0px_#00000014]',
    props.class,
  ),
)
</script>
