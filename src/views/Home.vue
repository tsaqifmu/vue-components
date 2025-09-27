<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { ref } from 'vue'

const data = ref('')
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col gap-6">
      <!-- Variants Section -->
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-gray-700">Variants</h3>
        <div class="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <!-- Sizes Section -->
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-gray-700">Sizes</h3>
        <div class="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="icon" aria-label="Check">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12l5 5l10 -10"></path>
            </svg>
          </Button>
        </div>
      </div>

      <!-- Disabled States Section -->
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-gray-700">Disabled States</h3>
        <div class="flex flex-wrap gap-2">
          <Button variant="default" disabled>Default</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="ghost" disabled>Ghost</Button>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <h3 class="text-sm font-semibold text-gray-700">Input</h3>
      <Input
        v-model="data"
        :maxlength="10"
        :error="false"
        label="Input"
        placeholder="Input"
        errorMessage="Ini adalah error message yang sudah disediakan"
      />
    </div>
  </div>
</template>
