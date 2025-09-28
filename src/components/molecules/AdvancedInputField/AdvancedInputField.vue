<script setup lang="ts">
import CharacterCounter from '@/components/atoms/CharacterCounter/CharacterCounter.vue'
import CloseIcon from '@/components/atoms/Icon/CloseIcon.vue'
import TextInput from '@/components/atoms/TextInput/TextInput.vue'
import Button from '@/components/ui/Button.vue'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, ref, useAttrs, watch, type InputHTMLAttributes } from 'vue'

const wrapperVariants = cva(
  [
    'relative rounded-lg shadow-small bg-surface-primary-white',
    'ring-1 ring-inset ring-gray-300',
    'transition-all duration-300',
  ],
  {
    variants: {
      state: {
        default: ['hover:ring-gray-400', 'focus-within:ring-2 focus-within:ring-primary'],
        disabled: ['bg-surface-disable ring-gray-200', 'cursor-not-allowed opacity-60'],
        error: ['ring-2 ring-danger', 'focus-within:ring-2 focus-within:ring-danger'],
        focused: ['ring-2 ring-primary'],
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
)

const appendButtonVariants = cva(
  [
    'flex min-w-fit cursor-pointer items-center justify-center gap-2',
    'border-l border-gray-300 px-3 py-2 text-sm font-medium',
    'transition-colors duration-300',
  ],
  {
    variants: {
      disabled: {
        true: 'bg-surface-disable text-gray-800 cursor-not-allowed',
        false: 'bg-surface-secondary text-black-700 hover:bg-gray-100',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

const appendButtonIconVariants = cva(
  'flex min-w-fit cursor-pointer items-center justify-center bg-white p-3 transition-colors duration-300',
  {
    variants: {
      disabled: {
        true: 'text-gray-800 cursor-not-allowed',
        false: 'text-primary hover:text-primary/80',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export type WrapperVariants = VariantProps<typeof wrapperVariants>

export interface AdvancedInputFieldProps
  extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'class' | 'disabled' | 'type'> {
  id?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  wrapperClass?: string
  inputClass?: string
  clearable?: boolean
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search'
}

const props = withDefaults(defineProps<AdvancedInputFieldProps>(), {
  type: 'text',
  clearable: false,
})

const emit = defineEmits<{
  clear: []
}>()

const model = defineModel<string | number>({ default: '' })

const attrs = useAttrs()
const isFocused = ref(false)
const showPassword = ref(false)

// Computed properties
const state = computed(() => {
  if (props.disabled) return 'disabled'
  if (props.error) return 'error'
  if (isFocused.value) return 'focused'
  return 'default'
})

const currentType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

const hasCounter = computed(() => !!attrs.maxlength)
const currentLength = computed(() => String(model.value || '').length)

const hasIcons = computed(() => {
  return props.clearable || props.type === 'password'
})

const inputSpacing = computed(() => {
  if (hasCounter.value) return 'withCounter'
  if (hasIcons.value) return 'withIcons'
  return 'default'
})

const wrapperClasses = computed(() =>
  cn(wrapperVariants({ state: state.value }), props.wrapperClass),
)

// Watch for number type validation
watch(
  model,
  (newValue) => {
    if (props.type === 'number' && typeof newValue === 'string') {
      const cleanValue = newValue.replace(/[^0-9]/g, '')
      if (cleanValue !== newValue) {
        model.value = cleanValue
      }
    }
  },
  { immediate: false },
)

// Methods
const handleClear = () => {
  model.value = ''
  emit('clear')
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (props.type === 'number') {
    // Block non-numeric keys
    if (
      !/[0-9]/.test(event.key) &&
      !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(
        event.key,
      )
    ) {
      event.preventDefault()
    }
  }
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

// ARIA attributes
const ariaAttributes = computed(() => ({
  'aria-invalid': props.error || undefined,
  'aria-describedby': props.error ? `${props.id}-error` : undefined,
}))
</script>

<template>
  <div :class="wrapperClasses">
    <div class="flex flex-row">
      <!-- Input wrapper with icons -->
      <div class="relative flex flex-1 items-center">
        <!-- Suffix Icon Slot -->
        <div v-if="$slots['suffix-icon']" class="pointer-events-none absolute left-3">
          <slot name="suffix-icon" />
        </div>

        <!-- Text Input -->
        <TextInput
          v-bind="{ ...$attrs, ...ariaAttributes }"
          v-model="model"
          :id="id"
          :type="currentType"
          :placeholder="placeholder"
          :disabled="disabled"
          :state="state === 'focused' ? 'focus' : state"
          :spacing="inputSpacing"
          :class="cn($slots['suffix-icon'] && 'pl-10', inputClass)"
          @keypress="handleKeyPress"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Action Icons Container -->
        <div
          v-if="hasIcons"
          class="absolute top-[11px] right-1 z-20 flex items-center bg-white px-3"
        >
          <!-- Clear Button -->
          <Button
            v-if="clearable"
            type="button"
            variant="custom"
            size="custom"
            :disabled="disabled"
            :class="
              cn(
                'p-[6px] transition-opacity duration-300',
                model ? 'opacity-100' : 'pointer-events-none opacity-0',
              )
            "
            @click="handleClear"
          >
            <CloseIcon :size="12" class="text-gray-600" />
          </Button>
        </div>
      </div>

      <!-- Append Button Slot -->
      <button
        v-if="$slots['append-button']"
        type="button"
        :disabled="disabled"
        :class="appendButtonVariants({ disabled })"
      >
        <slot name="append-button" :disabled="disabled" />
      </button>

      <!-- Append Button Icon Slot -->
      <button
        v-if="$slots['append-button-icon']"
        type="button"
        :disabled="disabled"
        :class="appendButtonIconVariants({ disabled })"
      >
        <slot name="append-button-icon" :disabled="disabled" />
      </button>
    </div>

    <!-- Character Counter -->
    <CharacterCounter
      v-if="hasCounter"
      :current="currentLength"
      :max="Number(attrs.maxlength)"
      :error="error"
      :disabled="disabled"
    />
  </div>
</template>
