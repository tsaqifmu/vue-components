<script setup lang="ts">
import ErrorMessage from '@/components/atoms/ErrorMessage/ErrorMessage.vue'
import Label from '@/components/atoms/Label/Label.vue'
import AdvancedInputField from '@/components/molecules/AdvancedInputField/AdvancedInputField.vue'
import { cn } from '@/lib/utils'
import { computed, type InputHTMLAttributes } from 'vue'

export interface AdvancedFormFieldProps
  extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'class' | 'disabled' | 'type'> {
  label?: string
  placeholder?: string
  id?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  required?: boolean
  clearable?: boolean
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search'
  class?: string
  wrapperClass?: string
  labelClass?: string
  inputClass?: string
}

const props = withDefaults(defineProps<AdvancedFormFieldProps>(), {
  placeholder: '',
  disabled: false,
  error: false,
  errorMessage: 'This field has an error',
  required: false,
  clearable: false,
  type: 'text',
})

const model = defineModel<string | number>({ default: '' })

// Generate unique ID if not provided
const computedId = computed(
  () => props.id || `field-${Math.random().toString(36).substring(2, 11)}`,
)

const labelState = computed(() => (props.disabled ? 'disabled' : 'default'))
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <!-- Label -->
    <Label
      v-if="label"
      :htmlFor="computedId"
      :state="labelState"
      :required="required"
      :class="labelClass"
    >
      {{ label }}
    </Label>

    <!-- Advanced Input Field -->
    <AdvancedInputField
      v-bind="$attrs"
      v-model="model"
      :id="computedId"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="error"
      :clearable="clearable"
      :wrapperClass="wrapperClass"
      :inputClass="inputClass"
    >
      <!-- Pass through all slots -->
      <template v-if="$slots['suffix-icon']" #suffix-icon>
        <slot name="suffix-icon" />
      </template>
      <template v-if="$slots['append-button']" #append-button="slotProps">
        <slot name="append-button" v-bind="slotProps" />
      </template>
      <template v-if="$slots['append-button-icon']" #append-button-icon="slotProps">
        <slot name="append-button-icon" v-bind="slotProps" />
      </template>
    </AdvancedInputField>

    <!-- Error Message -->
    <ErrorMessage :id="`${computedId}-error`" :message="error ? errorMessage : undefined" />
  </div>
</template>
