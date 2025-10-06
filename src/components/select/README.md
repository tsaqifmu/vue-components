# Select Components

A compound component system inspired by shadcn/ui and Radix UI, providing accessible and flexible select components for form inputs. Built with the same technical approach as our DropdownMenu component but optimized for form value selection.

## Components

### SelectRoot

The root component that provides context and manages state for all child components. Supports `v-model` for two-way data binding.

**Props:**

- `modelValue?: string | number` - The selected value
- `placeholder?: string` - Placeholder text when no value is selected (default: 'Select an option...')

**Events:**

- `@update:modelValue` - Emitted when value changes

### SelectTrigger

The trigger button that opens/closes the select dropdown and displays the selected value.

**Props:**

- `size?: 'sm' | 'default' | 'lg'` - Button size (default: 'default')
- `disabled?: boolean` - Disable the select
- `class?: string` - Custom CSS classes

**Slot Props:**

- `value` - The current selected value
- `isPlaceholder` - Whether showing placeholder

### SelectValue

A utility component to display the selected value. Usually used inside SelectTrigger or SelectItem.

**Slot Props:**

- `value` - The current selected value
- `isPlaceholder` - Whether showing placeholder

### SelectContent

The container that holds select options. Supports positioning, smooth animations, and teleport mode.

**Props:**

- `position?: 'top' | 'bottom'` - Dropdown position (default: 'bottom')
- `align?: 'start' | 'center' | 'end'` - Alignment relative to trigger (default: 'start')
- `class?: string` - Custom CSS classes
- `teleport?: boolean` - Render to body with fixed positioning (default: `true`)

**Key Features:**

- **Teleport by Default:** Content is rendered to `<body>` to prevent clipping
- **Body Scroll Lock:** Page scroll is disabled when open
- **Auto Width Matching:** Minimum width matches trigger button
- **Smart Positioning:** Automatically adjusts if would go offscreen

### SelectItem

Individual select options with checkmark indicator for selected state.

**Props:**

- `value: string | number` - The value of this option (required)
- `label?: string` - Display label (optional, can use slot instead)
- `disabled?: boolean` - Disable this option
- `class?: string` - Custom CSS classes

**Slot Props:**

- `selected` - Whether this item is currently selected

### SelectGroup

Groups related options together with an optional label.

### SelectLabel

A label for a SelectGroup. Provides semantic grouping and accessibility.

### SelectSeparator

A visual separator between select sections.

## Usage

### Basic Example

```vue
<template>
  <SelectRoot v-model="selectedCountry">
    <SelectTrigger class="w-[280px]">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
      <SelectItem value="us">🇺🇸 United States</SelectItem>
      <SelectItem value="sg">🇸🇬 Singapore</SelectItem>
      <SelectItem value="jp">🇯🇵 Japan</SelectItem>
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/select'

const selectedCountry = ref<string>()
</script>
```

### With Groups and Labels

```vue
<template>
  <SelectRoot v-model="selectedTimezone">
    <SelectTrigger class="w-[280px]">
      <SelectValue placeholder="Select timezone" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Asia</SelectLabel>
        <SelectItem value="asia/jakarta">Jakarta (GMT+7)</SelectItem>
        <SelectItem value="asia/singapore">Singapore (GMT+8)</SelectItem>
        <SelectItem value="asia/tokyo">Tokyo (GMT+9)</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>America</SelectLabel>
        <SelectItem value="america/new_york">New York (GMT-5)</SelectItem>
        <SelectItem value="america/los_angeles">Los Angeles (GMT-8)</SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/select'

const selectedTimezone = ref<string>('asia/jakarta')
</script>
```

### Custom Display with Slots

