<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
// Import atomic design components
import { FormField } from '@/components/molecules'
import { ContactForm, type ContactFormData } from '@/components/organisms'
import { ref } from 'vue'

// Demo data for atomic components
const inputValue = ref('')
const emailValue = ref('')
const phoneValue = ref('')
const messageValue = ref('')

// Handle form submission
const handleFormSubmit = (data: ContactFormData) => {
  console.log('Form submitted:', data)
  alert(
    `Form submitted!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`,
  )
}
</script>

<template>
  <div class="container mx-auto p-8">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">Atomic Design System</h1>
      <p class="text-gray-600">
        Components organized using Atomic Design methodology: Atoms → Molecules → Organisms
      </p>
    </div>

    <!-- Atoms Section -->
    <section class="mb-12">
      <h2 class="mb-6 border-b pb-2 text-2xl font-semibold text-gray-800">⚛️ Atoms</h2>
      <p class="mb-6 text-gray-600">Basic building blocks - smallest functional components</p>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <!-- Button Atoms -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700">Button Component</h3>
          <div class="space-y-4 rounded-lg bg-gray-50 p-6">
            <div class="space-y-3">
              <h4 class="text-sm font-medium text-gray-600">Variants</h4>
              <div class="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="solid">Solid</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="text-sm font-medium text-gray-600">Sizes</h4>
              <div class="flex flex-wrap items-center gap-2">
                <Button size="default">Small</Button>
                <Button size="default">Default</Button>
                <Button size="icon" aria-label="Check">✓</Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Input, Label, Error Message atoms are composed in molecules -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700">Other Atoms</h3>
          <div class="rounded-lg bg-gray-50 p-6">
            <ul class="space-y-2 text-gray-600">
              <li>
                • <code class="rounded bg-white px-2 py-1">Label</code> - Form labels with required
                indicator
              </li>
              <li>
                • <code class="rounded bg-white px-2 py-1">TextInput</code> - Base input element
              </li>
              <li>
                • <code class="rounded bg-white px-2 py-1">ErrorMessage</code> - Error text display
              </li>
              <li>
                • <code class="rounded bg-white px-2 py-1">CharacterCounter</code> - Input character
                counter
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Molecules Section -->
    <section class="mb-12">
      <h2 class="mb-6 border-b pb-2 text-2xl font-semibold text-gray-800">🧬 Molecules</h2>
      <p class="mb-6 text-gray-600">Combinations of atoms working together as a unit</p>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <!-- FormField Molecule -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700">FormField Molecule</h3>
          <div class="space-y-4 rounded-lg bg-gray-50 p-6">
            <FormField
              v-model="inputValue"
              label="Username"
              placeholder="Enter your username"
              :maxlength="20"
              required
            />

            <FormField
              v-model="emailValue"
              type="email"
              label="Email Address"
              placeholder="user@example.com"
              :error="emailValue.length > 0 && !emailValue.includes('@')"
              errorMessage="Please enter a valid email address"
              required
            />

            <FormField
              v-model="phoneValue"
              type="tel"
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              :maxlength="15"
            />
          </div>
        </div>

        <!-- FormField States -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-700">FormField States</h3>
          <div class="space-y-4 rounded-lg bg-gray-50 p-6">
            <FormField modelValue="Disabled input" label="Disabled Field" disabled />

            <FormField
              modelValue="Error state example"
              label="Field with Error"
              error
              errorMessage="This field has an error"
              required
            />

            <FormField
              v-model="messageValue"
              label="Message with Counter"
              placeholder="Type your message..."
              :maxlength="100"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Organisms Section -->
    <section class="mb-12">
      <h2 class="mb-6 border-b pb-2 text-2xl font-semibold text-gray-800">🦠 Organisms</h2>
      <p class="mb-6 text-gray-600">Complex components composed of molecules and atoms</p>

      <div class="rounded-lg bg-gray-50 p-8">
        <ContactForm @submit="handleFormSubmit" />
      </div>
    </section>

    <!-- Compound Components Section -->
    <section class="mb-12">
      <h2 class="mb-6 border-b pb-2 text-2xl font-semibold text-gray-800">
        🎯 Compound Components
      </h2>
      <p class="mb-6 text-gray-600">
        Advanced components with compound component pattern for maximum flexibility
      </p>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          to="/demo-button"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-2xl group-hover:bg-indigo-500 group-hover:text-white"
          >
            🔘
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Button</h3>
          <p class="text-sm text-gray-600">
            Versatile button component with multiple variants, sizes, and interactive states
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-tabs"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl group-hover:bg-blue-500 group-hover:text-white"
          >
            📑
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Tabs</h3>
          <p class="text-sm text-gray-600">
            Flexible tabs component with compound pattern, controlled/uncontrolled modes
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-modal"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-2xl group-hover:bg-purple-500 group-hover:text-white"
          >
            🪟
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Modal</h3>
          <p class="text-sm text-gray-600">
            Accessible modal dialogs with overlay, focus trap, and scroll lock
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-modal-comparison"
          class="group rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 transition-all hover:border-amber-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-2xl group-hover:bg-amber-500 group-hover:text-white"
          >
            ⚖️
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Modal Comparison</h3>
          <p class="text-sm text-gray-600">
            Compare Compound Pattern vs Props-based Pattern - see the differences!
          </p>
          <div
            class="mt-2 inline-block rounded bg-amber-200 px-2 py-1 text-xs font-semibold text-amber-800"
          >
            Educational Demo
          </div>
        </RouterLink>

        <RouterLink
          to="/demo-menu"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-2xl group-hover:bg-green-500 group-hover:text-white"
          >
            📋
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Dropdown Menu</h3>
          <p class="text-sm text-gray-600">
            Context menus with keyboard navigation and multiple variant options
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-select"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-2xl group-hover:bg-orange-500 group-hover:text-white"
          >
            🎯
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Select</h3>
          <p class="text-sm text-gray-600">
            Custom select dropdown with search, grouping, and keyboard support
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-multi-select"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-2xl group-hover:bg-yellow-500 group-hover:text-white"
          >
            🏷️
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Multi Select</h3>
          <p class="text-sm text-gray-600">
            Multiple selection with badges that can be removed with X button
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-input"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-2xl group-hover:bg-pink-500 group-hover:text-white"
          >
            ✏️
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Advanced Input</h3>
          <p class="text-sm text-gray-600">
            Enhanced form inputs with validation, character count, and error states
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-radio-group"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 text-2xl group-hover:bg-violet-500 group-hover:text-white"
          >
            🔘
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Radio Group</h3>
          <p class="text-sm text-gray-600">
            Accessible radio group with compound pattern and keyboard navigation
          </p>
        </RouterLink>

        <RouterLink
          to="/demo-badge"
          class="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg"
        >
          <div
            class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-2xl group-hover:bg-teal-500 group-hover:text-white"
          >
            🏷️
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Badge</h3>
          <p class="text-sm text-gray-600">
            Badges, tags, and chips with variants, icons, and dismissible support
          </p>
        </RouterLink>
      </div>
    </section>

    <!-- Architecture Benefits -->
    <section class="mt-12 rounded-lg bg-blue-50 p-6">
      <h3 class="mb-4 text-lg font-semibold text-blue-900">🏗️ Atomic Design Benefits</h3>
      <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
        <div class="rounded bg-white p-4">
          <h4 class="mb-2 font-semibold text-blue-800">Consistency</h4>
          <p class="text-gray-600">
            Reusable components ensure UI consistency across the application
          </p>
        </div>
        <div class="rounded bg-white p-4">
          <h4 class="mb-2 font-semibold text-blue-800">Maintainability</h4>
          <p class="text-gray-600">
            Changes to atoms automatically propagate to all dependent components
          </p>
        </div>
        <div class="rounded bg-white p-4">
          <h4 class="mb-2 font-semibold text-blue-800">Scalability</h4>
          <p class="text-gray-600">Easy to extend and combine components for new features</p>
        </div>
      </div>
    </section>
  </div>
</template>
