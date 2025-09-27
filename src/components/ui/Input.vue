<script setup lang="ts">
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { computed, useAttrs, type InputHTMLAttributes } from 'vue'

const inputVariants = cva(
  [
    'block w-full border-0 bg-transparent',
    'text-text-title placeholder:text-text-placeholder',
    'sm:text-sm sm:leading-6 outline-none rounded-lg',
    'transition-all duration-200',
  ],
  {
    variants: {
      state: {
        default: '',
        disabled: 'cursor-not-allowed text-gray-500 bg-surface-disable',
        error: '',
      },
      hasCounter: {
        true: 'py-3 pb-8 px-4',
        false: 'py-3 px-4',
      },
    },
    defaultVariants: {
      state: 'default',
      hasCounter: false,
    },
  },
)

const wrapperVariants = cva(
  [
    'relative rounded-lg shadow-small bg-surface-primary-white',
    'ring-1 ring-inset ring-gray-300',
    'transition-all duration-200',
  ],
  {
    variants: {
      state: {
        default: ['hover:ring-gray-400', 'focus-within:ring-2 focus-within:ring-primary'],
        disabled: ['bg-surface-disable ring-gray-200', 'cursor-not-allowed opacity-60'],
        error: ['ring-2 ring-danger', 'focus-within:ring-2 focus-within:ring-danger'],
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
)

const labelVariants = cva('block text-sm font-normal text-text-subtitle', {
  variants: {
    disabled: {
      true: 'opacity-60 cursor-not-allowed',
      false: '',
    },
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-danger",
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
    required: false,
  },
})

// Props interface yang lebih comprehensive
export interface BaseInputProps
  extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'class' | 'disabled'> {
  modelValue?: string | number
  label?: string
  placeholder?: string
  id?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  required?: boolean
  class?: string
  wrapperClass?: string
  labelClass?: string
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  placeholder: '',
  id: undefined,
  disabled: false,
  error: false,
  errorMessage: '',
  modelValue: '',
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const attrs = useAttrs()

// Generate unique ID if not provided
const computedId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

// Handler
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

// Computed classes
const state = computed(() => {
  if (props.disabled) return 'disabled'
  if (props.error) return 'error'
  return 'default'
})

const hasCounter = computed(() => !!attrs.maxlength)

const currentLength = computed(() => String(props.modelValue || '').length)

const computedLabelClasses = computed(() =>
  cn(
    labelVariants({
      disabled: props.disabled,
      required: props.required,
    }),
    props.labelClass,
  ),
)

const computedWrapperClasses = computed(() =>
  cn(wrapperVariants({ state: state.value }), props.wrapperClass),
)

const computedInputClasses = computed(() =>
  cn(
    inputVariants({
      state: state.value,
      hasCounter: hasCounter.value,
    }),
  ),
)

// Computed ARIA attributes for accessibility
const ariaAttributes = computed(() => ({
  'aria-invalid': props.error || undefined,
  'aria-describedby':
    [props.error && props.errorMessage ? `${computedId.value}-error` : null]
      .filter(Boolean)
      .join(' ') || undefined,
  'aria-required': props.required || undefined,
}))
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <!-- Label -->
    <label v-if="label" :for="computedId" :class="computedLabelClasses">
      {{ label }}
    </label>

    <!-- Input Wrapper -->
    <div :class="computedWrapperClasses">
      <input
        v-bind="{ ...$attrs, ...ariaAttributes }"
        :id="computedId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="computedInputClasses"
        @input="handleInput"
      />

      <!-- Character Counter -->
      <div
        v-if="hasCounter"
        :class="
          cn(
            'pointer-events-none absolute right-3 bottom-2 text-xs font-semibold',
            props.error ? 'text-notification-error' : 'text-text-subtitle',
            props.disabled && 'opacity-60',
          )
        "
        aria-live="polite"
        aria-atomic="true"
      >
        <span
          :class="{
            'text-notification-error': attrs.maxlength && currentLength > Number(attrs.maxlength),
          }"
        >
          {{ currentLength }}
        </span>
        <span>/{{ attrs.maxlength }}</span>
      </div>
    </div>

    <!-- Error Message -->
    <p
      v-if="error && errorMessage"
      :id="`${computedId}-error`"
      class="text-notification-error text-sm font-normal"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
