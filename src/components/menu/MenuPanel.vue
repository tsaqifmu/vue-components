<template>
  <Transition
    name="menu-panel"
    enter-active-class="menu-enter-active"
    enter-from-class="menu-enter-from"
    enter-to-class="menu-enter-to"
    leave-active-class="menu-leave-active"
    leave-from-class="menu-leave-from"
    leave-to-class="menu-leave-to"
  >
    <div
      v-if="isMenuOpen"
      :class="panelClasses"
      role="menu"
      :aria-labelledby="menu?.id"
      @click.stop
    >
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed, inject, type InjectionKey, type Ref } from 'vue'
import { cn } from '../../lib/utils'

const menuPanelVariants = cva(
  'absolute z-50 w-48 rounded-md bg-surface-primary-white shadow-card-float border border-gray-300 py-1',
  {
    variants: {
      position: {
        top: 'bottom-full mb-1 origin-bottom',
        bottom: 'top-full mt-1 origin-top',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  },
)

interface Props {
  position?: 'bottom' | 'top'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
})

interface MenuContext {
  id: string
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const contextKey = inject<InjectionKey<MenuContext>>('menu-context-key')
const menu = contextKey ? inject(contextKey) : null

const isMenuOpen = computed(() => menu?.isOpen.value ?? false)

const panelClasses = computed(() =>
  cn(menuPanelVariants({ position: props.position as 'bottom' | 'top' }), props.class),
)
</script>

<style scoped>
.menu-enter-active {
  transition: all 0.2s ease-out;
}

.menu-leave-active {
  transition: all 0.15s ease-in;
}

.menu-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.menu-enter-to {
  opacity: 1;
  transform: scale(1);
}

.menu-leave-from {
  opacity: 1;
  transform: scale(1);
}

.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
