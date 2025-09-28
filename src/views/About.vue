<script setup lang="ts">
import Input from '@/components/ui/Input.vue'
import { ref } from 'vue'

const data = ref('')
</script>

<template>
  <div>
    <p>About Page</p>
    <Input v-model="data" :maxlength="50" error error-message="Nganu ini gesi" />
  </div>
</template>
