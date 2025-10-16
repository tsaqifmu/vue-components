# Modal Pattern Comparison

Dokumentasi ini menjelaskan perbandingan antara **Compound Component Pattern** (yang digunakan di project ini) dan **Props-based Pattern** (traditional approach).

## 📊 Quick Comparison

| Aspek                | Compound Component   | Props-based   |
| -------------------- | -------------------- | ------------- |
| Fleksibilitas        | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good   |
| API Simplicity       | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐ Fair     |
| Styling Ease         | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐ Fair     |
| Learning Curve       | ⭐⭐⭐ Moderate      | ⭐⭐⭐⭐ Easy |
| TypeScript Support   | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good   |
| Maintainability      | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐ Fair     |
| Code Reusability     | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good   |
| Bundle Size          | ⭐⭐⭐⭐⭐ Optimal   | ⭐⭐⭐ Good   |
| Developer Experience | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good   |
| Testing Complexity   | ⭐⭐⭐⭐ Easy        | ⭐⭐ Fair     |

## 🎯 Compound Component Pattern (Recommended)

### Architecture

```
ModalRoot (Context Provider)
├── ModalOverlay (Backdrop)
└── ModalContent (Container)
    ├── ModalHeader (Header Section)
    │   ├── ModalTitle (Title)
    │   └── ModalClose (Close Button)
    ├── ModalBody (Content Section)
    └── ModalFooter (Footer Section)
```

### Example Usage

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent size="lg">
    <ModalHeader class="bg-gradient-to-r from-blue-500 to-purple-500">
      <ModalTitle class="text-white">Custom Header</ModalTitle>
      <ModalClose class="text-white" />
    </ModalHeader>

    <ModalBody class="p-8 bg-gray-50">
      <YourCustomComponent />
    </ModalBody>

    <ModalFooter class="justify-between">
      <Button variant="danger">Delete</Button>
      <div class="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Save</Button>
      </div>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

### Advantages

#### 1. **Maximum Flexibility** ⭐⭐⭐⭐⭐

Anda bisa compose layout apapun tanpa batasan:

```vue
<!-- Add icon di title -->
<ModalTitle>
  <Icon name="check" />
  Success!
</ModalTitle>

<!-- Multiple elements di header -->
<ModalHeader>
  <div class="flex items-center gap-2">
    <Avatar />
    <ModalTitle>User Profile</ModalTitle>
    <Badge>Pro</Badge>
  </div>
  <ModalClose />
</ModalHeader>

<!-- Custom footer layout -->
<ModalFooter>
  <div class="flex-1">
    <Checkbox>Don't show again</Checkbox>
  </div>
  <div class="flex gap-2">
    <Button>Action 1</Button>
    <Button>Action 2</Button>
    <Button>Action 3</Button>
  </div>
</ModalFooter>
```

#### 2. **Clean API** ⭐⭐⭐⭐⭐

Setiap component punya props minimal dan focused:

```typescript
// ModalRoot
interface ModalRootProps {
  open?: boolean
}

// ModalContent
interface ModalContentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  class?: string
}

// ModalOverlay
interface ModalOverlayProps {
  closeOnClick?: boolean
  class?: string
}

// Simple and clean!
```

#### 3. **Direct Styling** ⭐⭐⭐⭐⭐

Langsung tambah class di component yang ingin di-style:

```vue
<!-- ✅ GOOD: Direct and clear -->
<ModalHeader class="bg-blue-500 text-white">
  <ModalTitle class="text-2xl font-bold">Title</ModalTitle>
</ModalHeader>
```

vs Props-based:

```vue
<!-- ❌ BAD: Props drilling -->
<Modal header-class="bg-blue-500 text-white" title-class="text-2xl font-bold" title="Title" />
```

#### 4. **Better Type Safety** ⭐⭐⭐⭐⭐

TypeScript inference bekerja lebih baik:

```vue
<script setup lang="ts">
// Each component has its own type
// IDE autocomplete works perfectly for each part
</script>

<template>
  <ModalRoot v-model:open="isOpen">
    <!-- ✅ TypeScript knows all props for ModalContent -->
    <ModalContent size="lg">
      <!-- ✅ TypeScript knows all props for ModalHeader -->
      <ModalHeader>
        <!-- ✅ TypeScript knows all props for ModalTitle -->
        <ModalTitle>...</ModalTitle>
      </ModalHeader>
    </ModalContent>
  </ModalRoot>
</template>
```

#### 5. **Maintainability** ⭐⭐⭐⭐⭐

Small, focused components:

