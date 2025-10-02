<template>
  <div ref="container" class="group relative inline-block" :data-state="isOpen ? 'open' : 'closed'">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, type InjectionKey, type Ref } from 'vue'

// Generate unique context key for each MenuRoot instance
// This prevents conflicts when multiple menus exist on the same page
let menuInstanceCounter = 0
const menuId = `menu-${++menuInstanceCounter}`
const contextKey: InjectionKey<MenuContext> = Symbol(`menu-context-${menuId}`)

// TypeScript interface for type safety
interface MenuContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

// State management with Vue native ref
const isOpen = ref(false)
const container = ref<HTMLElement>()

// Simple methods
const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

// Handle click outside - Vue native way
const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    close()
  }
}

// Handle escape key - Vue native way
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

// Setup event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
})

// Cleanup event listeners
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
})

// Provide context with unique key to prevent conflicts
provide(contextKey, {
  id: menuId,
  isOpen,
  open,
  close,
  toggle,
})

// Also provide the context key for child components to use
provide('menu-context-key', contextKey)
</script>
