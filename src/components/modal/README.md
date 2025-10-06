# Modal Component

A flexible and composable modal dialog component built with Vue 3 using the Compound Component Pattern, inspired by shadcn/ui and Radix UI.

## Features

- 🧩 **Compound Component Pattern** - Compose your modal with maximum flexibility
- 🎨 **Customizable** - Style every part with Tailwind CSS classes
- ♿ **Accessible** - Built with ARIA attributes and keyboard navigation
- 🔒 **Body Scroll Lock** - Prevents background scrolling when modal is open with layout shift prevention
- ⌨️ **Keyboard Support** - Close with Escape key
- 🎭 **Smooth Animations** - Beautiful enter/exit transitions
- 📱 **Responsive** - Multiple size variants (sm, md, lg, xl, 2xl, full)
- 🎯 **No Layout Shift** - Prevents layout jumping when scrollbar is hidden (industry standard approach)

## Installation

The modal component is already included in the project. Import the components you need:

```vue
import { ModalRoot, ModalOverlay, ModalContent, ModalHeader, ModalTitle, ModalClose, ModalBody,
ModalFooter, } from '@/components/modal'
```

## Usage

### Basic Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  ModalRoot,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
} from '@/components/modal'

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const handleConfirm = () => {
  console.log('Confirmed!')
  isOpen.value = false
}
</script>

<template>
  <div>
    <button @click="openModal">Open Modal</button>

    <ModalRoot v-model:open="isOpen">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalClose />
        </ModalHeader>

        <ModalBody>
          <p>Your modal content goes here.</p>
        </ModalBody>

        <ModalFooter>
          <button @click="isOpen = false" class="btn-secondary">Cancel</button>
          <button @click="handleConfirm" class="btn-primary">Confirm</button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  </div>
</template>
```

### Different Sizes

```vue
<template>
  <!-- Small -->
  <ModalRoot v-model:open="isOpen">
    <ModalOverlay />
    <ModalContent size="sm">
      <!-- ... -->
    </ModalContent>
  </ModalRoot>

  <!-- Medium (Default) -->
  <ModalContent size="md">
    <!-- ... -->
  </ModalContent>

  <!-- Large -->
  <ModalContent size="lg">
    <!-- ... -->
  </ModalContent>

  <!-- Extra Large -->
  <ModalContent size="xl">
    <!-- ... -->
  </ModalContent>

  <!-- 2XL -->
  <ModalContent size="2xl">
    <!-- ... -->
  </ModalContent>

  <!-- Full Screen -->
  <ModalContent size="full">
    <!-- ... -->
  </ModalContent>
</template>
```

### Custom Styling

Every component accepts a `class` prop for custom styling:

```vue
<template>
  <ModalRoot v-model:open="isOpen">
    <ModalOverlay class="bg-blue-500/20" />
    <ModalContent class="rounded-3xl" size="lg">
      <ModalHeader class="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <ModalTitle class="text-2xl">Custom Styled Modal</ModalTitle>
        <ModalClose class="text-white hover:bg-white/20" />
      </ModalHeader>

      <ModalBody class="p-8">
        <p>Content with custom padding</p>
      </ModalBody>

      <ModalFooter class="justify-end bg-gray-50">
        <button>Action</button>
      </ModalFooter>
    </ModalContent>
  </ModalRoot>
</template>
```

### Custom Close Button

```vue
<template>
  <ModalClose class="text-red-500">
    <svg><!-- Custom icon --></svg>
  </ModalClose>

  <!-- Or with text -->
  <ModalClose class="rounded bg-gray-200 px-4 py-2"> Close </ModalClose>
</template>
```

### Using Menu Components Inside Modal

When using Menu dropdown components inside modal, use `teleport` prop to prevent clipping:

```vue
<template>
  <ModalRoot v-model:open="isOpen">
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <MenuRoot>
          <MenuButton label="Select Option" class="w-full" />
          <MenuPanel teleport>
            <MenuOption>Option 1</MenuOption>
            <MenuOption>Option 2</MenuOption>
          </MenuPanel>
        </MenuRoot>
      </ModalBody>
    </ModalContent>
  </ModalRoot>
</template>
```

**Note:** When using `teleport`, the dropdown width automatically matches the button width. Set `w-full` on the button itself, not on MenuPanel.

### Prevent Overlay Click Close

```vue
<template>
  <ModalOverlay :close-on-click="false" />
</template>
```

### Minimal Example (Without Footer)

```vue
<template>
  <ModalRoot v-model:open="isOpen">
    <ModalOverlay />
    <ModalContent size="sm">
      <ModalHeader>
        <ModalTitle>Quick Message</ModalTitle>
        <ModalClose />
      </ModalHeader>

      <ModalBody>
        <p>This modal doesn't need a footer!</p>
      </ModalBody>
    </ModalContent>
  </ModalRoot>
</template>
```

### Programmatic Control

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

// Open modal programmatically
const openModal = () => {
  isOpen.value = true
}

// Close modal programmatically
const closeModal = () => {
  isOpen.value = false
}

// Listen for close event
const handleClose = () => {
  console.log('Modal closed')
}
</script>

<template>
  <ModalRoot v-model:open="isOpen" @close="handleClose">
    <!-- ... -->
  </ModalRoot>
</template>
```

## API Reference

### ModalRoot

