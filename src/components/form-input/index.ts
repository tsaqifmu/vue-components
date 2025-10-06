import CharacterCounter from './CharacterCounter.vue'
import ErrorMessage from './ErrorMessage.vue'
import FormInputField from './FormInputField.vue'
import Label from './Label.vue'

// Compound component pattern - attach sub-components to the main component
const FormInput = FormInputField as typeof FormInputField & {
  Label: typeof Label
  CharacterCounter: typeof CharacterCounter
  ErrorMessage: typeof ErrorMessage
}

FormInput.Label = Label
FormInput.CharacterCounter = CharacterCounter
FormInput.ErrorMessage = ErrorMessage

// Named exports for direct imports
export { CharacterCounter, ErrorMessage, Label }

// Default export with compound components
export default FormInput

// Type exports
export type { CharacterCounterProps } from './CharacterCounter.vue'
export type { ErrorMessageProps } from './ErrorMessage.vue'
export type { LabelProps, LabelVariants } from './Label.vue'
