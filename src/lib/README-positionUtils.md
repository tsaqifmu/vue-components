# Position Utils

Utility functions untuk menghitung posisi optimal dari floating elements (dropdown, popover, tooltip, dll.) relatif terhadap trigger element mereka.

## Fitur

- ✅ Automatic positioning (bawah/atas) berdasarkan ruang viewport
- ✅ Multiple alignment options (start, center, end)
- ✅ Viewport boundary detection
- ✅ Customizable gaps and padding
- ✅ Type-safe dengan TypeScript
- ✅ Framework agnostic (dapat digunakan di Vue, React, atau vanilla JS)

## Usage

### Basic Example

```typescript
import { calculateDropdownPosition } from '@/lib/positionUtils'

// Get trigger dan panel element
const triggerEl = document.querySelector('#my-button')
const panelEl = document.querySelector('#my-dropdown')

// Calculate position
const position = calculateDropdownPosition({
  triggerRect: triggerEl.getBoundingClientRect(),
  panelRect: panelEl.getBoundingClientRect(),
  align: 'start',
})

// Apply to element
panelEl.style.top = `${position.top}px`
panelEl.style.left = `${position.left}px`
panelEl.style.minWidth = `${position.minWidth}px`

console.log(position.placement) // 'bottom' or 'top'
```

### Vue Composition API Example

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  calculateDropdownPosition,
  getElementRect,
  positionResultToStyle,
} from '@/lib/positionUtils'

const triggerRef = ref<HTMLElement>()
const panelRef = ref<HTMLElement>()
const isOpen = ref(false)
const panelStyle = ref({})

const updatePosition = () => {
  const triggerRect = getElementRect(triggerRef.value)
  const panelRect = getElementRect(panelRef.value)

  if (!triggerRect || !panelRect) return

  const position = calculateDropdownPosition({
    triggerRect,
    panelRect,
    align: 'center',
  })

  panelStyle.value = positionResultToStyle(position)
}

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => updatePosition())
  }
})
</script>

<template>
  <button ref="triggerRef" @click="isOpen = !isOpen">Toggle</button>

  <div v-if="isOpen" ref="panelRef" :style="panelStyle" class="fixed">Dropdown content</div>
</template>
```

## API Reference

### `calculateDropdownPosition(options)`

Main function untuk menghitung posisi dropdown.

#### Parameters

```typescript
interface PositionOptions {
  // Required
  triggerRect: DOMRect // Bounding rect dari trigger element
  panelRect: DOMRect // Bounding rect dari panel/dropdown element

  // Optional
  align?: 'start' | 'center' | 'end' // Default: 'start'
  gap?: {
    bottom?: number // Default: 4px
    top?: number // Default: 17px
  }
  viewportPadding?: number // Default: 8px
  viewportHeight?: number // Default: window.innerHeight
  viewportWidth?: number // Default: window.innerWidth
}
```

#### Returns

```typescript
interface PositionResult {
  top: number // Top position dalam pixels
  left: number // Left position dalam pixels
  minWidth: number // Minimum width (sama dengan trigger width)
  placement: 'bottom' | 'top' // Final placement
}
```

#### Behavior

1. **Default placement**: Dropdown dibuka di **bawah** trigger dengan gap 4px
2. **Auto flip**: Jika tidak cukup ruang di bawah DAN ada cukup ruang di atas, dropdown akan flip ke atas
3. **Horizontal alignment**:
   - `start`: Align left edges (default)
   - `center`: Center dropdown relative to trigger
   - `end`: Align right edges
4. **Boundary detection**: Dropdown akan adjusted jika overflow viewport kiri/kanan

### `getElementRect(element)`

Helper function untuk mendapatkan DOMRect dengan null safety.

```typescript
getElementRect(element: HTMLElement | null): DOMRect | null
```

### `positionResultToStyle(result)`

Convert PositionResult ke CSS style object.

```typescript
positionResultToStyle(result: PositionResult): Record<string, string>

