<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold">Home app</h1>
    <Button>Click me</Button>
    <Button size="sm">Click me</Button>
    <Button variant="outline">Click me</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="ghost">Destructive</Button>
  </div>
</template>
