# Empty Component

A flexible and composable empty state component built with Vue 3 using the Compound Component Pattern. Perfect for displaying placeholder content when there's no data to show.

## Features

- 🧩 **Compound Component Pattern** - Compose your empty state with maximum flexibility
- 🎨 **Customizable** - Style every part with Tailwind CSS classes
- 🎭 **Media Variants** - Support for default and icon-styled media
- 📱 **Responsive** - Adapts to different screen sizes
- ✨ **Text Balance** - Uses `text-balance` for better typography

## Installation

The Empty component is already included in the project. Import the components you need:

```vue
import {
  EmptyRoot,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/empty'
```

## Usage

### Basic Example

```vue
<script setup lang="ts">
import {
  EmptyRoot,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/empty'
import { SearchIcon } from '@/components/icons'
</script>

<template>
  <EmptyRoot>
    <EmptyHeader>
      <EmptyMedia>
        <SearchIcon class="size-12 text-muted-foreground" />
      </EmptyMedia>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>
        We couldn't find any results matching your search criteria.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <button class="btn-primary">Clear Search</button>
    </EmptyContent>
  </EmptyRoot>
</template>
```

### With Icon Variant

```vue
<template>
  <EmptyRoot>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderIcon />
      </EmptyMedia>
      <EmptyTitle>No files uploaded</EmptyTitle>
      <EmptyDescription>
        Get started by uploading your first file.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <button class="btn-primary">Upload File</button>
    </EmptyContent>
  </EmptyRoot>
</template>
```

### Minimal Example (Without Content)

```vue
<template>
  <EmptyRoot>
    <EmptyHeader>
      <EmptyMedia>
        <InboxIcon class="size-16 text-muted-foreground" />
      </EmptyMedia>
      <EmptyTitle>Your inbox is empty</EmptyTitle>
      <EmptyDescription>
        Messages you receive will appear here.
      </EmptyDescription>
    </EmptyHeader>
  </EmptyRoot>
</template>
```

### With Border

```vue
<template>
  <EmptyRoot class="border">
    <EmptyHeader>
      <EmptyTitle>No data available</EmptyTitle>
      <EmptyDescription>
        Check back later for updates.
      </EmptyDescription>
    </EmptyHeader>
  </EmptyRoot>
</template>
```

### Custom Styling

Every component accepts a `class` prop for custom styling:

```vue
<template>
  <EmptyRoot class="bg-gray-50 border-2">
    <EmptyHeader class="gap-4">
      <EmptyMedia class="text-primary">
        <CustomIcon class="size-20" />
      </EmptyMedia>
      <EmptyTitle class="text-2xl font-bold">Custom Title</EmptyTitle>
      <EmptyDescription class="text-base">
        Custom description with larger text.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent class="gap-6">
      <button>Primary Action</button>
      <button>Secondary Action</button>
    </EmptyContent>
  </EmptyRoot>
</template>
```

### With Link in Description

```vue
<template>
  <EmptyRoot>
    <EmptyHeader>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>
        <a href="/docs">Learn how to create your first project</a>
        or start from a template.
      </EmptyDescription>
    </EmptyHeader>
  </EmptyRoot>
</template>
```

## API Reference

### EmptyRoot

The root container component for empty states.

**Props:**

- `class?: string` - Custom CSS classes

**Styles:**

- Flex container with column direction
- Centered content alignment
- Dashed border style (border-dashed)
- Responsive padding (p-6 / md:p-12)

### EmptyHeader

Header section containing media, title, and description.

**Props:**

- `class?: string` - Custom CSS classes

**Styles:**

- Maximum width of `max-w-sm`
- Centered items with gap

### EmptyMedia

Media/icon container with variant support.

**Props:**

- `variant?: 'default' | 'icon'` - Media variant (default: `'default'`)
- `class?: string` - Custom CSS classes

**Variants:**

- `default` - Transparent background, for custom sized icons
- `icon` - Rounded background with muted colors, fixed size (40x40)

**Features:**

- Automatic SVG pointer-events handling
- SVG shrink prevention

### EmptyTitle

Title component for the empty state.

**Props:**

- `class?: string` - Custom CSS classes

**Styles:**

- Large text (text-lg)
- Medium font weight
- Tight letter spacing

### EmptyDescription

Description text component.

**Props:**

- `class?: string` - Custom CSS classes

**Styles:**

- Muted foreground color
- Relaxed line height
- Link styling with hover state

### EmptyContent

Content section for action buttons or additional content.

**Props:**

- `class?: string` - Custom CSS classes

**Styles:**

- Maximum width of `max-w-sm`
- Centered items with gap
- Text balance

## Component Structure

```
EmptyRoot
├── EmptyHeader
│   ├── EmptyMedia (optional)
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent (optional)
    └── Actions/Buttons
```

## Design Tokens

The Empty component uses the following design tokens (customizable via Tailwind):

- Border: `border-dashed`
- Border radius: `rounded-lg`
- Gap: `gap-6` (root), `gap-2` (header), `gap-4` (content)
- Text colors: Default text, `text-muted-foreground` (description)
- Padding: `p-6` (mobile), `md:p-12` (desktop)

## Tips

1. **Use EmptyHeader** as the primary container for your empty state message
2. **Choose the right media variant** - Use `icon` variant for icon-style backgrounds
3. **Add actions in EmptyContent** for actionable empty states
4. **Customize with class prop** - All components accept custom classes
5. **Use text-balance** - Already applied for better text wrapping

## License

MIT


