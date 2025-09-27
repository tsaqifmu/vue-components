import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { fn } from 'storybook/test'

import Button from '@/components/ui/Button.vue'

/**
 * Reusable UI Button component with various variants and sizes.
 * Built using class-variance-authority for type-safe styling variants.
 */
const meta = {
  title: 'UI Components/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'destructive', 'ghost', 'secondary', 'link'],
      description: 'Visual variant of the button',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'icon'],
      description: 'Size of the button',
      defaultValue: 'default',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as slot wrapper instead of button element',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the button',
      defaultValue: false,
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      defaultValue: 'button',
    },
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: `
## Button Component

A flexible and customizable Button component with various styling variants and sizes.

### Features:
- **6 styling variants**: default, outline, destructive, ghost, secondary, link
- **3 sizes**: default, sm, icon
- **Disabled state support** with opacity and pointer-events
- **Focus ring accessibility** with focus-visible
- **Smooth transitions** for hover and focus states
- **Icon support** with proper sizing using [&_svg] selectors
- **Type-safe props** using TypeScript and class-variance-authority

### Available Variants:

#### Default
Primary variant for main actions with colored background.

#### Outline
Variant with border for secondary actions.

#### Destructive
Variant for potentially destructive or dangerous actions.

#### Ghost
Minimal variant without background for subtle actions.

#### Secondary
Alternative variant with gray background.

#### Link
Variant that looks like a link for navigation.

### Sizes:

- **Small (sm)**: \`px-3 py-1 text-xs\` - For limited space
- **Default**: \`px-6 py-2 text-sm\` - Standard size
- **Icon**: \`h-10 w-10\` - Specifically for icon-only buttons

### Basic Usage:
\`\`\`vue
<template>
  <Button variant="default" size="default" @click="handleClick">
    Click me
  </Button>
</template>

<script setup>
import Button from '@/components/ui/Button.vue'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
\`\`\`

### Advanced Usage:

#### Button with Icon:
\`\`\`vue
<Button variant="default">
  <CheckIcon class="w-4 h-4" />
  Save Changes
</Button>
\`\`\`

#### Icon Only Button:
\`\`\`vue
<Button variant="outline" size="icon" aria-label="Close">
  <XIcon class="w-4 h-4" />
</Button>
\`\`\`

#### Polymorphic Usage (asChild):
\`\`\`vue
<Button as-child variant="ghost">
  <router-link to="/profile">Go to Profile</router-link>
</Button>
\`\`\`

#### Loading State:
\`\`\`vue
<Button :disabled="loading">
  <LoaderIcon v-if="loading" class="w-4 h-4 animate-spin" />
  {{ loading ? 'Loading...' : 'Submit' }}
</Button>
\`\`\`

### Accessibility:
- ✅ Keyboard navigation with Tab
- ✅ Clear focus ring with focus-visible
- ✅ Screen reader support
- ✅ Proper disabled state handling
- ✅ Semantic HTML button element

### Best Practices:
- Use \`aria-label\` for icon-only buttons
- Choose appropriate variant for context (destructive for dangerous actions)
- Use disabled state for loading or invalid conditions
- Provide clear visual feedback for each state
        `,
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-col gap-6">
        <!-- Variants Section -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-gray-700">Variants</h3>
          <div class="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <!-- Sizes Section -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-gray-700">Sizes</h3>
          <div class="flex flex-wrap gap-2 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="icon" aria-label="Check">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            </Button>
          </div>
        </div>

        <!-- Disabled States Section -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-gray-700">Disabled States</h3>
          <div class="flex flex-wrap gap-2">
            <Button variant="default" disabled>Default</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="destructive" disabled>Destructive</Button>
            <Button variant="ghost" disabled>Ghost</Button>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Overview of main button variants (default, outline, destructive, ghost) with different sizes and disabled states.',
      },
    },
  },
}

// Default variant stories
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Default Button</Button>',
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Default variant with colored background for primary actions.',
      },
    },
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Outline Button</Button>',
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Outline variant with border for secondary actions.',
      },
    },
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Destructive Button</Button>',
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Destructive variant for potentially dangerous actions like delete.',
      },
    },
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Ghost Button</Button>',
  }),
  parameters: {
    layout: 'centered',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Link Button</Button>',
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Link variant that appears as a text link for navigation actions.',
      },
    },
  },
}

// Size variants

// Button with icon and text
export const WithIcon: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12l5 5l10 -10"></path>
        </svg>
        Button with Icon
      </Button>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Button with icon and text content.',
      },
      source: {
        code: `<template>
  <Button variant="default" size="default">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12l5 5l10 -10"></path>
    </svg>
    Button with Icon
  </Button>
</template>`,
      },
    },
  },
}

// Loading state example
export const Loading: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <Button v-bind="args">
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
      </Button>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Example of button in loading state with spinner icon and disabled state.',
      },
      source: {
        code: `<template>
  <Button variant="default" size="default" :disabled="true">
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Loading...
  </Button>
</template>`,
      },
    },
  },
}

// Size variants with detailed explanations
export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-col gap-6">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Button Sizes</h3>
          <p class="text-sm text-gray-600">Different button sizes for various use cases</p>
        </div>

        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex flex-col items-center gap-2">
            <Button size="sm">Small Button</Button>
            <span class="text-xs text-gray-500">size="sm"</span>
            <span class="text-xs text-gray-400">For compact spaces</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <Button size="default">Default Button</Button>
            <span class="text-xs text-gray-500">size="default"</span>
            <span class="text-xs text-gray-400">Standard size</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <Button size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
            </Button>
            <span class="text-xs text-gray-500">size="icon"</span>
            <span class="text-xs text-gray-400">Square, icon-only</span>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Comprehensive overview of all available button sizes with use case descriptions.',
      },
    },
  },
}

// Disabled states with explanations
export const DisabledStates: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-col gap-6">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Disabled States</h3>
          <p class="text-sm text-gray-600">How different button variants look when disabled</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-3">
            <h4 class="text-sm font-medium">Enabled</h4>
            <div class="flex flex-col gap-2">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="text-sm font-medium">Disabled</h4>
            <div class="flex flex-col gap-2">
              <Button variant="default" disabled>Default</Button>
              <Button variant="outline" disabled>Outline</Button>
              <Button variant="destructive" disabled>Destructive</Button>
              <Button variant="ghost" disabled>Ghost</Button>
            </div>
          </div>
        </div>

        <div class="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>Note:</strong> Disabled buttons have reduced opacity and pointer-events disabled for accessibility.
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Comparison of enabled vs disabled states across different button variants.',
      },
    },
  },
}

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    type: 'button',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Playground Button</Button>',
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Interactive playground to try different prop combinations.',
      },
    },
  },
}
