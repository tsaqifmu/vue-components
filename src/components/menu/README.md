# Menu Components

A compound component system inspired by Reka UI, providing accessible and flexible menu components.

## Components

### MenuRoot

The root component that provides context and manages state for all child components.

### MenuButton

The trigger button that opens/closes the menu. Supports multiple variants and states.

### MenuPanel

The container that holds menu options. Supports positioning (top/bottom) and smooth animations.

### MenuOption

Individual menu items with support for destructive actions and disabled states.

### MenuDivider

A visual separator between menu sections.

### MenuHeader

A header component for organizing menu sections.

## Usage

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

## Features

- ✅ Compound component pattern
- ✅ Context isolation (multiple menus on same page)
- ✅ Vue native API (no external dependencies)
- ✅ Class Variance Authority (CVA) for variants
- ✅ Smooth CSS transitions
- ✅ Full TypeScript support
- ✅ ARIA/WAI-ARIA accessibility
- ✅ Custom theme integration