```vue
<template>
  <SelectRoot v-model="selectedUser">
    <SelectTrigger class="w-[280px]">
      <SelectValue>
        <template #default="{ value, isPlaceholder }">
          <div v-if="!isPlaceholder" class="flex items-center gap-2">
            <img :src="getUserAvatar(value)" class="h-5 w-5 rounded-full" />
            <span>{{ getUserName(value) }}</span>
          </div>
          <span v-else class="text-gray-400">Select user...</span>
        </template>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">
        <template #default="{ selected }">
          <img src="/avatar1.jpg" class="h-5 w-5 rounded-full" />
          <span>John Doe</span>
        </template>
      </SelectItem>
      <SelectItem value="2">
        <template #default="{ selected }">
          <img src="/avatar2.jpg" class="h-5 w-5 rounded-full" />
          <span>Jane Smith</span>
        </template>
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>
```

### Inside Modal or Overflow Container

Teleport is enabled by default, so the select works seamlessly inside modals or any overflow containers:

```vue
<template>
  <ModalRoot v-model:open="isOpen">
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <!-- Select inside modal - teleport is enabled by default -->
        <SelectRoot v-model="selectedCountry">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent class="max-h-60">
            <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
            <SelectItem value="us">🇺🇸 United States</SelectItem>
            <SelectItem value="sg">🇸🇬 Singapore</SelectItem>
          </SelectContent>
        </SelectRoot>
      </ModalBody>
    </ModalContent>
  </ModalRoot>
</template>
```

### Different Sizes

```vue
<template>
  <div class="space-y-4">
    <!-- Small -->
    <SelectRoot v-model="value1">
      <SelectTrigger size="sm" class="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectContent>
    </SelectRoot>

    <!-- Default -->
    <SelectRoot v-model="value2">
      <SelectTrigger size="default" class="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectContent>
    </SelectRoot>

    <!-- Large -->
    <SelectRoot v-model="value3">
      <SelectTrigger size="lg" class="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectContent>
    </SelectRoot>
  </div>
</template>
```

## Features

- ✅ Compound component pattern
- ✅ Context isolation (multiple selects on same page)
- ✅ Vue native API with v-model support
- ✅ Class Variance Authority (CVA) for variants
- ✅ Smooth CSS transitions
- ✅ Full TypeScript support
- ✅ ARIA/WAI-ARIA accessibility
- ✅ Custom theme integration
- ✅ **Teleport by default** - Content rendered to body
- ✅ **Body scroll lock** - Page scroll disabled when open
- ✅ Smart positioning (auto-adjust if would go offscreen)
- ✅ Checkmark indicator for selected items
- ✅ Keyboard navigation support (Escape to close)
- ✅ Click outside to close

## Select vs DropdownMenu

**Select** is for **form value selection** (country, status, etc.), while **DropdownMenu** is for **actions** (Edit, Delete, Share, etc.).

**Key Differences:**

| Feature          | Select                       | DropdownMenu        |
| ---------------- | ---------------------------- | ------------------- |
| Purpose          | Form input / value selection | Actions / commands  |
| Value Binding    | `v-model` support            | No value binding    |
| Visual Indicator | Checkmark on selected item   | No indicator        |
| Close on Click   | Closes after selection       | Closes after action |
| ARIA Role        | `combobox` / `listbox`       | `menu`              |

**Examples:**

- ✅ Use **Select** for: Country picker, status selector, priority level, timezone
- ✅ Use **DropdownMenu** for: User actions, table row actions, navigation menus

## Accessibility

The Select component follows WAI-ARIA best practices:

- Proper ARIA roles (`combobox`, `listbox`, `option`)
- Keyboard navigation (Escape key to close)
- Screen reader friendly labels
- Focus management
- Accessible group labels

## Technical Implementation

This component is built using the same proven approach as our DropdownMenu:

- **Context-based state management** - Using Vue's provide/inject
- **Unique context keys** - Prevents conflicts between multiple instances
- **Teleport with position calculation** - Smart positioning that respects viewport boundaries
- **Body scroll lock** - Prevents scroll issues when open
- **Double RAF technique** - Smooth transitions without flicker

The key difference is that Select manages a selected value and provides visual feedback through checkmarks, while DropdownMenu is focused on executing actions.
