<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface ErrorMessageProps {
  id?: string
  message?: string
  class?: string
}

defineProps<ErrorMessageProps>()
</script>

<template>
  <p
    v-if="message"
    :id="id"
    :class="cn('text-notification-error text-sm font-normal', $props.class)"
    role="alert"
  >
    {{ message }}
  </p>
</template>