```
src/components/modal/
├── ModalRoot.vue       (130 lines - state management)
├── ModalOverlay.vue    (35 lines - backdrop)
├── ModalContent.vue    (80 lines - container)
├── ModalHeader.vue     (20 lines - header layout)
├── ModalTitle.vue      (15 lines - title)
├── ModalClose.vue      (35 lines - close button)
├── ModalBody.vue       (20 lines - content area)
└── ModalFooter.vue     (20 lines - footer layout)

Total: ~355 lines spread across 8 focused files
Easy to understand, test, and maintain!
```

vs Props-based:

```
src/components/modal-props/
└── Modal.vue           (250+ lines - everything in one file)

Harder to navigate and maintain
```

#### 6. **No Props Explosion** ⭐⭐⭐⭐⭐

Tidak perlu ratusan props:

```vue
<!-- ✅ Compound: Clean -->
<ModalRoot v-model:open="isOpen">
  <ModalContent class="...">
    <ModalHeader class="...">
      <ModalTitle class="...">Title</ModalTitle>
    </ModalHeader>
  </ModalContent>
</ModalRoot>
```

vs

```vue
<!-- ❌ Props-based: Props explosion -->
<Modal
  v-model:open="isOpen"
  title="Title"
  content-class="..."
  header-class="..."
  title-class="..."
  body-class="..."
  footer-class="..."
  overlay-class="..."
  close-button-class="..."
  confirm-button-class="..."
  cancel-button-class="..."
  :show-close-button="true"
  :show-footer="true"
  confirm-text="..."
  cancel-text="..."
/>
```

#### 7. **Future-Proof** ⭐⭐⭐⭐⭐

Mudah extend tanpa breaking changes:

```vue
<!-- Want to add new component? Easy! -->
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
      <ModalBadge>New!</ModalBadge>  <!-- NEW component -->
      <ModalClose />
    </ModalHeader>
    <ModalTabs>  <!-- NEW component -->
      <TabItem>Tab 1</TabItem>
      <TabItem>Tab 2</TabItem>
    </ModalTabs>
    <ModalBody>Content</ModalBody>
  </ModalContent>
</ModalRoot>
```

No breaking changes! Existing code still works.

#### 8. **Industry Standard** ⭐⭐⭐⭐⭐

Digunakan oleh library UI terkemuka:

- **Radix UI** (React)
- **Headless UI** (React, Vue)
- **shadcn/ui** (React)
- **React Aria** (React)
- **Melt UI** (Svelte)

## ⚙️ Props-based Pattern (Traditional)

### Architecture

```
Modal (Monolithic Component)
└── Everything in one file
    - Overlay logic
    - Content logic
    - Header logic
    - Body logic
    - Footer logic
    - All props handling
```

### Example Usage

```vue
<Modal
  v-model:open="isOpen"
  title="Modal Title"
  size="lg"
  :show-close-button="true"
  :show-footer="true"
  confirm-text="Save"
  cancel-text="Cancel"
  header-class="bg-gradient-to-r from-blue-500 to-purple-500"
  title-class="text-white"
  body-class="p-8 bg-gray-50"
  footer-class="justify-between"
  overlay-class="..."
  content-class="..."
  confirm-button-class="..."
  cancel-button-class="..."
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <YourCustomComponent />
</Modal>
```

### Disadvantages

#### 1. **Props Drilling** ❌

Perlu props untuk setiap aspek customization:

```typescript
interface ModalProps {
  // Basic
  open?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

  // Behavior
  showCloseButton?: boolean
  showFooter?: boolean
  closeOnOverlayClick?: boolean

  // Content
  confirmText?: string
  cancelText?: string

  // Styling (Props Explosion!)
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  contentClass?: string
  overlayClass?: string
  titleClass?: string
  confirmButtonClass?: string
  cancelButtonClass?: string

  // ... dan masih banyak lagi yang mungkin dibutuhkan
}
```

#### 2. **Limited Flexibility** ❌

Sulit untuk custom layout yang tidak terprediksi:

```vue
<!-- Want icon in title? Need new prop -->
<Modal
  title="Success"
  :show-title-icon="true"  <!-- NEW PROP -->
  title-icon="check"        <!-- NEW PROP -->
/>

<!-- Want badge in header? Need new prop -->
<Modal
  title="User Profile"
  :show-header-badge="true"  <!-- NEW PROP -->
  header-badge-text="Pro"    <!-- NEW PROP -->
  header-badge-class="..."   <!-- NEW PROP -->
/>

<!-- Want multiple buttons? Need new props -->
<Modal
  :show-delete-button="true"   <!-- NEW PROP -->
  delete-button-text="Delete"  <!-- NEW PROP -->
  delete-button-class="..."    <!-- NEW PROP -->
/>

<!-- Props terus bertambah! -->
```

#### 3. **Complex API** ❌

Interface props menjadi sangat besar:

