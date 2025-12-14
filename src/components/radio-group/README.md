# RadioGroup Component

A compound component for creating accessible radio group inputs, inspired by shadcn/ui.

## Installation

Import the components from the radio-group folder:

```typescript
import { RadioGroupRoot, RadioGroupItem } from '@/components/radio-group'
```

## Usage

### Basic Example

```vue
<template>
  <RadioGroupRoot default-value="comfortable">
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="default" />
      <span>Default</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="comfortable" />
      <span>Comfortable</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="compact" />
      <span>Compact</span>
    </label>
  </RadioGroupRoot>
</template>
```

### Controlled Mode

```vue
<script setup>
import { ref } from 'vue'
const selected = ref('option1')
</script>

<template>
  <RadioGroupRoot v-model="selected">
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="option1" />
      <span>Option 1</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="option2" />
      <span>Option 2</span>
    </label>
  </RadioGroupRoot>
</template>
```

### Horizontal Orientation

```vue
<template>
  <RadioGroupRoot orientation="horizontal">
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="small" />
      <span>Small</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="medium" />
      <span>Medium</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="large" />
      <span>Large</span>
    </label>
  </RadioGroupRoot>
</template>
```

### Disabled Items

```vue
<template>
  <RadioGroupRoot>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioGroupItem value="enabled" />
      <span>Enabled option</span>
    </label>
    <label class="flex cursor-not-allowed items-center gap-2">
      <RadioGroupItem value="disabled" disabled />
      <span class="text-gray-400">Disabled option</span>
    </label>
  </RadioGroupRoot>
</template>
```

### Disabled Group

```vue
<template>
  <RadioGroupRoot disabled>
    <label class="flex cursor-not-allowed items-center gap-2">
      <RadioGroupItem value="option1" />
      <span>Option 1</span>
    </label>
    <label class="flex cursor-not-allowed items-center gap-2">
      <RadioGroupItem value="option2" />
      <span>Option 2</span>
    </label>
  </RadioGroupRoot>
</template>
```

## API Reference

### RadioGroupRoot

The root component that provides context for the radio group.

| Prop                   | Type                         | Default        | Description                       |
| ---------------------- | ---------------------------- | -------------- | --------------------------------- |
| `defaultValue`         | `string`                     | -              | Initial value (uncontrolled mode) |
| `modelValue` (v-model) | `string`                     | -              | Current value (controlled mode)   |
| `disabled`             | `boolean`                    | `false`        | Disable all items in the group    |
| `name`                 | `string`                     | auto-generated | Form name attribute               |
| `orientation`          | `'horizontal' \| 'vertical'` | `'vertical'`   | Layout orientation                |
| `class`                | `string`                     | -              | Additional CSS classes            |

### RadioGroupItem

Individual radio item component.

| Prop       | Type      | Default        | Description                |
| ---------- | --------- | -------------- | -------------------------- |
| `value`    | `string`  | **required**   | Value for this item        |
| `id`       | `string`  | auto-generated | ID attribute for the input |
| `disabled` | `boolean` | `false`        | Disable this specific item |
| `class`    | `string`  | -              | Additional CSS classes     |

## Accessibility

- Uses proper `role="radiogroup"` and `role="radio"` attributes
- Supports keyboard navigation (Space/Enter to select)
- Includes `aria-checked` and `aria-disabled` attributes
- Uses `data-state` for styling purposes

## Styling

The component uses Tailwind CSS classes and supports the following data attributes for custom styling:

- `data-slot="radio-group"` - Root element
- `data-slot="radio-group-item"` - Radio item button
- `data-slot="radio-group-indicator"` - Selected state indicator
- `data-state="checked" | "unchecked"` - Selection state
- `data-disabled` - Disabled state
