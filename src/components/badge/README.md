# Badge Component

Komponen Badge/Chip yang dibangun dengan compound component pattern, terinspirasi dari shadcn/ui.

## Fitur

- ✅ Compound component pattern untuk fleksibilitas maksimal
- ✅ Multiple variants (default, secondary, destructive, outline, success, warning, info, positive, negative, progress, caution)
- ✅ Multiple sizes (sm, default, lg)
- ✅ Dismissible badges dengan close button
- ✅ Icon support (start/end position)
- ✅ TypeScript support
- ✅ Accessibility compliant

## Struktur Component

```
BadgeRoot       - Container utama dengan variants dan state management
├── BadgeIcon   - Optional icon (start/end position)
├── [content]   - Badge text content (slot)
└── BadgeClose  - Optional close button untuk dismissible badges
```

## Basic Usage

```vue
<script setup lang="ts">
import { BadgeRoot } from '@/components/badge'
</script>

<template>
  <!-- Solid variants -->
  <BadgeRoot>Default Badge</BadgeRoot>
  <BadgeRoot variant="secondary">Secondary</BadgeRoot>
  <BadgeRoot variant="destructive">Destructive</BadgeRoot>
  <BadgeRoot variant="outline">Outline</BadgeRoot>
  <BadgeRoot variant="success">Success</BadgeRoot>
  <BadgeRoot variant="warning">Warning</BadgeRoot>
  <BadgeRoot variant="info">Info</BadgeRoot>

  <!-- Soft/Light variants -->
  <BadgeRoot variant="positive">Positive</BadgeRoot>
  <BadgeRoot variant="negative">Negative</BadgeRoot>
  <BadgeRoot variant="progress">Progress</BadgeRoot>
  <BadgeRoot variant="caution">Caution</BadgeRoot>
</template>
```

## Sizes

```vue
<template>
  <BadgeRoot size="sm">Small</BadgeRoot>
  <BadgeRoot size="default">Default</BadgeRoot>
  <BadgeRoot size="lg">Large</BadgeRoot>
</template>
```

## With Icon

```vue
<script setup lang="ts">
import { BadgeRoot, BadgeIcon } from '@/components/badge'
</script>

<template>
  <!-- Icon at start (default) -->
  <BadgeRoot variant="success">
    <BadgeIcon>
      <svg><!-- check icon --></svg>
    </BadgeIcon>
    Verified
  </BadgeRoot>

  <!-- Icon at end -->
  <BadgeRoot variant="secondary">
    New
    <BadgeIcon position="end">
      <svg><!-- arrow icon --></svg>
    </BadgeIcon>
  </BadgeRoot>
</template>
```

## Dismissible Badge (Chip)

```vue
<script setup lang="ts">
import { BadgeRoot, BadgeClose } from '@/components/badge'

const handleDismiss = () => {
  console.log('Badge dismissed!')
}
</script>

<template>
  <BadgeRoot dismissible @dismiss="handleDismiss">
    Removable Tag
    <BadgeClose />
  </BadgeRoot>
</template>
```

## Complete Example (Icon + Dismissible)

```vue
<script setup lang="ts">
import { BadgeRoot, BadgeIcon, BadgeClose } from '@/components/badge'
</script>

<template>
  <BadgeRoot variant="secondary" dismissible>
    <BadgeIcon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>
    </BadgeIcon>
    Selected Item
    <BadgeClose />
  </BadgeRoot>
</template>
```

## API Reference

### BadgeRoot

Root component yang mengelola state dan provide context.

**Props:**

| Prop          | Type                                                                                                                                                | Default     | Description                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `variant`     | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info' \| 'positive' \| 'negative' \| 'progress' \| 'caution'` | `'default'` | Variant styling                    |
| `size`        | `'sm' \| 'default' \| 'lg'`                                                                                                                         | `'default'` | Size of the badge                  |
| `dismissible` | `boolean`                                                                                                                                           | `false`     | Whether the badge can be dismissed |
| `class`       | `string`                                                                                                                                            | -           | Additional CSS classes             |

**Events:**

| Event     | Payload | Description                         |
| --------- | ------- | ----------------------------------- |
| `dismiss` | -       | Emitted when the badge is dismissed |

### BadgeIcon

Optional icon component untuk badge.

**Props:**

| Prop       | Type               | Default   | Description            |
| ---------- | ------------------ | --------- | ---------------------- |
| `position` | `'start' \| 'end'` | `'start'` | Position of the icon   |
| `class`    | `string`           | -         | Additional CSS classes |

### BadgeClose

Close button untuk dismissible badges.

**Props:**

| Prop    | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | -       | Additional CSS classes |

**Slots:**

- `default` - Custom close icon (defaults to X icon)

## Styling

Component ini menggunakan CVA (Class Variance Authority) dengan Tailwind CSS. Variants yang tersedia:

### Solid Variants

| Variant       | Description                           |
| ------------- | ------------------------------------- |
| `default`     | Primary green background (`#27b199`)  |
| `secondary`   | Secondary gray background (`#fafafa`) |
| `destructive` | Red/danger background (`#eb5757`)     |
| `outline`     | Border only, no background            |
| `success`     | Green background (`#288c7a`)          |
| `warning`     | Yellow/orange background (`#d78e08`)  |
| `info`        | Blue/cyan background (`#56ccf2`)      |

### Soft/Light Variants

| Variant    | Description                              |
| ---------- | ---------------------------------------- |
| `positive` | Light green background with green text   |
| `negative` | Light red background with red text       |
| `progress` | Light blue background with blue text     |
| `caution`  | Light yellow background with yellow text |

## Accessibility

- ✅ Close button memiliki `aria-label`
- ✅ Semantic HTML structure
- ✅ Keyboard accessible

## Best Practices

1. Gunakan variant yang sesuai dengan konteks (success untuk status berhasil, destructive untuk error, dll)
2. Untuk filter/tag yang bisa dihapus, gunakan `dismissible` prop dengan `BadgeClose`
3. Tambahkan icon untuk visual clarity menggunakan `BadgeIcon`
4. Pertimbangkan accessibility saat menambahkan custom styling