```typescript
// Modal.vue props interface
interface ModalProps {
  // 20+ props dan terus bertambah
  // Sulit dipahami dan digunakan
  // Overwhelming untuk developer
}
```

#### 4. **Hard to Extend** ❌

Setiap fitur baru = props baru:

```typescript
// Version 1.0
interface ModalProps {
  title?: string
  size?: string
}

// Version 1.1 - Add header icon
interface ModalProps {
  title?: string
  size?: string
  headerIcon?: string // NEW - potential breaking change
  headerIconClass?: string // NEW
}

// Version 1.2 - Add badge
interface ModalProps {
  title?: string
  size?: string
  headerIcon?: string
  headerIconClass?: string
  headerBadge?: string // NEW
  headerBadgeClass?: string // NEW
  headerBadgeVariant?: string // NEW
}

// ... props terus bertambah
// Sulit maintain backward compatibility
```

#### 5. **Monolithic Component** ❌

Satu file besar dengan banyak responsibility:

```vue
<!-- Modal.vue - 300+ lines -->
<script setup lang="ts">
// State management
// Props handling
// Overlay logic
// Content logic
// Header logic
// Body logic
// Footer logic
// Styling logic
// Event handling
// Animation logic
// Accessibility logic
// ... everything in one file
</script>

<template>
  <!-- Complex template with many conditional rendering -->
  <div v-if="isOpen">
    <div v-if="showOverlay">...</div>
    <div>
      <div v-if="showHeader">
        <h2 v-if="title">{{ title }}</h2>
        <button v-if="showCloseButton">...</button>
      </div>
      <div>
        <slot></slot>
      </div>
      <div v-if="showFooter">
        <button v-if="showCancelButton">...</button>
        <button v-if="showConfirmButton">...</button>
      </div>
    </div>
  </div>
</template>
```

Violation of **Single Responsibility Principle**.

#### 6. **Testing Complexity** ❌

Harus test kombinasi props yang sangat banyak:

```typescript
describe('Modal', () => {
  // 20 props = ribuan kombinasi
  // Tidak praktis untuk test semua

  it('should render with all styling props', () => {
    // Test 8 styling props
  })

  it('should render with all behavior props', () => {
    // Test 5 behavior props
  })

  it('should render with all content props', () => {
    // Test 7 content props
  })

  // ... masih banyak lagi
})
```

#### 7. **Poor Developer Experience** ❌

Developer harus mengingat banyak props:

```vue
<template>
  <!-- Which props are available? -->
  <!-- What's the correct prop name? -->
  <!-- header-class or headerClass? -->
  <!-- title-icon or icon-title? -->

  <Modal
    <!-- IDE autocomplete shows 20+ props -->
    <!-- Overwhelming! -->
    <!-- Hard to find the right prop -->
  />
</template>
```

## 🎓 When to Use Each Pattern?

### Use Compound Component Pattern When:

- ✅ Building complex, reusable components
- ✅ Need maximum flexibility
- ✅ Want clean API
- ✅ Building component library
- ✅ Need better maintainability
- ✅ Component has multiple sections/parts
- ✅ Users need control over layout

**Examples:** Modal, Dropdown, Tabs, Accordion, Card, Menu, Popover, etc.

### Use Props-based Pattern When:

- ✅ Very simple component
- ✅ Limited use cases
- ✅ Predictable structure
- ✅ No customization needed

**Examples:** Alert, Badge, Spinner, Progress Bar, Avatar, etc.

## 📚 Real-World Comparison

### Scenario 1: Basic Modal

**Compound Component:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Confirm Action</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <p>Are you sure?</p>
    </ModalBody>
    <ModalFooter>
      <Button @click="isOpen = false">Cancel</Button>
      <Button @click="handleConfirm">Confirm</Button>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

**Props-based:**

```vue
<Modal
  v-model:open="isOpen"
  title="Confirm Action"
  confirm-text="Confirm"
  cancel-text="Cancel"
  @confirm="handleConfirm"
>
  <p>Are you sure?</p>
</Modal>
```

**Winner:** Props-based (slightly simpler for basic case)

### Scenario 2: Custom Styled Modal

**Compound Component:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay class="bg-blue-500/20" />
  <ModalContent class="border-4 border-blue-500">
    <ModalHeader class="bg-gradient-to-r from-blue-500 to-purple-500">
      <ModalTitle class="text-white">Custom Modal</ModalTitle>
      <ModalClose class="text-white" />
    </ModalHeader>
    <ModalBody class="bg-blue-50">
      <p>Content</p>
    </ModalBody>
    <ModalFooter class="bg-blue-50">
      <Button>Action</Button>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

**Props-based:**

