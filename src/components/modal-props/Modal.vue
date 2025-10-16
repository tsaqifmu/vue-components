<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { lockBodyScroll, unlockBodyScroll } from '../../lib/scrollLock'

interface Props {
  open?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  showCloseButton?: boolean
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  closeOnOverlayClick?: boolean
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  contentClass?: string
  overlayClass?: string
  titleClass?: string
  confirmButtonClass?: string
  cancelButtonClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: '',
  size: 'md',
  showCloseButton: true,
  showFooter: true,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  closeOnOverlayClick: true,
  headerClass: '',
  bodyClass: '',
  footerClass: '',
  contentClass: '',
  overlayClass: '',
  titleClass: '',
  confirmButtonClass: '',
  cancelButtonClass: '',
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// State
const isOpen = ref(props.open)

// Computed
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4',
  }
  return sizes[props.size]
})

// Watchers
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal
  },
)

let cleanupTimeoutId: ReturnType<typeof setTimeout> | null = null

watch(isOpen, (newVal) => {
  emit('update:open', newVal)

  if (newVal) {
    if (cleanupTimeoutId) {
      clearTimeout(cleanupTimeoutId)
      cleanupTimeoutId = null
    }
    lockBodyScroll()
  } else {
    cleanupTimeoutId = setTimeout(() => {
      unlockBodyScroll()
      cleanupTimeoutId = null
    }, 500)
    emit('close')
  }
})

// Methods
const closeModal = () => {
  isOpen.value = false
}

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    closeModal()
  }
}

const handleCancel = () => {
  emit('cancel')
  closeModal()
}

const handleConfirm = () => {
  emit('confirm')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

// Lifecycle
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}

onUnmounted(() => {
  if (cleanupTimeoutId) {
    clearTimeout(cleanupTimeoutId)
  }
  if (isOpen.value) {
    unlockBodyScroll()
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[998] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'modal-title' : undefined"
      >
        <!-- Overlay -->
        <div
          :class="['absolute inset-0 right-0 w-screen bg-black/40 backdrop-blur-sm', overlayClass]"
          @click="handleOverlayClick"
        ></div>

        <!-- Modal Content Container -->
        <div
          :class="[
            'relative z-[999] w-full rounded-2xl border border-gray-200 bg-white shadow-xl',
            'flex max-h-[90vh] flex-col',
            sizeClasses,
            contentClass,
          ]"
        >
          <!-- Header -->
          <div
            v-if="title || showCloseButton || $slots.header"
            :class="[
              'flex items-center justify-between border-b border-gray-200 px-6 py-4',
              headerClass,
            ]"
          >
            <slot name="header">
              <h2
                v-if="title"
                id="modal-title"
                :class="['text-xl font-semibold text-gray-900', titleClass]"
              >
                {{ title }}
              </h2>
            </slot>

            <!-- Close Button -->
            <button
              v-if="showCloseButton"
              @click="closeModal"
              type="button"
              class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div :class="['flex-1 overflow-y-auto px-6 py-4', bodyClass]">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div
            v-if="showFooter || $slots.footer"
            :class="[
              'flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4',
              footerClass,
            ]"
          >
            <slot name="footer">
              <button
                @click="handleCancel"
                type="button"
                :class="[
                  'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700',
                  'hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none',
                  'transition-colors',
                  cancelButtonClass,
                ]"
              >
                {{ cancelText }}
              </button>
              <button
                @click="handleConfirm"
                type="button"
                :class="[
                  'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white',
                  'hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none',
                  'transition-colors',
                  confirmButtonClass,
                ]"
              >
                {{ confirmText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .relative,
.modal-fade-leave-to .relative {
  transform: scale(0.95);
}
</style>
