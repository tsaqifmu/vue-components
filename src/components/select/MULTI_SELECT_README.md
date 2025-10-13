# Multi Select Component

Komponen Multi Select dengan badge yang dapat dihapus, dibangun dengan compound component pattern. Mengizinkan user untuk memilih multiple values dari dropdown menu dengan visual feedback berupa badges yang ditampilkan terpisah di atas select trigger.

## Overview

Multi Select adalah extension dari Select component dengan fitur:

- ✅ Multiple value selection dengan v-model array
- ✅ **Badges terpisah di atas select trigger** (sesuai best practice)
- ✅ Remove badge dengan click X button
- ✅ Toggle behavior (click untuk select/deselect)
- ✅ Dropdown tetap terbuka saat selection
- ✅ Max display dengan "+N more" indicator
- ✅ Flexible composition - arrange components sesuai kebutuhan
- ✅ Full TypeScript support
- ✅ Reuse SelectGroup, SelectLabel, SelectSeparator

## Architecture

Multi Select menggunakan **composable component pattern** dimana badges dan trigger dipisahkan untuk fleksibilitas maksimal:

```
┌─────────────────────────┐
│ English [X] Malay [X]   │  <- MultiSelectBadges (terpisah)
│ Portugese [X]           │
├─────────────────────────┤  <- Separator
│ Add Languages     [▼]   │  <- MultiSelectTrigger (hanya placeholder)
└─────────────────────────┘
```

## Components

### MultiSelectRoot

Root component yang mengelola state dan provide context untuk child components.

**Props:**

- `modelValue: Array<string | number>` - Array of selected values (v-model support)
- `placeholder?: string` - Placeholder text (default: 'Select options...')
- `maxDisplay?: number` - Maximum badges to show before "+N more" (default: 5)

**Events:**

- `@update:modelValue` - Emitted when selection changes

**Example:**

```vue
<MultiSelectRoot v-model="selectedValues" placeholder="Choose options...">
  <!-- child components -->
</MultiSelectRoot>
```

### MultiSelectTrigger

Button trigger yang hanya menampilkan placeholder (badges ditampilkan terpisah dengan MultiSelectBadges).

**Props:**

- `disabled?: boolean` - Disable the trigger
- `class?: string` - Custom CSS classes

**Features:**

- Hanya menampilkan placeholder text
- Toggle dropdown saat di-click
- Visual indicator (chevron) untuk open/close state

**Example:**

```vue
<MultiSelectTrigger class="w-full" />
```

### MultiSelectBadges

Komponen terpisah untuk menampilkan badges dari selected items. Komponen ini memberikan fleksibilitas penuh untuk mengatur layout.

**Props:**

- `maxDisplay?: number` - Maximum badges to show (default: 10)
- `class?: string` - Custom CSS classes
- `emptyText?: string` - Text to show when no selection

**Features:**

- Menampilkan badges dari selected items
- X button pada setiap badge untuk remove
- "+N more" badge jika items > maxDisplay
- Otomatis hide jika tidak ada selection

**Example:**

```vue
<MultiSelectBadges :max-display="5" class="mb-3" />
```

### MultiSelectItem

Individual option dalam dropdown menu.

**Props:**

- `value: string | number` - Value of the option (required)
- `label?: string` - Display label
- `disabled?: boolean` - Disable this option
- `class?: string` - Custom CSS classes

**Features:**

- Checkmark indicator untuk selected items
- Toggle behavior (click untuk select/deselect)
- Tidak menutup dropdown setelah click

**Example:**

```vue
<MultiSelectItem value="vue" label="Vue.js">Vue.js</MultiSelectItem>
```

### MultiSelectContent

Container untuk dropdown options dengan positioning dan teleport support.

**Props:**

- `position?: 'top' | 'bottom'` - Dropdown position (default: 'bottom')
- `align?: 'start' | 'center' | 'end'` - Alignment (default: 'start')
- `class?: string` - Custom CSS classes
- `teleport?: boolean` - Render to body (default: true)

**Features:**

- Same as SelectContent
- Smart positioning
- Body scroll lock
- Teleport by default

## Usage Examples

### Basic Multi Select

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  MultiSelectRoot,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectBadges,
} from '@/components/select'

const selectedLanguages = ref<string[]>(['english'])
</script>

