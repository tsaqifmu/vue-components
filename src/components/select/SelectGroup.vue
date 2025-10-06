<template>
  <div role="group" :aria-labelledby="labelId" class="py-1">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'

// Generate unique label ID for this group
let groupInstanceCounter = 0
const labelId = `select-group-label-${++groupInstanceCounter}`

// Provide label ID to SelectLabel children
provide('select-group-label-id', labelId)
</script>
