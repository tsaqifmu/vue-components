<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

export interface TabsContentProps {
  value: string
}

// --- Props & Emits ---
const props = defineProps<TabsContentProps>()

const tabsContext = inject<{
  activeValue: Readonly<Ref<string>>
}>('tabsContext')

// --- State & Computed ---
const isActive = computed(() => tabsContext?.activeValue.value === props.value)
</script>

<template>
  <div
    v-show="isActive"
    role="tabpanel"
    data-slot="tabs-content"
    :id="`panel-${value}`"
    :aria-labelledby="`tab-${value}`"
    :tabindex="0"
    :data-state="isActive ? 'active' : 'inactive'"
    class="flex-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  >
    <slot />
  </div>
</template>
