<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav class="bg-blue-300 p-4 text-white">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold">Vue Kickstart</h1>
        <div class="space-x-4">
          <RouterLink to="/" class="transition-colors hover:text-blue-200">Home</RouterLink>
          <RouterLink to="/about" class="transition-colors hover:text-blue-200">About</RouterLink>
          <RouterLink to="/demo-input" class="transition-colors hover:text-blue-200"
            >Demo Input</RouterLink
          >
          <RouterLink to="/demo-menu" class="transition-colors hover:text-blue-200"
            >Demo Menu</RouterLink
          >
        </div>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>
