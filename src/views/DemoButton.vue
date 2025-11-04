<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import DevelopmentStatus from '@/components/ui/DevelopmentStatus.vue'
import { ref, watch } from 'vue'

const clickCount = ref(0)
const isLoading = ref(false)
const primaryColor = ref('#27B199')

const handleClick = () => {
  clickCount.value++
}

const handleAsyncAction = async () => {
  isLoading.value = true
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000))
  isLoading.value = false
}

// Update CSS variable when color changes
watch(primaryColor, (newColor) => {
  document.documentElement.style.setProperty('--color-primary', newColor)
})

// Predefined color presets
const colorPresets = [
  { name: 'Default', value: '#27B199' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Green', value: '#10B981' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Indigo', value: '#6366F1' },
]

const resetColor = () => {
  primaryColor.value = '#27B199'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-6xl space-y-12">
      <!-- Header -->
      <div>
        <h1 class="mb-2 text-3xl font-bold text-gray-900">Button Component Demo</h1>
        <p class="text-gray-600">
          A versatile button component with multiple variants and sizes using
          class-variance-authority
        </p>
      </div>

      <!-- Color Picker -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Primary Color Customization</h2>
          <p class="text-sm text-gray-600">
            Change the primary color to see how it affects all button variants
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="space-y-6">
            <!-- Custom Color Picker -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-900">Custom Color</h3>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-3">
                  <input
                    v-model="primaryColor"
                    type="color"
                    class="h-12 w-24 cursor-pointer rounded-lg border-2 border-gray-300 transition-all hover:border-gray-400"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-700">{{ primaryColor }}</span>
                    <Button
                      @click="resetColor"
                      class="text-xs text-gray-500 underline hover:text-gray-700"
                    >
                      Reset to default
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Color Presets -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-900">Quick Presets</h3>
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="preset in colorPresets"
                  :key="preset.value"
                  @click="primaryColor = preset.value"
                  :style="{ backgroundColor: preset.value }"
                  :class="[
                    'rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95',
                    primaryColor === preset.value
                      ? 'ring-2 ring-blue-500 ring-offset-2'
                      : 'hover:ring-2 hover:ring-gray-400 hover:ring-offset-2',
                  ]"
                >
                  {{ preset.name }}
                </Button>
              </div>
            </div>

            <!-- Live Preview -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-900">Live Preview</h3>
              <div class="flex flex-wrap gap-3 rounded-lg bg-gray-50 p-4">
                <Button variant="solid">Solid</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="solid" rounded>Rounded</Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Button Variants -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Button Variants</h2>
          <p class="text-sm text-gray-600">Different visual styles for various use cases</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4">
            <!-- Stable Variants -->
            <DevelopmentStatus status="stable">
              <div class="flex items-center justify-between gap-4">
                <div class="flex gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="solid">Solid</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div class="flex gap-2">
                  <Button variant="default" rounded>Default</Button>
                  <Button variant="solid" rounded>Solid</Button>
                  <Button variant="outline" rounded>Outline</Button>
                  <Button variant="ghost" rounded>Ghost</Button>
                  <Button variant="link" rounded>Link</Button>
                </div>
              </div>
            </DevelopmentStatus>

            <!-- Under Development -->
          </div>
        </div>
      </section>

      <!-- Button Sizes -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Button Sizes</h2>
          <p class="text-sm text-gray-600">Various sizes for different contexts</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4">
            <!-- Stable Sizes -->
            <DevelopmentStatus status="stable">
              <div class="flex flex-wrap items-center gap-4">
                <Button size="default">Default</Button>
                <Button size="default">Default</Button>
              </div>
            </DevelopmentStatus>

            <!-- Under Development -->
            <DevelopmentStatus
              status="development"
              description="This size is still in development and may change or be removed before final release."
            >
              <div class="flex flex-wrap items-center gap-4">
                <Button size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </DevelopmentStatus>
          </div>
        </div>
      </section>

      <!-- With Icons -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Buttons with Icons</h2>
          <p class="text-sm text-gray-600">Combining text and icons for better UX</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4">
            <!-- Stable Variants with Icons -->
            <DevelopmentStatus status="stable">
              <div class="flex flex-wrap gap-4">
                <Button variant="solid">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  Next
                </Button>

                <Button variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                  Download
                </Button>

                <Button variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  Delete
                </Button>
              </div>
            </DevelopmentStatus>

            <!-- Under Development -->
            <DevelopmentStatus
              status="development"
              description="This variant with icon is still in development and may change or be removed before final release."
            >
              <div class="flex flex-wrap gap-4">
                <Button variant="ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Comment
                </Button>
              </div>
            </DevelopmentStatus>
          </div>
        </div>
      </section>

      <!-- Icon Only Buttons -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Icon Only Buttons</h2>
          <p class="text-sm text-gray-600">Compact buttons with icons only</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <DevelopmentStatus
            status="development"
            description="All icon-only button variants are still in development and may change or be removed before final release."
          >
            <div class="flex flex-wrap gap-4">
              <Button variant="solid" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </Button>

              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </Button>

              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>

              <Button variant="outline" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
          </DevelopmentStatus>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Disabled State</h2>
          <p class="text-sm text-gray-600">Buttons in disabled state</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4">
            <DevelopmentStatus
              status="stable"
              :change-notes="['Membedakan disabled state dengan inactive state']"
            >
              <div class="flex flex-wrap gap-4">
                <Button variant="solid" disabled>Solid Disabled</Button>
                <Button variant="outline" disabled>Outline Disabled</Button>
                <Button variant="outline" disabled>Destructive Disabled</Button>
              </div>
            </DevelopmentStatus>
            <DevelopmentStatus status="development">
              <div class="flex flex-wrap gap-4">
                <Button variant="link" disabled>Link Disabled</Button>
              </div>
            </DevelopmentStatus>
          </div>
        </div>
      </section>

      <!-- Inactive State -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Inactive State</h2>
          <p class="text-sm text-gray-600">Buttons in inactive state with reduced opacity</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4">
            <DevelopmentStatus status="stable">
              <div class="flex flex-wrap gap-4">
                <Button variant="solid" inactive>Solid inactive</Button>
                <Button variant="outline" inactive>Outline </Button>
                <Button variant="outline" inactive>Destructive</Button>
              </div>
            </DevelopmentStatus>
            <DevelopmentStatus status="development">
              <div class="flex flex-wrap gap-4">
                <Button variant="link">Link Disabled</Button>
              </div>
            </DevelopmentStatus>
          </div>
        </div>
      </section>

      <!-- Interactive Examples -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Interactive Examples</h2>
          <p class="text-sm text-gray-600">Buttons with real functionality</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="space-y-6">
            <!-- Click Counter -->
            <DevelopmentStatus
              status="stable"
              :change-notes="['loading state masuk ke production ready']"
            >
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-900">Click Counter</h3>
                <div class="flex items-center gap-4">
                  <Button @click="handleClick" variant="solid">Click Me</Button>
                  <span class="text-gray-700">
                    Clicked <span class="text-primary font-semibold">{{ clickCount }}</span> times
                  </span>
                </div>
              </div>
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-900">Loading State</h3>
                <div class="flex items-center gap-4">
                  <Button @click="handleAsyncAction" variant="solid" :disabled="isLoading">
                    <svg
                      v-if="isLoading"
                      class="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    {{ isLoading ? 'Processing...' : 'Start Process' }}
                  </Button>
                  <span v-if="isLoading" class="text-sm text-gray-600">
                    Please wait 2 seconds...
                  </span>
                </div>
              </div>
            </DevelopmentStatus>
          </div>
        </div>
      </section>

      <!-- Button Groups -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Button Groups</h2>
          <p class="text-sm text-gray-600">Grouped buttons for related actions</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="space-y-6">
            <!-- Action Group -->
            <DevelopmentStatus status="stable">
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-900">Primary Actions</h3>
                <div class="flex gap-2">
                  <Button variant="solid">Save</Button>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="outline">Delete</Button>
                </div>
              </div>
            </DevelopmentStatus>

            <DevelopmentStatus status="development">
              <!-- Toolbar -->
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-900">Toolbar</h3>
                <div class="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" x2="12" y1="2" y2="15" />
                    </svg>
                  </Button>
                </div>
              </div>
            </DevelopmentStatus>
          </div>
        </div>
      </section>

      <!-- Full Width Buttons -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Full Width Buttons</h2>
          <p class="text-sm text-gray-600">Buttons that span the full width of their container</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <DevelopmentStatus status="stable">
            <div class="space-y-3">
              <Button variant="solid" class="w-full">Full Width Solid</Button>
              <Button variant="outline" class="w-full">Full Width Outline</Button>
              <Button variant="outline" class="w-full">Full Width Destructive</Button>
            </div>
          </DevelopmentStatus>
        </div>
      </section>

      <!-- Responsive Buttons -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Responsive Buttons</h2>
          <p class="text-sm text-gray-600">
            Buttons that adapt to different screen sizes (resize your browser to see the effect)
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <DevelopmentStatus status="stable">
            <div class="flex flex-col gap-3 sm:flex-row">
              <Button variant="solid" class="w-full sm:w-auto">Responsive Button 1</Button>
              <Button variant="outline" class="w-full sm:w-auto">Responsive Button 2</Button>
            </div>
          </DevelopmentStatus>

          <div class="mt-6">
            <DevelopmentStatus status="development">
              <div class="flex flex-col gap-3 sm:flex-row"></div>
            </DevelopmentStatus>
          </div>
        </div>
      </section>

      <!-- Usage Notes -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Usage Guidelines</h2>
          <p class="text-sm text-gray-600">Best practices for using the Button component</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="space-y-4 text-sm text-gray-700">
            <div>
              <h3 class="font-semibold text-gray-900">Variants</h3>
              <ul class="mt-2 list-disc space-y-1 pl-5">
                <li><strong>solid:</strong> Primary actions, main CTAs</li>
                <li><strong>outline:</strong> Secondary actions, less emphasis</li>
                <li><strong>destructive:</strong> Destructive actions (delete, remove, etc.)</li>
                <li><strong>ghost:</strong> Tertiary actions, minimal emphasis</li>
                <li><strong>secondary:</strong> Alternative primary style</li>
                <li><strong>link:</strong> Text links that look like buttons</li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Sizes</h3>
              <ul class="mt-2 list-disc space-y-1 pl-5">
                <li><strong>sm:</strong> Compact spaces, inline with text</li>
                <li><strong>solid:</strong> Standard size for most use cases</li>
                <li><strong>icon:</strong> Icon-only buttons (40x40px)</li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Accessibility</h3>
              <ul class="mt-2 list-disc space-y-1 pl-5">
                <li>Always use descriptive text or aria-labels for icon-only buttons</li>
                <li>Use the disabled attribute instead of just visual styling</li>
                <li>Maintain sufficient color contrast for all variants</li>
                <li>Ensure touch targets are at least 44x44px for mobile</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