// Returns:
// {
//   top: '100px',
//   left: '50px',
//   minWidth: '200px'
// }
```

## Constants

```typescript
// Default gaps
export const DEFAULT_DROPDOWN_GAP = {
  BOTTOM: 4, // Gap saat dropdown di bawah
  TOP: 17, // Gap saat dropdown di atas
}

// Default viewport padding
export const DEFAULT_VIEWPORT_PADDING = 8
```

## Advanced Examples

### Custom Gaps

```typescript
const position = calculateDropdownPosition({
  triggerRect,
  panelRect,
  gap: {
    bottom: 8, // Lebih besar gap di bawah
    top: 8, // Custom gap di atas
  },
})
```

### Center Alignment with Custom Padding

```typescript
const position = calculateDropdownPosition({
  triggerRect,
  panelRect,
  align: 'center',
  viewportPadding: 16, // Lebih besar padding dari edge
})
```

### End Alignment (Right-aligned)

```typescript
const position = calculateDropdownPosition({
  triggerRect,
  panelRect,
  align: 'end', // Align right edges
})
```

## Use Cases

Utility ini cocok untuk berbagai komponen floating:

- ✅ **Select/Dropdown** - Dropdown menu selection
- ✅ **Combobox** - Autocomplete dengan dropdown
- ✅ **Popover** - Floating content panels
- ✅ **Dropdown Menu** - Context menus
- ✅ **Tooltip** - Informational tooltips (dengan customization)
- ✅ **Date Picker** - Calendar dropdown
- ✅ **Command Palette** - Search/command dropdown

## Testing

Utility ini adalah pure function, mudah untuk di-test:

```typescript
import { describe, it, expect } from 'vitest'
import { calculateDropdownPosition } from './positionUtils'

describe('calculateDropdownPosition', () => {
  it('should position dropdown below trigger by default', () => {
    const result = calculateDropdownPosition({
      triggerRect: new DOMRect(100, 100, 200, 40),
      panelRect: new DOMRect(0, 0, 200, 300),
    })

    expect(result.placement).toBe('bottom')
    expect(result.top).toBe(144) // 100 + 40 + 4 (gap)
  })

  it('should flip to top when not enough space below', () => {
    const result = calculateDropdownPosition({
      triggerRect: new DOMRect(100, 700, 200, 40),
      panelRect: new DOMRect(0, 0, 200, 300),
      viewportHeight: 800,
    })

    expect(result.placement).toBe('top')
  })

  it('should center align correctly', () => {
    const result = calculateDropdownPosition({
      triggerRect: new DOMRect(100, 100, 200, 40),
      panelRect: new DOMRect(0, 0, 100, 300),
      align: 'center',
    })

    // Center: 100 + (200/2) - (100/2) = 150
    expect(result.left).toBe(150)
  })
})
```

## Migration Guide

Jika ada komponen existing yang ingin menggunakan utility ini:

### Before

```typescript
// Manual calculation di dalam component
const updatePosition = () => {
  const buttonRect = button.getBoundingClientRect()
  const panelRect = panel.getBoundingClientRect()

  let top = buttonRect.bottom + 4
  let left = buttonRect.left

  if (top + panelRect.height > window.innerHeight) {
    top = buttonRect.top - panelRect.height - 17
  }

  // ... more manual calculations
}
```

### After

```typescript
// Using utility
import {
  calculateDropdownPosition,
  getElementRect,
  positionResultToStyle,
} from '@/lib/positionUtils'

const updatePosition = () => {
  const triggerRect = getElementRect(button)
  const panelRect = getElementRect(panel)

  if (!triggerRect || !panelRect) return

  const position = calculateDropdownPosition({
    triggerRect,
    panelRect,
    align: 'start',
  })

  panelStyle.value = positionResultToStyle(position)
}
```

## License

Part of vue-components-new project.
