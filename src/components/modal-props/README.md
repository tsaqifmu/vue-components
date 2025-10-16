# Props-based Modal Component

Component ini dibuat **untuk tujuan komparasi** dengan Compound Component Pattern. Ini adalah contoh implementation modal menggunakan traditional props-based approach.

## ⚠️ Disclaimer

**Component ini TIDAK direkomendasikan untuk production use**. Component ini hanya dibuat untuk mendemonstrasikan perbedaan antara props-based pattern dan compound component pattern.

Untuk production, gunakan compound component pattern di `src/components/modal/`.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { Modal } from '@/components/modal-props'

const isOpen = ref(false)

const handleConfirm = () => {
  console.log('Confirmed!')
  isOpen.value = false
}
</script>

<template>
  <button @click="isOpen = true">Open Modal</button>

  <Modal
    v-model:open="isOpen"
    title="Modal Title"
    size="md"
    confirm-text="Confirm"
    cancel-text="Cancel"
    @confirm="handleConfirm"
  >
    <p>Modal content goes here</p>
  </Modal>
</template>
```

## Props

| Prop                  | Type                                              | Default     | Description                         |
| --------------------- | ------------------------------------------------- | ----------- | ----------------------------------- |
| `open`                | `boolean`                                         | `false`     | Controls modal visibility (v-model) |
| `title`               | `string`                                          | `''`        | Modal title text                    |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'md'`      | Modal size                          |
| `showCloseButton`     | `boolean`                                         | `true`      | Show/hide close button              |
| `showFooter`          | `boolean`                                         | `true`      | Show/hide footer                    |
| `confirmText`         | `string`                                          | `'Confirm'` | Confirm button text                 |
| `cancelText`          | `string`                                          | `'Cancel'`  | Cancel button text                  |
| `closeOnOverlayClick` | `boolean`                                         | `true`      | Close modal when clicking overlay   |
| `headerClass`         | `string`                                          | `''`        | Custom classes for header           |
| `bodyClass`           | `string`                                          | `''`        | Custom classes for body             |
| `footerClass`         | `string`                                          | `''`        | Custom classes for footer           |
| `contentClass`        | `string`                                          | `''`        | Custom classes for modal content    |
| `overlayClass`        | `string`                                          | `''`        | Custom classes for overlay          |
| `titleClass`          | `string`                                          | `''`        | Custom classes for title            |
| `confirmButtonClass`  | `string`                                          | `''`        | Custom classes for confirm button   |
| `cancelButtonClass`   | `string`                                          | `''`        | Custom classes for cancel button    |

## Events

- `update:open(value: boolean)` - Emitted when modal state changes
- `close()` - Emitted when modal is closed
- `confirm()` - Emitted when confirm button is clicked
- `cancel()` - Emitted when cancel button is clicked

## Slots

- **default** - Main content
- **header** - Custom header content (overrides title prop)
- **footer** - Custom footer content (overrides default buttons)

## Problems with Props-based Approach

### 1. Props Explosion

Perhatikan berapa banyak props yang dibutuhkan untuk styling:

```vue
<Modal
  header-class="..."
  body-class="..."
  footer-class="..."
  title-class="..."
  content-class="..."
  overlay-class="..."
  confirm-button-class="..."
  cancel-button-class="..."
/>
```

**8 props hanya untuk styling!** Dan ini masih belum mencakup semua customization yang mungkin dibutuhkan.

### 2. Limited Flexibility

Bagaimana jika ingin:

- Menambahkan icon di title?
- Menambahkan badge di header?
- Multiple buttons di footer dengan urutan berbeda?
- Custom layout yang tidak terprediksi?

Dengan props-based, Anda perlu:

1. Tambah props baru untuk setiap use case
2. Atau gunakan slots (tapi tetap terbatas)
3. Interface props menjadi semakin kompleks

### 3. Hard to Extend

Menambah fitur baru = tambah props baru:

```typescript
interface Props {
  // ... existing props
  showHeaderIcon?: boolean // NEW
  headerIcon?: string // NEW
  headerIconClass?: string // NEW
  headerBadge?: string // NEW
  headerBadgeClass?: string // NEW
  // ... props terus bertambah
}
```

API menjadi **bloated** dan sulit di-maintain.

### 4. Poor Developer Experience

Developer harus mengingat dan mengetik banyak props:

```vue
<Modal
  :open="isOpen"
  title="Title"
  size="lg"
  :show-close-button="true"
  :show-footer="true"
  confirm-text="Save"
  cancel-text="Cancel"
  :close-on-overlay-click="true"
  header-class="bg-blue-500"
  body-class="p-8"
  footer-class="justify-end"
  title-class="text-white"
  content-class="border-2"
  overlay-class="bg-black/50"
  confirm-button-class="bg-green-500"
  cancel-button-class="bg-red-500"
  @confirm="handleConfirm"
  @cancel="handleCancel"
  @close="handleClose"
>
  <!-- content -->
</Modal>
```

**Overwhelming!**

### 5. Testing Complexity

Harus test kombinasi props yang sangat banyak:

```typescript
describe('Modal', () => {
  it('should render with all props combinations', () => {
    // Kombinasi: 18 props = ribuan test cases
    // Tidak praktis!
  })
})
```

## Solution: Compound Component Pattern

Lihat `src/components/modal/` untuk implementasi yang lebih baik:

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent size="lg" class="border-2">
    <ModalHeader class="bg-blue-500">
      <ModalTitle class="text-white">
        <Icon /> Title with Icon
      </ModalTitle>
      <Badge>New</Badge>
      <ModalClose />
    </ModalHeader>

    <ModalBody class="p-8">
      <!-- Any custom content -->
    </ModalBody>

    <ModalFooter class="justify-end">
      <Button variant="danger">Delete</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

**Keuntungan:**

- ✅ No props explosion
- ✅ Maximum flexibility
- ✅ Easy to style directly
- ✅ Better type safety
- ✅ More maintainable
- ✅ Better DX

## Demo

Lihat perbandingan lengkap di `/demo-modal-comparison`

## Kesimpulan

Props-based pattern cocok untuk **component sangat sederhana** dengan use case terbatas.

Untuk component complex seperti Modal, **Compound Component Pattern adalah pilihan terbaik**.