The root component that provides context to all child components.

**Props:**

- `open?: boolean` - Controls the open/closed state (v-model:open)

**Events:**

- `update:open(value: boolean)` - Emitted when modal state changes
- `close()` - Emitted when modal is closed

**Usage:**

```vue
<ModalRoot v-model:open="isOpen" @close="handleClose">
  <!-- child components -->
</ModalRoot>
```

### ModalOverlay

The backdrop behind the modal.

**Props:**

- `class?: string` - Custom CSS classes
- `closeOnClick?: boolean` - Whether clicking overlay closes modal (default: `true`)

### ModalContent

The main modal container.

**Props:**

- `size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` - Modal size (default: `'md'`)
- `class?: string` - Custom CSS classes

**Features:**

- Automatic centering
- Keyboard escape to close
- Maximum height constraint with scrolling
- Responsive width based on viewport

### ModalHeader

Header section of the modal.

**Props:**

- `class?: string` - Custom CSS classes

### ModalTitle

Title component for the modal.

**Props:**

- `class?: string` - Custom CSS classes

### ModalClose

Close button component.

**Props:**

- `class?: string` - Custom CSS classes

**Default:**

- Renders a close icon (X)
- Can be customized via default slot

### ModalBody

Main content area of the modal.

**Props:**

- `class?: string` - Custom CSS classes

**Features:**

- Scrollable when content overflows
- Flexible height

### ModalFooter

Footer section for actions/buttons.

**Props:**

- `class?: string` - Custom CSS classes

## Accessibility

The modal components follow accessibility best practices:

- ✅ Proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)
- ✅ Keyboard navigation (Escape to close)
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Semantic HTML structure

## Design Tokens

The modal uses the following design tokens (customizable via Tailwind):

- Border radius: `rounded-2xl`
- Shadow: `shadow-xl`
- Z-index: `z-[998]` (overlay), `z-[999]` (content)
- Backdrop: `bg-black-900/40`
- Border: `border-gray-200`
- Text: `text-black-700`

## Layout Shift Prevention

The modal implements industry-standard layout shift prevention when hiding the scrollbar:

### How it Works

**Universal JavaScript Approach** - Works across all browsers:

1. **Calculate scrollbar width** when modal opens
2. **Add padding** to body to compensate for hidden scrollbar
3. **Overlay covers** entire viewport including padding area
4. **Clean restore** when modal closes

### Implementation Details

**1. Scrollbar Width Calculation:**

```typescript
// ModalRoot.vue - Accurate cross-browser calculation
const getScrollbarWidth = (): number => {
  return window.innerWidth - document.documentElement.clientWidth
}
```

**2. Body Padding Compensation:**

```typescript
// When modal opens
const scrollbarWidth = getScrollbarWidth()

if (scrollbarWidth > 0) {
  document.body.style.paddingRight = `${scrollbarWidth}px`
}
document.body.classList.add('overflow-hidden')

// When modal closes - wait for animation to finish (500ms)
setTimeout(() => {
  document.body.style.paddingRight = ''
  document.body.classList.remove('overflow-hidden')
}, 500)
```

**Why the delay?**

- Modal fade-out animation takes 500ms
- If scrollbar appears during animation, it causes layout shift
- Delay ensures scrollbar only returns after modal is fully hidden

**3. Overlay Coverage:**

```vue
<!-- ModalOverlay.vue - w-screen covers padding area -->
<div class="fixed inset-0 right-0 z-[998] w-screen bg-black/50 backdrop-blur-sm" />
```

**Why `w-screen`?**

- Ensures overlay covers full viewport width (100vw)
- Padding area stays hidden under the blur overlay
- No white space visible on the right side

This follows the same approach used by major UI libraries:

- Radix UI, Headless UI, shadcn/ui, React Aria

### Benefits

- ✅ No layout jumping when modal opens
- ✅ Better user experience
- ✅ Cross-browser compatible
- ✅ Progressive enhancement
- ✅ Industry standard approach

## Comparison with Old Modal

### Old Approach (Monolithic)

```vue
<Modal
  :is-open="isOpen"
  width="500px"
  confirm-text="Save"
  @close="handleClose"
  @confirm="handleConfirm"
>
  <template #title>Title</template>
  <template #content>Content</template>
  <template #footer>Custom Footer</template>
</Modal>
```

### New Approach (Compound Components)

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent size="md">
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>Content</ModalBody>
    <ModalFooter>Custom Footer</ModalFooter>
  </ModalContent>
</ModalRoot>
```

### Benefits of New Approach:

1. **More Flexible** - Compose any layout you need
2. **Better Type Safety** - Each component has its own props
3. **Easier to Style** - Direct access to each element
4. **More Maintainable** - Smaller, focused components
5. **Better Developer Experience** - Autocomplete for each part
6. **Follows Modern Patterns** - Similar to Radix UI / shadcn

## Tips

1. **Always include both ModalOverlay and ModalContent** for proper modal behavior
2. **Use v-model:open** for two-way binding of modal state
3. **Customize sizes** with the `size` prop instead of arbitrary widths
4. **Add custom classes** to any component for tailored styling
5. **Listen to @close event** on ModalRoot for cleanup logic

## Examples in the Wild

Check out these examples in the codebase:

- `src/views/DemoModal.vue` (if exists)

## License

MIT
