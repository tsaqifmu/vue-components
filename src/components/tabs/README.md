# Tabs Component

Komponen tabs yang dibangun dengan compound component pattern, terinspirasi dari shadcn/ui dan Radix UI.

## Fitur

- ✅ Compound component pattern untuk fleksibilitas maksimal
- ✅ Controlled dan uncontrolled mode
- ✅ Keyboard navigation (Arrow keys, Enter, Space)
- ✅ Accessibility compliant (ARIA attributes)
- ✅ Orientasi horizontal dan vertical
- ✅ Smooth transitions
- ✅ TypeScript support

## Struktur Component

```
TabsRoot        - Container utama dan state management
├── TabsList    - Container untuk trigger buttons
│   └── TabsTrigger  - Individual tab button
└── TabsContent - Content panel untuk setiap tab
```

## Basic Usage (Uncontrolled)

```vue
<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '@/components/tabs'
</script>

<template>
  <TabsRoot default-value="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>

    <TabsContent value="tab1">
      <p>Content for tab 1</p>
    </TabsContent>

    <TabsContent value="tab2">
      <p>Content for tab 2</p>
    </TabsContent>

    <TabsContent value="tab3">
      <p>Content for tab 3</p>
    </TabsContent>
  </TabsRoot>
</template>
```

## Controlled Mode

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '@/components/tabs'

const activeTab = ref('account')
</script>

<template>
  <TabsRoot v-model="activeTab">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>

    <TabsContent value="account">
      <p>Account settings</p>
    </TabsContent>

    <TabsContent value="password">
      <p>Password settings</p>
    </TabsContent>
  </TabsRoot>

  <p>Active tab: {{ activeTab }}</p>
</template>
```

## Vertical Orientation

```vue
<template>
  <TabsRoot default-value="tab1" orientation="vertical">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>

    <TabsContent value="tab1">
      <p>Content 1</p>
    </TabsContent>

    <TabsContent value="tab2">
      <p>Content 2</p>
    </TabsContent>
  </TabsRoot>
</template>
```

## With Icons

```vue
<template>
  <TabsRoot default-value="overview">
    <TabsList>
      <TabsTrigger value="overview">
        <svg><!-- icon --></svg>
        Overview
      </TabsTrigger>
      <TabsTrigger value="analytics">
        <svg><!-- icon --></svg>
        Analytics
      </TabsTrigger>
    </TabsList>

    <TabsContent value="overview">
      <p>Overview content</p>
    </TabsContent>

    <TabsContent value="analytics">
      <p>Analytics content</p>
    </TabsContent>
  </TabsRoot>
</template>
```

## Disabled Tab

```vue
<template>
  <TabsRoot default-value="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Enabled</TabsTrigger>
      <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
    </TabsList>

    <TabsContent value="tab1">
      <p>Content 1</p>
    </TabsContent>

    <TabsContent value="tab2">
      <p>Content 2 (tidak bisa diakses)</p>
    </TabsContent>
  </TabsRoot>
</template>
```

## API Reference

### TabsRoot

Root component yang mengelola state dan provide context.

**Props:**

- `defaultValue?: string` - Nilai default untuk uncontrolled mode
- `modelValue?: string` - Nilai untuk controlled mode (gunakan dengan v-model)
- `orientation?: 'horizontal' | 'vertical'` - Orientasi tabs (default: 'horizontal')

**Events:**

- `update:modelValue` - Emit ketika tab aktif berubah (untuk v-model)

**Usage:**

```vue
<!-- Uncontrolled mode -->
<TabsRoot default-value="tab1">...</TabsRoot>

<!-- Controlled mode -->
<TabsRoot v-model="activeTab">...</TabsRoot>
```

### TabsList

Container untuk tab triggers.

**Props:** Tidak ada props khusus

### TabsTrigger

Button untuk switching antar tabs.

**Props:**

- `value: string` (required) - Unique identifier untuk tab
- `disabled?: boolean` - Disable tab trigger (default: false)

### TabsContent

Content panel untuk setiap tab.

**Props:**

- `value: string` (required) - Harus match dengan value dari TabsTrigger

## Styling

Component ini menggunakan Tailwind CSS untuk styling. Anda bisa customize dengan:

1. **Menggunakan class binding langsung**
2. **Override dengan custom classes**
3. **Modify component files** untuk styling default

## Accessibility

- ✅ Proper ARIA roles dan attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly

## Keyboard Shortcuts

- `Tab` - Focus ke tabs trigger atau content
- `Enter/Space` - Activate focused tab
- Arrow keys navigation akan ditambahkan di update mendatang

## Best Practices

1. Selalu berikan unique `value` untuk setiap TabsTrigger dan TabsContent
2. Pastikan setiap TabsTrigger memiliki TabsContent yang sesuai
3. Gunakan controlled mode jika perlu sinkronisasi dengan state eksternal
4. Pertimbangkan accessibility saat menambahkan custom styling

## Implementation Notes

- Component ini menggunakan provide/inject pattern untuk komunikasi antar komponen
- State management internal mendukung both controlled dan uncontrolled mode
- Menggunakan `defineModel()` (Vue 3.4+) untuk v-model binding yang lebih clean
- Transisi smooth menggunakan CSS transitions
