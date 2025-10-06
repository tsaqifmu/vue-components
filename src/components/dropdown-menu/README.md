# DropdownMenu Components

A compound component system inspired by shadcn/ui, Radix UI, and Headless UI, providing accessible and flexible dropdown menu components for actions and navigation.

## Components

### DropdownMenuRoot

The root component that provides context and manages state for all child components.

### DropdownMenuButton

The trigger button that opens/closes the dropdown menu. Supports multiple variants and states.

### DropdownMenuPanel

The container that holds menu options. Supports positioning (top/bottom), smooth animations, and teleport mode for rendering outside overflow containers.

**Props:**

- `position?: 'top' | 'bottom'` - Dropdown position (default: 'bottom')
- `class?: string` - Custom CSS classes
- `teleport?: boolean` - If true, renders dropdown to body with fixed positioning (default: `true`)

**Key Features:**

- **Teleport by Default:** Dropdown menu is rendered to `<body>` to prevent clipping issues with overflow containers
- **Body Scroll Lock:** When dropdown menu is open, page scroll is disabled to prevent positioning issues
- **Auto Width Matching:** Dropdown width automatically matches the button width via inline styles
- **Smart Positioning:** Automatically adjusts position if menu would go offscreen

### DropdownMenuOption

Individual menu items with support for destructive actions and disabled states.

### DropdownMenuDivider

A visual separator between menu sections.

### DropdownMenuHeader

A header component for organizing menu sections.

## Usage

### Basic Example

```vue
<template>
  <DropdownMenuRoot>
    <DropdownMenuButton label="Actions" variant="primary" />
    <DropdownMenuPanel>
      <DropdownMenuHeader>Account</DropdownMenuHeader>
      <DropdownMenuOption>Profile</DropdownMenuOption>
      <DropdownMenuOption>Settings</DropdownMenuOption>
      <DropdownMenuDivider />
      <DropdownMenuHeader>Actions</DropdownMenuHeader>
      <DropdownMenuOption destructive>Delete</DropdownMenuOption>
    </DropdownMenuPanel>
  </DropdownMenuRoot>
</template>

<script setup>
import {
  DropdownMenuRoot,
  DropdownMenuButton,
  DropdownMenuPanel,
  DropdownMenuOption,
  DropdownMenuDivider,
  DropdownMenuHeader,
} from '@/components/dropdown-menu'
</script>
```

### Inside Modal or Overflow Container

Teleport is enabled by default, so dropdown menus work seamlessly inside modals or any overflow containers:

```vue
<template>
  <ModalRoot v-model:open="isOpen">
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <!-- DropdownMenu inside modal - teleport is enabled by default -->
        <DropdownMenuRoot>
          <DropdownMenuButton label="Select Country" class="w-full" />
          <DropdownMenuPanel class="max-h-60 overflow-y-auto">
            <DropdownMenuOption>🇮🇩 Indonesia</DropdownMenuOption>
            <DropdownMenuOption>🇺🇸 United States</DropdownMenuOption>
            <DropdownMenuOption>🇸🇬 Singapore</DropdownMenuOption>
          </DropdownMenuPanel>
        </DropdownMenuRoot>
      </ModalBody>
    </ModalContent>
  </ModalRoot>
</template>
```

### Disable Teleport (if needed)

If you need the dropdown menu to be positioned relative to its container (e.g., for specific layout requirements):

```vue
<template>
  <DropdownMenuRoot>
    <DropdownMenuButton label="Actions" variant="primary" />
    <DropdownMenuPanel :teleport="false">
      <DropdownMenuOption>Edit</DropdownMenuOption>
      <DropdownMenuOption>Duplicate</DropdownMenuOption>
    </DropdownMenuPanel>
  </DropdownMenuRoot>
</template>
```

## Features

- ✅ Compound component pattern
- ✅ Context isolation (multiple dropdown menus on same page)
- ✅ Vue native API (no external dependencies)
- ✅ Class Variance Authority (CVA) for variants
- ✅ Smooth CSS transitions
- ✅ Full TypeScript support
- ✅ ARIA/WAI-ARIA accessibility
- ✅ Custom theme integration
- ✅ **Teleport by default** - Dropdown menu rendered to body to prevent overflow issues
- ✅ **Body scroll lock** - Page scroll disabled when dropdown menu is open
- ✅ Smart positioning (auto-adjust if would go offscreen)

## DropdownMenu vs Select

**DropdownMenu** is for **actions** (Edit, Delete, Share, etc.), not for **form inputs**.

For selecting values in forms (country, status, etc.), use a **Select** component instead (to be implemented).

**Examples:**

- ✅ Use **DropdownMenu** for: User actions, table row actions, navigation menus
- ❌ Don't use **DropdownMenu** for: Form selects, country pickers, status selectors
