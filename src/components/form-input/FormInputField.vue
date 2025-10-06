<script setup lang="ts">
import CharacterCounter from '@/components/atoms/CharacterCounter/CharacterCounter.vue'
import CloseIcon from '@/components/atoms/Icon/CloseIcon.vue'
import Button from '@/components/ui/Button.vue'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, ref, useAttrs, useSlots, watch, type InputHTMLAttributes } from 'vue'

// CVA for wrapper
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

// CVA for input
const inputVariants = cva(
  [
    'block w-full border-0 bg-transparent',
    'text-text-title placeholder:text-text-placeholder',
    'sm:text-sm sm:leading-6 outline-none rounded-lg',
    'transition-all duration-300 overflow-hidden',
  ],
  {
    variants: {
      state: {
        default: '',
        disabled: 'cursor-not-allowed text-gray-500 bg-surface-disable',
        error: '',
        focus: '',
      },
      spacing: {
        default: 'py-3 px-4',
        withCounter: 'pt-3 pb-8 px-4',
        withIcons: 'py-3 pl-4 pr-13',
        'withcounter&icons': 'pt-3 pb-8 pr-13 pl-4',
      },
    },
    defaultVariants: {
      state: 'default',
      spacing: 'default',
    },
  },
)

export type WrapperVariants = VariantProps<typeof wrapperVariants>
export type InputVariants = VariantProps<typeof inputVariants>

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

// --- Props & Emits ---
const props = withDefaults(defineProps<AdvancedInputFieldProps>(), {
  type: 'text',
  clearable: false,
})

const emit = defineEmits<{
  clear: []
}>()

const model = defineModel<string | number>({ default: '' })

// --- Composables ---
const attrs = useAttrs()
const slots = useSlots()

// --- Refs & Computed ---
const isFocused = ref(false)
const showPassword = ref(false)

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
const hasIcons = computed(() => {
  return props.clearable || props.type === 'password'
})

const currentLength = computed(() => String(model.value || '').length)

// handle spacing for input
const inputSpacing = computed(() => {
  if (hasCounter.value && hasIcons.value) return 'withcounter&icons'
  if (hasCounter.value) return 'withCounter'
  if (hasIcons.value) return 'withIcons'
  return 'default'
})

const wrapperClasses = computed(() =>
  cn(wrapperVariants({ state: state.value }), props.wrapperClass),
)

const inputClasses = computed(() =>
  cn(
    inputVariants({
      state: state.value === 'focused' ? 'focus' : state.value,
      spacing: inputSpacing.value,
    }),
    slots['suffix-icon'] && 'pl-10',
    props.inputClass,
  ),
)

// ARIA attributes
const ariaAttributes = computed(() => ({
  'aria-invalid': props.error || undefined,
  'aria-describedby': props.error ? `${props.id}-error` : undefined,
}))

// --- Watchers ---
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

// --- Methods ---
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

        <!-- Input HTML -->
        <input
          v-bind="{ ...$attrs, ...ariaAttributes }"
          v-model="model"
          :id="id"
          :type="currentType"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="inputClasses"
          @keypress="handleKeyPress"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Action Clear Button Container -->
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
