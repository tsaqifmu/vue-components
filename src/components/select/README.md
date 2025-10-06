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

- `disabled?: boolean` - Disable the select
- `class?: string` - Custom CSS classes

**Slot Props:**

- `value` - The current selected value
- `isPlaceholder` - Whether showing placeholder

**Default Slot:**

By default, SelectTrigger displays the selected item's label or the placeholder text. You can customize the display using the default slot with the provided slot props.

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
  <SelectRoot v-model="selectedCountry" placeholder="Select a country">
    <SelectTrigger class="w-[280px]" />
    <SelectContent>
      <SelectItem value="id" label="🇮🇩 Indonesia">🇮🇩 Indonesia</SelectItem>
      <SelectItem value="us" label="🇺🇸 United States">🇺🇸 United States</SelectItem>
      <SelectItem value="sg" label="🇸🇬 Singapore">🇸🇬 Singapore</SelectItem>
      <SelectItem value="jp" label="🇯🇵 Japan">🇯🇵 Japan</SelectItem>
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SelectRoot, SelectTrigger, SelectContent, SelectItem } from '@/components/select'

const selectedCountry = ref<string>()
</script>
```

### With Groups and Labels

```vue
<template>
  <SelectRoot v-model="selectedTimezone" placeholder="Select timezone">
    <SelectTrigger class="w-[280px]" />
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Asia</SelectLabel>
        <SelectItem value="asia/jakarta" label="Jakarta (GMT+7)">Jakarta (GMT+7)</SelectItem>
        <SelectItem value="asia/singapore" label="Singapore (GMT+8)">Singapore (GMT+8)</SelectItem>
        <SelectItem value="asia/tokyo" label="Tokyo (GMT+9)">Tokyo (GMT+9)</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>America</SelectLabel>
        <SelectItem value="america/new_york" label="New York (GMT-5)">New York (GMT-5)</SelectItem>
        <SelectItem value="america/los_angeles" label="Los Angeles (GMT-8)"
          >Los Angeles (GMT-8)</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
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
  <SelectRoot v-model="selectedUser" placeholder="Select user...">
    <SelectTrigger class="w-[280px]">
      <template #default="{ value, isPlaceholder }">
        <div v-if="!isPlaceholder" class="flex items-center gap-2">
          <img :src="getUserAvatar(value)" class="h-5 w-5 rounded-full" />
          <span>{{ getUserName(value) }}</span>
        </div>
        <span v-else class="text-gray-400">Select user...</span>
      </template>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1" label="John Doe">
        <div class="flex items-center gap-2">
          <img src="/avatar1.jpg" class="h-5 w-5 rounded-full" />
          <span>John Doe</span>
        </div>
      </SelectItem>
      <SelectItem value="2" label="Jane Smith">
        <div class="flex items-center gap-2">
          <img src="/avatar2.jpg" class="h-5 w-5 rounded-full" />
          <span>Jane Smith</span>
        </div>
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
        <SelectRoot v-model="selectedCountry" placeholder="Select country">
          <SelectTrigger class="w-full" />
          <SelectContent class="max-h-60">
            <SelectItem value="id" label="🇮🇩 Indonesia">🇮🇩 Indonesia</SelectItem>
            <SelectItem value="us" label="🇺🇸 United States">🇺🇸 United States</SelectItem>
            <SelectItem value="sg" label="🇸🇬 Singapore">🇸🇬 Singapore</SelectItem>
          </SelectContent>
        </SelectRoot>
      </ModalBody>
    </ModalContent>
  </ModalRoot>
</template>
```

### Different Trigger Sizes

You can customize the trigger button size using Tailwind CSS classes:

```vue
<template>
  <div class="space-y-4">
    <!-- Small -->
    <SelectRoot v-model="value1" placeholder="Small select">
      <SelectTrigger class="w-[180px]" />
      <SelectContent>
        <SelectItem value="1" label="Option 1">Option 1</SelectItem>
        <SelectItem value="2" label="Option 2">Option 2</SelectItem>
      </SelectContent>
    </SelectRoot>

    <!-- Default -->
    <SelectRoot v-model="value2" placeholder="Default select">
      <SelectTrigger class="w-[200px]" />
      <SelectContent>
        <SelectItem value="1" label="Option 1">Option 1</SelectItem>
        <SelectItem value="2" label="Option 2">Option 2</SelectItem>
      </SelectContent>
    </SelectRoot>

    <!-- Large -->
    <SelectRoot v-model="value3" placeholder="Large select">
      <SelectTrigger class="w-[280px]" />
      <SelectContent>
        <SelectItem value="1" label="Option 1">Option 1</SelectItem>
        <SelectItem value="2" label="Option 2">Option 2</SelectItem>
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
