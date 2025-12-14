<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav class="bg-primary p-4 text-white">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold">Vue Components</h1>
        <div class="space-x-4">
          <RouterLink to="/" class="transition-colors hover:text-blue-200">Home</RouterLink>
          <RouterLink to="/demo-button" class="transition-colors hover:text-blue-200"
            >Demo Button</RouterLink
          >
          <RouterLink to="/demo-tabs" class="transition-colors hover:text-blue-200"
            >Demo Tabs</RouterLink
          >
          <RouterLink to="/demo-input" class="transition-colors hover:text-blue-200"
            >Demo Input</RouterLink
          >
          <RouterLink to="/demo-modal" class="transition-colors hover:text-blue-200"
            >Demo Modal</RouterLink
          >
          <RouterLink to="/demo-select" class="transition-colors hover:text-blue-200"
            >Demo Select</RouterLink
          >
          <RouterLink to="/demo-multi-select" class="transition-colors hover:text-blue-200"
            >Demo Multi Select</RouterLink
          >
          <RouterLink to="/demo-menu" class="transition-colors hover:text-blue-200"
            >Demo Menu</RouterLink
          >
          <RouterLink to="/demo-radio-group" class="transition-colors hover:text-blue-200"
            >Demo Radio Group</RouterLink
          >
        </div>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>