<template>
  <div class="space-y-3">
    <MultiSelectRoot v-model="selectedLanguages" placeholder="Add Languages">
      <!-- Badge list di atas -->
      <MultiSelectBadges :max-display="10" />

      <!-- Separator jika ada selection -->
      <hr v-if="selectedLanguages.length > 0" class="my-3 border-gray-200" />

      <!-- Select trigger di bawah -->
      <MultiSelectTrigger class="w-full" />

      <!-- Dropdown content -->
      <MultiSelectContent>
        <MultiSelectItem value="english" label="English">English</MultiSelectItem>
        <MultiSelectItem value="malay" label="Malay">Malay</MultiSelectItem>
        <MultiSelectItem value="japanese" label="Japanese">Japanese</MultiSelectItem>
        <MultiSelectItem value="chinese" label="Chinese">Chinese</MultiSelectItem>
      </MultiSelectContent>
    </MultiSelectRoot>
  </div>
</template>
```

### With Groups and Max Display

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  MultiSelectRoot,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectBadges,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/select'

const selectedCountries = ref<string[]>([])
</script>

<template>
  <div class="space-y-3">
    <MultiSelectRoot v-model="selectedCountries" placeholder="Add Countries">
      <!-- Badge list dengan max 3 -->
      <MultiSelectBadges :max-display="3" />

      <!-- Separator jika ada selection -->
      <hr v-if="selectedCountries.length > 0" class="my-3 border-gray-200" />

      <!-- Select trigger -->
      <MultiSelectTrigger class="w-full" />

      <!-- Dropdown content dengan groups -->
      <MultiSelectContent>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <MultiSelectItem value="id" label="🇮🇩 Indonesia">🇮🇩 Indonesia</MultiSelectItem>
          <MultiSelectItem value="sg" label="🇸🇬 Singapore">🇸🇬 Singapore</MultiSelectItem>
          <MultiSelectItem value="jp" label="🇯🇵 Japan">🇯🇵 Japan</MultiSelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <MultiSelectItem value="gb" label="🇬🇧 UK">🇬🇧 UK</MultiSelectItem>
          <MultiSelectItem value="fr" label="🇫🇷 France">🇫🇷 France</MultiSelectItem>
        </SelectGroup>
      </MultiSelectContent>
    </MultiSelectRoot>
  </div>
</template>
```

### With Custom Layout and Styling

```vue
<template>
  <div class="rounded-lg border border-gray-200 bg-white p-4">
    <MultiSelectRoot v-model="frameworks" placeholder="Add Frameworks">
      <!-- Custom badges dengan styling -->
      <div v-if="frameworks.length > 0" class="mb-4">
        <p class="mb-2 text-xs font-medium text-gray-600">Selected Frameworks:</p>
        <MultiSelectBadges :max-display="5" />
      </div>

      <!-- Separator -->
      <hr v-if="frameworks.length > 0" class="my-3 border-gray-200" />

      <!-- Trigger -->
      <MultiSelectTrigger class="w-full" />

      <!-- Content -->
      <MultiSelectContent class="max-w-sm">
        <MultiSelectItem value="vue" label="Vue.js">
          <span class="flex items-center gap-2">
            <span class="text-lg">🟢</span>
            Vue.js
          </span>
        </MultiSelectItem>
        <MultiSelectItem value="react" label="React">
          <span class="flex items-center gap-2">
            <span class="text-lg">⚛️</span>
            React
          </span>
        </MultiSelectItem>
      </MultiSelectContent>
    </MultiSelectRoot>
  </div>
</template>
```

## Key Differences from Single Select

| Feature            | Single Select      | Multi Select                       |
| ------------------ | ------------------ | ---------------------------------- |
| Model Value        | `string \| number` | `Array<string \| number>`          |
| Display            | Single text        | Separate badges component          |
| Layout             | Integrated         | Composable (badges + trigger)      |
| Close on Selection | ✅ Yes             | ❌ No (stays open)                 |
| Toggle Item        | ❌ No              | ✅ Yes (click to deselect)         |
| Max Display        | N/A                | ✅ Yes (with "+N more")            |
| Badge Removal      | N/A                | ✅ Yes (click X on badge)          |
| Separator          | N/A                | ✅ Optional between badges/trigger |

## Best Practices

### 1. Always Separate Badges from Trigger

```vue
<!-- ✅ Good: Badges terpisah di atas -->
<MultiSelectRoot v-model="selected">
  <MultiSelectBadges :max-display="5" />
  <hr v-if="selected.length > 0" class="my-3" />
  <MultiSelectTrigger />
  <MultiSelectContent>...</MultiSelectContent>
</MultiSelectRoot>

<!-- ❌ Bad: Badges dan trigger menyatu (old pattern) -->
<!-- Avoid this pattern -->
```

