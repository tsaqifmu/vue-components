<script setup lang="ts">
import ErrorMessage from '@/components/atoms/ErrorMessage/ErrorMessage.vue'
import Label from '@/components/atoms/Label/Label.vue'
import InputField from '@/components/molecules/InputField/InputField.vue'
import { cn } from '@/lib/utils'
import { computed, type InputHTMLAttributes } from 'vue'

export interface FormFieldProps
  extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'class' | 'disabled'> {
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
  inputClass?: string
}

const props = withDefaults(defineProps<FormFieldProps>(), {
  placeholder: '',
  disabled: false,
  error: false,
  errorMessage: '',
  required: false,
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

    <!-- Input Field -->
    <InputField
      v-bind="$attrs"
      v-model="model"
      :id="computedId"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="error"
      :wrapperClass="wrapperClass"
      :inputClass="inputClass"
    />

    <!-- Error Message -->
    <ErrorMessage :id="`${computedId}-error`" :message="error ? errorMessage : undefined" />
  </div>
</template>
