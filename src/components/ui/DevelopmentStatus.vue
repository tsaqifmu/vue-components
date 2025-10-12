<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: 'stable' | 'development'
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
})

const statusConfig = computed(() => {
  if (props.status === 'stable') {
    return {
      title: 'Stable',
      badge: 'Production Ready',
      badgeClass: 'rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700',
      containerClass: '',
      showDescription: false,
    }
  } else {
    return {
      title: 'Under Development',
      badge: '⚠️ Not Yet Released',
      badgeClass: 'rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700',
      containerClass: 'rounded-lg border-2 border-dashed border-amber-300 bg-amber-50/50 p-4',
      showDescription: true,
      defaultDescription:
        'This feature is still in development and may change or be removed before final release.',
    }
  }
})

const displayDescription = computed(() => {
  return props.description || statusConfig.value.defaultDescription || ''
})
</script>

<template>
  <div class="flex flex-col gap-2" :class="statusConfig.containerClass">
    <div class="flex items-center gap-2">
      <h3 class="text-sm font-semibold text-gray-900">{{ statusConfig.title }}</h3>
      <span :class="statusConfig.badgeClass">
        {{ statusConfig.badge }}
      </span>
    </div>
    <p v-if="statusConfig.showDescription && displayDescription" class="text-xs text-amber-700">
      {{ displayDescription }}
    </p>
    <slot />
  </div>
</template>