### 2. Set Appropriate Max Display

```vue
<!-- For narrow containers, limit badges -->
<MultiSelectBadges :max-display="2" />

<!-- For wider containers, show more -->
<MultiSelectBadges :max-display="10" />
```

### 3. Use Conditional Separator

```vue
<!-- Show separator only when there's selection -->
<hr v-if="selectedValues.length > 0" class="my-3 border-gray-200" />
```

### 4. Use Groups for Better Organization

```vue
<MultiSelectContent>
  <SelectGroup>
    <SelectLabel>Popular</SelectLabel>
    <MultiSelectItem value="1" label="Item 1">Item 1</MultiSelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Others</SelectLabel>
    <MultiSelectItem value="2" label="Item 2">Item 2</MultiSelectItem>
  </SelectGroup>
</MultiSelectContent>
```

### 5. Provide Clear Labels

```vue
<!-- ✅ Good: Clear, descriptive labels -->
<MultiSelectItem value="vue" label="Vue.js 3 - Progressive Framework">
  Vue.js 3 - Progressive Framework
</MultiSelectItem>

<!-- ❌ Bad: Unclear labels -->
<MultiSelectItem value="1" label="Item 1">Item 1</MultiSelectItem>
```

### 6. Handle Empty State

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const selected = ref<string[]>([])
const hasSelection = computed(() => selected.value.length > 0)
</script>

<template>
  <div>
    <MultiSelectRoot v-model="selected" placeholder="Add items...">
      <MultiSelectBadges empty-text="No items selected yet" />
      <hr v-if="selected.length > 0" class="my-3" />
      <MultiSelectTrigger class="w-full" />
      <MultiSelectContent>
        <!-- items -->
      </MultiSelectContent>
    </MultiSelectRoot>
  </div>
</template>
```

## Styling Customization

### Custom Badge Colors

Modify the badge classes in `MultiSelectTrigger.vue`:

```vue
<!-- Default: primary color -->
<div class="bg-primary/10 text-primary ... ..."></div>
```

### Custom Trigger Height

```vue
<!-- Auto height based on badges -->
<MultiSelectTrigger class="min-h-[60px] w-full" />

<!-- Fixed height with scroll -->
<MultiSelectTrigger class="h-[80px] w-full overflow-y-auto" />
```

## Implementation Details

### Context Management

Multi Select menggunakan Vue's provide/inject dengan unique context keys untuk memastikan isolation antar instances:

```typescript
const contextKey: InjectionKey<MultiSelectContext> = Symbol(`multi-select-context-${multiSelectId}`)
```

### Toggle Behavior

Berbeda dengan Single Select, Multi Select menggunakan toggle behavior:

```typescript
const selectValue = (value: string | number) => {
  const currentValues = model.value || []
  const index = currentValues.indexOf(value)

  if (index === -1) {
    // Add value
    model.value = [...currentValues, value]
  } else {
    // Remove value (toggle)
    model.value = currentValues.filter((v) => v !== value)
  }
  // Don't close dropdown
}
```

### Badge Removal

Badge removal menggunakan event.stopPropagation() untuk mencegah toggle dropdown:

```typescript
const handleRemove = (event: Event, value: string | number) => {
  event.stopPropagation() // Prevent dropdown toggle
  multiSelect?.removeValue(value)
}
```

## Accessibility

- ✅ ARIA roles: `combobox`, `listbox`, `option`
- ✅ Keyboard support: Escape to close
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ `aria-selected` on items

## Performance Considerations

1. **Max Display**: Limit rendered badges untuk mencegah layout overflow
2. **Virtual Scrolling**: Untuk very large lists, consider implementing virtual scrolling
3. **Debounce Search**: Jika menambahkan search feature, gunakan debounce

## Future Enhancements

Potential features untuk future versions:

- [ ] Search/filter functionality
- [ ] Select All / Deselect All buttons
- [ ] Keyboard navigation (arrow keys)
- [ ] Custom badge render function
- [ ] Badge drag & drop reordering
- [ ] Async data loading
- [ ] Virtual scrolling untuk large lists

## Demo

Lihat demo lengkap di `/demo-multi-select` atau file `src/views/DemoMultiSelect.vue`

## Related Components

- **Select** - Single selection dropdown
- **DropdownMenu** - Action menu (not for form values)
- **Combobox** (future) - Select dengan search/autocomplete
