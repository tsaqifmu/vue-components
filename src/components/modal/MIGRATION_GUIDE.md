# Modal Migration Guide

This guide will help you migrate from the old monolithic Modal component to the new Compound Component Pattern.

## Why Migrate?

The new modal implementation offers:

✅ **More Flexibility** - Compose modals exactly how you need them  
✅ **Better Type Safety** - Each component has its own typed props  
✅ **Easier Customization** - Style each part independently  
✅ **Modern Pattern** - Follows shadcn/ui and Radix UI conventions  
✅ **Better Developer Experience** - Full IDE autocomplete for each component  
✅ **Cleaner Code** - Smaller, focused components are easier to maintain

## Quick Comparison

### Before (Old Modal)

```vue
<template>
  <Modal
    :is-open="isOpen"
    width="500px"
    confirm-text="Save"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <template #title>Edit Profile</template>
    <template #content>
      <p>Edit your profile information.</p>
    </template>
    <template #footer>
      <button @click="handleClose">Cancel</button>
      <button @click="handleConfirm">Save</button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'

const isOpen = ref(false)
const handleClose = () => {
  isOpen.value = false
}
const handleConfirm = () => {
  // save logic
  isOpen.value = false
}
</script>
```

### After (New Modal)

```vue
<template>
  <ModalRoot v-model:open="isOpen" @close="handleClose">
    <ModalOverlay />
    <ModalContent size="md">
      <ModalHeader>
        <ModalTitle>Edit Profile</ModalTitle>
        <ModalClose />
      </ModalHeader>

      <ModalBody>
        <p>Edit your profile information.</p>
      </ModalBody>

      <ModalFooter>
        <button @click="isOpen = false">Cancel</button>
        <button @click="handleConfirm">Save</button>
      </ModalFooter>
    </ModalContent>
  </ModalRoot>
</template>

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
const handleClose = () => {
  console.log('Modal closed')
}
const handleConfirm = () => {
  // save logic
  isOpen.value = false
}
</script>
```

## Step-by-Step Migration

### Step 1: Update Imports

**Before:**

```ts
import Modal from '@/components/ui/Modal.vue'
```

**After:**

```ts
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
```

### Step 2: Replace the Template

**Old Structure:**

```vue
<Modal :is-open="isOpen" @close="handleClose">
  <template #title>Title</template>
  <template #content>Content</template>
  <template #footer>Footer</template>
</Modal>
```

**New Structure:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>Content</ModalBody>
    <ModalFooter>Footer</ModalFooter>
  </ModalContent>
</ModalRoot>
```

### Step 3: Update Props

| Old Prop              | New Approach                               |
| --------------------- | ------------------------------------------ |
| `:is-open="isOpen"`   | `v-model:open="isOpen"`                    |
| `width="500px"`       | `<ModalContent size="md">` or custom class |
| `confirm-text="Save"` | Manual button in `<ModalFooter>`           |
| `@close="handler"`    | `@close="handler"` (same)                  |
| `@confirm="handler"`  | Manual button `@click` in footer           |

### Step 4: Convert Width to Size

**Old Widths → New Sizes:**

| Old                        | New                   |
| -------------------------- | --------------------- |
| `width="400px"` or similar | `size="sm"`           |
| `width="456px"` (default)  | `size="md"` (default) |
| `width="600px"`            | `size="lg"`           |
| `width="800px"`            | `size="xl"`           |
| `width="1000px"`           | `size="2xl"`          |
| Full width                 | `size="full"`         |

Or use custom width with class:

```vue
<ModalContent class="w-[500px]"></ModalContent>
```

## Common Migration Scenarios

### Scenario 1: Basic Confirmation Modal

**Before:**

```vue
<Modal :is-open="showConfirm" @close="showConfirm = false" @confirm="handleConfirm">
  <template #title>Confirm Action</template>
  <template #content>
    <p>Are you sure?</p>
  </template>
</Modal>
```

**After:**

```vue
<ModalRoot v-model:open="showConfirm">
  <ModalOverlay />
  <ModalContent size="sm">
    <ModalHeader>
      <ModalTitle>Confirm Action</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <p>Are you sure?</p>
    </ModalBody>
    <ModalFooter>
      <button @click="showConfirm = false">Cancel</button>
      <button @click="handleConfirm">Confirm</button>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

