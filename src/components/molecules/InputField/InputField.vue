<script setup lang="ts">
import CharacterCounter from '@/components/atoms/CharacterCounter/CharacterCounter.vue'
import TextInput from '@/components/atoms/TextInput/TextInput.vue'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, useAttrs, type InputHTMLAttributes } from 'vue'

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

export type WrapperVariants = VariantProps<typeof wrapperVariants>

export interface InputFieldProps
  extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'class' | 'disabled'> {
  id?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  wrapperClass?: string
  inputClass?: string
}

const props = defineProps<InputFieldProps>()

const model = defineModel<string | number>({ default: '' })

const attrs = useAttrs()

// Computed properties
const state = computed(() => {
  if (props.disabled) return 'disabled'
  if (props.error) return 'error'
  return 'default'
})

const hasCounter = computed(() => !!attrs.maxlength)
const currentLength = computed(() => String(model.value || '').length)

const wrapperClasses = computed(() =>
  cn(wrapperVariants({ state: state.value }), props.wrapperClass),
)

// ARIA attributes
const ariaAttributes = computed(() => ({
  'aria-invalid': props.error || undefined,
  'aria-describedby': props.error ? `${props.id}-error` : undefined,
}))
</script>

<template>
  <div :class="wrapperClasses">
    <TextInput
      v-bind="{ ...$attrs, ...ariaAttributes }"
      :id="id"
      v-model="model"
      :placeholder="placeholder"
      :disabled="disabled"
      :state="state"
      :spacing="hasCounter ? 'withCounter' : 'default'"
      :class="inputClass"
    />

    <CharacterCounter
      v-if="hasCounter"
      :current="currentLength"
      :max="Number(attrs.maxlength)"
      :error="error"
      :disabled="disabled"
    />
  </div>
</template>