```vue
<Modal
  v-model:open="isOpen"
  title="Custom Modal"
  overlay-class="bg-blue-500/20"
  content-class="border-4 border-blue-500"
  header-class="bg-gradient-to-r from-blue-500 to-purple-500"
  title-class="text-white"
  body-class="bg-blue-50"
  footer-class="bg-blue-50"
>
  <p>Content</p>
</Modal>
```

**Winner:** Compound Component (cleaner, more intuitive)

### Scenario 3: Complex Custom Layout

**Compound Component:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay />
  <ModalContent size="xl">
    <ModalHeader class="border-b-2 border-gray-200">
      <div class="flex items-center gap-3">
        <Avatar :src="user.avatar" />
        <div>
          <ModalTitle>{{ user.name }}</ModalTitle>
          <p class="text-sm text-gray-500">{{ user.email }}</p>
        </div>
        <Badge v-if="user.isPro">Pro</Badge>
      </div>
      <ModalClose />
    </ModalHeader>

    <ModalBody>
      <Tabs>
        <TabsList>
          <TabsTrigger>Profile</TabsTrigger>
          <TabsTrigger>Settings</TabsTrigger>
          <TabsTrigger>Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsForm />
        </TabsContent>
        <TabsContent value="billing">
          <BillingInfo />
        </TabsContent>
      </Tabs>
    </ModalBody>

    <ModalFooter class="border-t-2 border-gray-200">
      <div class="flex flex-1 items-center justify-between">
        <Button variant="danger" @click="handleDelete">Delete Account</Button>
        <div class="flex gap-2">
          <Button variant="outline" @click="isOpen = false">Cancel</Button>
          <Button variant="primary" @click="handleSave">Save Changes</Button>
        </div>
      </div>
    </ModalFooter>
  </ModalContent>
</ModalRoot>
```

**Props-based:**

```vue
<!-- How to achieve this with props? -->
<!-- Need A LOT of new props! -->
<Modal v-model:open="isOpen" size="xl" :show-default-header="false" :show-default-footer="false">
  <template #header>
    <div class="border-b-2 border-gray-200 flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <Avatar :src="user.avatar" />
        <div>
          <h2 class="text-xl font-semibold">{{ user.name }}</h2>
          <p class="text-sm text-gray-500">{{ user.email }}</p>
        </div>
        <Badge v-if="user.isPro">Pro</Badge>
      </div>
      <button @click="isOpen = false">×</button>
    </div>
  </template>

  <Tabs>
    <!-- ... -->
  </Tabs>

  <template #footer>
    <div class="border-t-2 border-gray-200 p-4">
      <div class="flex flex-1 items-center justify-between">
        <Button variant="danger" @click="handleDelete">Delete Account</Button>
        <div class="flex gap-2">
          <Button variant="outline" @click="isOpen = false">Cancel</Button>
          <Button variant="primary" @click="handleSave">Save Changes</Button>
        </div>
      </div>
    </div>
  </template>
</Modal>
```

**Winner:** Compound Component (much cleaner and more maintainable)

## 🎯 Conclusion

### Compound Component Pattern Wins! 🏆

**For complex, reusable components like Modal, Dropdown, Tabs, etc:**

| Category        | Winner                | Reason                                         |
| --------------- | --------------------- | ---------------------------------------------- |
| Flexibility     | Compound Component ✅ | Maximum control over layout and composition    |
| API Design      | Compound Component ✅ | Clean, focused, no props explosion             |
| Styling         | Compound Component ✅ | Direct styling, no props drilling              |
| Maintainability | Compound Component ✅ | Small focused components, SRP compliant        |
| Extensibility   | Compound Component ✅ | Easy to extend without breaking changes        |
| DX              | Compound Component ✅ | Better autocomplete, clearer intent            |
| Testing         | Compound Component ✅ | Test each component in isolation               |
| Bundle Size     | Compound Component ✅ | Better tree-shaking                            |
| Type Safety     | Compound Component ✅ | Better TypeScript inference per component      |
| Industry        | Compound Component ✅ | Used by Radix, Headless UI, shadcn, React Aria |

**Props-based pattern** hanya cocok untuk **component sangat sederhana** dengan use case terbatas (Badge, Spinner, Alert, dll).

## 🚀 Try It Yourself

Kunjungi `/demo-modal-comparison` untuk melihat perbandingan langsung kedua pattern dengan contoh interaktif!

## 📖 Further Reading

- [Compound Component Pattern - Kent C. Dodds](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Radix UI - Composition](https://www.radix-ui.com/docs/primitives/overview/composition)
- [Headless UI - Component API](https://headlessui.com/)
- [React Aria - Component Architecture](https://react-spectrum.adobe.com/react-aria/)
