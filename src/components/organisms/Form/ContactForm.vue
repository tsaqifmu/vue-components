<script setup lang="ts">
import FormField from '@/components/molecules/FormField/FormField.vue'
import Button from '@/components/ui/Button.vue'
import { computed, reactive } from 'vue'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactFormProps {
  initialData?: Partial<ContactFormData>
  onSubmit?: (data: ContactFormData) => void
}

const props = defineProps<ContactFormProps>()

const emit = defineEmits<{
  submit: [data: ContactFormData]
}>()

const formData = reactive<ContactFormData>({
  name: props.initialData?.name || '',
  email: props.initialData?.email || '',
  phone: props.initialData?.phone || '',
  message: props.initialData?.message || '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

// Validation functions
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhone = (phone: string) => {
  // Simple phone validation - adjust based on your needs
  const re = /^[\d\s\-\+\(\)]+$/
  return phone.length >= 10 && re.test(phone)
}

const validateForm = () => {
  let isValid = true

  // Reset errors
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.message = ''

  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  // Validate phone (optional)
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number'
    isValid = false
  }

  // Validate message
  if (!formData.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData })
    props.onSubmit?.(formData)

    // Reset form after successful submission
    formData.name = ''
    formData.email = ''
    formData.phone = ''
    formData.message = ''
  }
}

const isFormValid = computed(() => {
  return formData.name && formData.email && formData.message
})

// Clear error when user starts typing
const clearError = (field: keyof typeof errors) => {
  errors[field] = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-lg space-y-4">
    <h2 class="mb-6 text-2xl font-bold text-gray-900">Contact Us</h2>

    <FormField
      v-model="formData.name"
      label="Full Name"
      placeholder="Enter your full name"
      :error="!!errors.name"
      :errorMessage="errors.name"
      :maxlength="50"
      required
      @input="clearError('name')"
    />

    <FormField
      v-model="formData.email"
      type="email"
      label="Email Address"
      placeholder="your.email@example.com"
      :error="!!errors.email"
      :errorMessage="errors.email"
      :maxlength="100"
      required
      @input="clearError('email')"
    />

    <FormField
      v-model="formData.phone"
      type="tel"
      label="Phone Number"
      placeholder="+1 (555) 123-4567"
      :error="!!errors.phone"
      :errorMessage="errors.phone"
      :maxlength="20"
      @input="clearError('phone')"
    />

    <FormField
      v-model="formData.message"
      label="Message"
      placeholder="Tell us how we can help you..."
      :error="!!errors.message"
      :errorMessage="errors.message"
      :maxlength="500"
      required
      @input="clearError('message')"
    />

    <div class="flex gap-3 pt-4">
      <Button type="submit" :disabled="!isFormValid" variant="default"> Send Message </Button>

      <Button type="button" variant="outline" @click="$emit('submit', formData)">
        Save Draft
      </Button>
    </div>
  </form>
</template>
