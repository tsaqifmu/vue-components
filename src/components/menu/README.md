# Menu Components

A compound component system inspired by Reka UI, providing accessible and flexible menu components.

## Components

### MenuRoot

The root component that provides context and manages state for all child components.

### MenuButton

The trigger button that opens/closes the menu. Supports multiple variants and states.

### MenuPanel

The container that holds menu options. Supports positioning (top/bottom), smooth animations, and teleport mode for rendering outside overflow containers.

**Props:**

- `position?: 'top' | 'bottom'` - Dropdown position (default: 'bottom')
- `class?: string` - Custom CSS classes
- `teleport?: boolean` - If true, renders dropdown to body with fixed positioning (default: `true`)

**Key Features:**

- **Teleport by Default:** Menu is rendered to `<body>` to prevent clipping issues with overflow containers
- **Body Scroll Lock:** When menu is open, page scroll is disabled to prevent positioning issues
- **Auto Width Matching:** Dropdown width automatically matches the button width via inline styles
- **Smart Positioning:** Automatically adjusts position if menu would go offscreen

### MenuOption

Individual menu items with support for destructive actions and disabled states.

### MenuDivider

A visual separator between menu sections.

### MenuHeader

A header component for organizing menu sections.

## Usage

### Basic Example

```vue
<template>
  <MenuRoot>
    <MenuButton label="Actions" variant="primary" />
    <MenuPanel>
      <MenuHeader>Account</MenuHeader>
      <MenuOption>Profile</MenuOption>
      <MenuOption>Settings</MenuOption>
      <MenuDivider />
      <MenuHeader>Actions</MenuHeader>
      <MenuOption destructive>Delete</MenuOption>
    </MenuPanel>
  </MenuRoot>
</template>

<script setup>
import {
  MenuRoot,
  MenuButton,
  MenuPanel,
  MenuOption,
  MenuDivider,
  MenuHeader,
} from '@/components/menu'
</script>
```

### Inside Modal or Overflow Container

Teleport is enabled by default, so menus work seamlessly inside modals or any overflow containers:

```vue
<template>
  <ModalRoot v-model:open="isOpen">
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <!-- Menu inside modal - teleport is enabled by default -->
        <MenuRoot>
          <MenuButton label="Select Country" class="w-full" />
          <MenuPanel class="max-h-60 overflow-y-auto">
            <MenuOption>🇮🇩 Indonesia</MenuOption>
            <MenuOption>🇺🇸 United States</MenuOption>
            <MenuOption>🇸🇬 Singapore</MenuOption>
          </MenuPanel>
        </MenuRoot>
      </ModalBody>
    </ModalContent>
  </ModalRoot>
</template>
```

### Disable Teleport (if needed)

If you need the menu to be positioned relative to its container (e.g., for specific layout requirements):

```vue
<template>
  <MenuRoot>
    <MenuButton label="Actions" variant="primary" />
    <MenuPanel :teleport="false">
      <MenuOption>Edit</MenuOption>
      <MenuOption>Duplicate</MenuOption>
    </MenuPanel>
  </MenuRoot>
</template>
```

## Features

- ✅ Compound component pattern
- ✅ Context isolation (multiple menus on same page)
- ✅ Vue native API (no external dependencies)
- ✅ Class Variance Authority (CVA) for variants
- ✅ Smooth CSS transitions
- ✅ Full TypeScript support
- ✅ ARIA/WAI-ARIA accessibility
- ✅ Custom theme integration
- ✅ **Teleport by default** - Menu rendered to body to prevent overflow issues
- ✅ **Body scroll lock** - Page scroll disabled when menu is open
- ✅ Smart positioning (auto-adjust if would go offscreen)
