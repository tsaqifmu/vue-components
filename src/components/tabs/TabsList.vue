<script setup lang="ts">
import { inject, type Ref } from 'vue'

const tabsContext = inject<{
  orientation: Readonly<Ref<'horizontal' | 'vertical'>>
}>('tabsContext')

const orientation = tabsContext?.orientation.value || 'horizontal'
</script>

<template>
  <div
    data-slot="tabs-list"
    role="tablist"
    :aria-orientation="orientation"
    :class="[
      'inline-flex w-fit items-center justify-center rounded-lg p-1',
      'bg-stroke-regular',
      orientation === 'horizontal' ? 'h-9 flex-row' : 'h-auto flex-col',
    ]"
  >
    <slot />
  </div>
</template>