### Scenario 2: Custom Styled Modal

**Before:**

```vue
<Modal :is-open="isOpen" width="600px" class="custom-modal">
  <!-- Limited customization -->
</Modal>
```

**After:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay class="bg-blue-500/20" />
  <ModalContent size="lg" class="border-2 border-blue-500">
    <ModalHeader class="bg-blue-500 text-white">
      <ModalTitle>Custom Header</ModalTitle>
      <ModalClose class="text-white" />
    </ModalHeader>
    <ModalBody class="bg-blue-50">
      <!-- Content with custom styling -->
    </ModalBody>
    <ModalFooter class="bg-blue-50">
      <!-- Custom footer -->
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

### Scenario 3: Modal Without Footer

**Before:**

```vue
<Modal :is-open="isOpen">
  <template #title>Info</template>
  <template #content>
    <p>Information message</p>
  </template>
  <template #footer>
    <!-- Empty or custom -->
  </template>
</Modal>
```

**After:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent size="sm">
    <ModalHeader>
      <ModalTitle>Info</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <p>Information message</p>
    </ModalBody>
    <!-- No footer needed! -->
  </ModalContent>
</ModalRoot>
```

### Scenario 4: Form in Modal

**Before:**

```vue
<Modal :is-open="isOpen" @confirm="submitForm" confirm-text="Submit">
  <template #content>
    <form @submit.prevent="submitForm">
      <input v-model="name" />
    </form>
  </template>
</Modal>
```

**After:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Form Title</ModalTitle>
      <ModalClose />
    </ModalHeader>
    
    <ModalBody>
      <form @submit.prevent="submitForm" id="myForm">
        <input v-model="name" />
      </form>
    </ModalBody>
    
    <ModalFooter>
      <button type="button" @click="isOpen = false">Cancel</button>
      <button type="submit" form="myForm">Submit</button>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

## Advanced Features

### Prevent Closing on Overlay Click

```vue
<ModalOverlay :close-on-click="false" />
```

### Custom Close Button

```vue
<!-- With custom icon -->
<ModalClose>
  <CustomIcon />
</ModalClose>

<!-- As text button -->
<ModalClose class="rounded bg-gray-200 px-4 py-2">
  Close
</ModalClose>
```

### Multiple Modals

Each modal maintains its own state independently:

```vue
<ModalRoot v-model:open="modal1">
  <!-- Modal 1 content -->
</ModalRoot>

<ModalRoot v-model:open="modal2">
  <!-- Modal 2 content -->
</ModalRoot>
```

### Scrollable Content

The body automatically scrolls when content overflows:

```vue
<ModalBody>
  <!-- Long content will scroll automatically -->
  <div>Very long content...</div>
</ModalBody>
```

## Troubleshooting

### Modal not closing on Escape

✅ **Solution:** Ensure you're using `ModalContent` component, which handles Escape key internally.

### Body not scrolling when modal is open

✅ **Solution:** Ensure you're using `ModalRoot` with `v-model:open`, which manages body scroll lock automatically.

### Overlay not showing

✅ **Solution:** Make sure you include `<ModalOverlay />` inside `<ModalRoot>`.

### Modal not centered

✅ **Solution:** Use `ModalContent` component with proper size prop. Custom positioning requires custom classes.

## Benefits of the New Pattern

1. **Composability** - Mix and match components as needed
2. **Flexibility** - Full control over structure and styling
3. **Type Safety** - Better TypeScript support per component
4. **Maintainability** - Smaller, focused components
5. **Testability** - Test individual parts separately
6. **Standards** - Follows modern UI library patterns (Radix, shadcn)

## Need Help?

- See `README.md` for full API documentation
- Check `src/views/DemoModal.vue` for live examples
- Review `src/components/menu/` for similar compound pattern

## Checklist

- [ ] Update imports to new modal components
- [ ] Replace `Modal` with `ModalRoot` + child components
- [ ] Change `:is-open` to `v-model:open`
- [ ] Convert `width` prop to `size` or custom class
- [ ] Move `@confirm` logic to manual button in footer
- [ ] Test modal open/close functionality
- [ ] Test Escape key and overlay click
- [ ] Verify body scroll lock works
- [ ] Check mobile responsiveness

---

**Migration Complete!** 🎉

Your modals are now using the modern compound component pattern with full flexibility and better maintainability.
