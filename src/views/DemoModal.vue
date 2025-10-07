<script setup lang="ts">
import {
  DropdownMenuButton,
  DropdownMenuOption,
  DropdownMenuPanel,
  DropdownMenuRoot,
} from '@/components/dropdown-menu'
import {
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  ModalTitle,
} from '@/components/modal'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
} from '@/components/select'
import Button from '@/components/ui/Button.vue'
import { computed, ref } from 'vue'

const isBasicOpen = ref(false)
const isSmallOpen = ref(false)
const isLargeOpen = ref(false)
const isCustomOpen = ref(false)
const isNoFooterOpen = ref(false)
const isFormOpen = ref(false)

// Form with select state
const formData = ref({
  name: '',
  email: '',
  category: '',
  priority: '',
  country: '',
  department: '',
  timezone: '',
})

// Options for select menus
const categoryOptions = [
  { value: 'bug', label: '🐛 Bug Report' },
  { value: 'feature', label: '✨ Feature Request' },
  { value: 'support', label: '💬 Support' },
  { value: 'question', label: '❓ Question' },
  { value: 'other', label: '📝 Other' },
]

const priorityOptions = [
  { value: 'low', label: '🟢 Low' },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'high', label: '🟠 High' },
  { value: 'urgent', label: '🔴 Urgent' },
]

const countryOptions = [
  { value: 'id', label: '🇮🇩 Indonesia' },
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'sg', label: '🇸🇬 Singapore' },
  { value: 'my', label: '🇲🇾 Malaysia' },
  { value: 'jp', label: '🇯🇵 Japan' },
  { value: 'kr', label: '🇰🇷 South Korea' },
  { value: 'au', label: '🇦🇺 Australia' },
]

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Customer Support' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
]

const timezoneOptions = {
  asia: [
    { value: 'asia/jakarta', label: 'Jakarta (GMT+7)' },
    { value: 'asia/singapore', label: 'Singapore (GMT+8)' },
    { value: 'asia/tokyo', label: 'Tokyo (GMT+9)' },
    { value: 'asia/hong_kong', label: 'Hong Kong (GMT+8)' },
    { value: 'asia/seoul', label: 'Seoul (GMT+9)' },
  ],
  america: [
    { value: 'america/new_york', label: 'New York (GMT-5)' },
    { value: 'america/los_angeles', label: 'Los Angeles (GMT-8)' },
    { value: 'america/chicago', label: 'Chicago (GMT-6)' },
    { value: 'america/toronto', label: 'Toronto (GMT-5)' },
  ],
  europe: [
    { value: 'europe/london', label: 'London (GMT+0)' },
    { value: 'europe/paris', label: 'Paris (GMT+1)' },
    { value: 'europe/berlin', label: 'Berlin (GMT+1)' },
    { value: 'europe/amsterdam', label: 'Amsterdam (GMT+1)' },
  ],
}

// Computed labels for selected values
const categoryLabel = computed(() => {
  const option = categoryOptions.find((opt) => opt.value === formData.value.category)
  return option ? option.label : 'Select a category'
})

const priorityLabel = computed(() => {
  const option = priorityOptions.find((opt) => opt.value === formData.value.priority)
  return option ? option.label : 'Select priority'
})

const countryLabel = computed(() => {
  const option = countryOptions.find((opt) => opt.value === formData.value.country)
  return option ? option.label : 'Select your country'
})

// Validation handlers
const handleInvalidCategory = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.setCustomValidity('Please select a category')
}

const handleInvalidPriority = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.setCustomValidity('Please select a priority level')
}

const handleInvalidCountry = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.setCustomValidity('Please select a country')
}

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.setCustomValidity('')
}

const handleConfirm = () => {
  console.log('Action confirmed!')
  isBasicOpen.value = false
}

const handleDelete = () => {
  console.log('Item deleted!')
  isCustomOpen.value = false
}

const handleFormSubmit = () => {
  console.log('Form submitted:', formData.value)
  isFormOpen.value = false
  // Reset form
  formData.value = {
    name: '',
    email: '',
    category: '',
    priority: '',
    country: '',
    department: '',
    timezone: '',
  }
}
</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="mb-8 text-3xl font-bold">Modal Component Demo</h1>

    <div class="space-y-4">
      <!-- Basic Modal -->
      <div class="rounded-lg border border-gray-200 p-6">
        <h2 class="mb-2 text-xl font-semibold">Basic Modal</h2>
        <p class="mb-4 text-gray-600">Standard modal with header, body, and footer.</p>
        <button
          @click="isBasicOpen = true"
          class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Open Basic Modal
        </button>

        <ModalRoot v-model:open="isBasicOpen">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Basic Modal Title</ModalTitle>
              <ModalClose />
            </ModalHeader>

            <ModalBody>
              <p class="mb-4">
                This is a basic modal with default styling. You can put any content here.
              </p>
              <p class="mb-4">
                The modal will close when you click the close button, press Escape, or click
                outside.
              </p>
              <p>Try interacting with it!</p>
            </ModalBody>

            <ModalFooter>
              <Button @click="isBasicOpen = false" variant="outline"> Cancel </Button>
              <Button @click="handleConfirm" variant="default"> Confirm </Button>
            </ModalFooter>
          </ModalContent>
        </ModalRoot>
      </div>

      <!-- Small Modal -->
      <div class="rounded-lg border border-gray-200 p-6">
        <h2 class="mb-2 text-xl font-semibold">Small Modal</h2>
        <p class="mb-4 text-gray-600">Compact modal for quick messages.</p>
        <button
          @click="isSmallOpen = true"
          class="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Open Small Modal
        </button>

        <ModalRoot v-model:open="isSmallOpen">
          <ModalOverlay />
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>Small Modal</ModalTitle>
              <ModalClose />
            </ModalHeader>

            <ModalBody>
              <p>This is a small modal. Perfect for quick confirmations or messages.</p>
            </ModalBody>

            <ModalFooter>
              <Button @click="isSmallOpen = false" variant="outline"> Close </Button>
            </ModalFooter>
          </ModalContent>
        </ModalRoot>
      </div>

      <!-- Large Modal -->
      <div class="rounded-lg border border-gray-200 p-6">
        <h2 class="mb-2 text-xl font-semibold">Large Modal</h2>
        <p class="mb-4 text-gray-600">Spacious modal for more content.</p>
        <button
          @click="isLargeOpen = true"
          class="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Open Large Modal
        </button>

        <ModalRoot v-model:open="isLargeOpen">
          <ModalOverlay />
          <ModalContent size="lg">
            <ModalHeader>
              <ModalTitle>Large Modal with Lots of Content</ModalTitle>
              <ModalClose />
            </ModalHeader>

            <ModalBody>
              <h3 class="mb-2 text-lg font-semibold">Section 1</h3>
              <p class="mb-4">
                This is a large modal that can accommodate more content. You can have multiple
                sections, images, forms, or any other content.
              </p>

              <h3 class="mb-2 text-lg font-semibold">Section 2</h3>
              <p class="mb-4">
                The body section will automatically scroll if the content exceeds the maximum height
                of the modal.
              </p>

              <h3 class="mb-2 text-lg font-semibold">Section 3</h3>
              <p class="mb-4">
                This makes it perfect for forms, settings panels, or detailed information displays.
              </p>

              <div class="rounded-md bg-gray-100 p-4">
                <p class="text-sm text-gray-700">
                  <strong>Pro tip:</strong> You can customize every part of the modal with custom
                  classes!
                </p>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button @click="isLargeOpen = false" variant="outline"> Cancel </Button>
              <Button @click="isLargeOpen = false" variant="default"> Save Changes </Button>
            </ModalFooter>
          </ModalContent>
        </ModalRoot>
      </div>

      <!-- Custom Styled Modal -->
      <div class="rounded-lg border border-gray-200 p-6">
        <h2 class="mb-2 text-xl font-semibold">Custom Styled Modal</h2>
        <p class="mb-4 text-gray-600">Completely customized appearance.</p>
        <button
          @click="isCustomOpen = true"
          class="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Open Custom Modal
        </button>

        <ModalRoot v-model:open="isCustomOpen">
          <ModalOverlay class="bg-blue-500/20" />
          <ModalContent class="border-4 border-red-500">
            <ModalHeader class="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <ModalTitle class="text-white">⚠️ Danger Zone</ModalTitle>
              <ModalClose class="text-white hover:bg-white/20" />
            </ModalHeader>

            <ModalBody class="bg-red-50">
              <div class="rounded-md border-2 border-red-300 bg-white p-4">
                <p class="mb-2 font-semibold text-red-800">
                  Are you sure you want to delete this item?
                </p>
                <p class="text-sm text-gray-700">
                  This action cannot be undone. All associated data will be permanently removed from
                  our servers.
                </p>
              </div>
            </ModalBody>

            <ModalFooter class="justify-end bg-red-50">
              <Button @click="isCustomOpen = false" variant="outline"> Cancel </Button>
              <Button @click="handleDelete" variant="destructive"> Delete Permanently </Button>
            </ModalFooter>
          </ModalContent>
        </ModalRoot>
      </div>

      <!-- No Footer Modal -->
      <div class="rounded-lg border border-gray-200 p-6">
        <h2 class="mb-2 text-xl font-semibold">No Footer Modal</h2>
        <p class="mb-4 text-gray-600">Simple modal without footer actions.</p>
        <button
          @click="isNoFooterOpen = true"
          class="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
        >
          Open No Footer Modal
        </button>

        <ModalRoot v-model:open="isNoFooterOpen">
          <ModalOverlay />
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>Information</ModalTitle>
              <ModalClose />
            </ModalHeader>

            <ModalBody>
              <p class="mb-4">
                Sometimes you don't need a footer. This modal can be closed using the X button, the
                Escape key, or by clicking outside.
              </p>
              <p class="text-sm text-gray-600">This is perfect for simple notifications!</p>
            </ModalBody>
          </ModalContent>
        </ModalRoot>
      </div>

      <!-- Form with Select Menu Modal -->
      <div class="rounded-lg border border-gray-200 p-6">
        <h2 class="mb-2 text-xl font-semibold">Form with Select Menu</h2>
        <p class="mb-4 text-gray-600">Modal containing a form with multiple select dropdowns.</p>
        <button
          @click="isFormOpen = true"
          class="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          Open Form Modal
        </button>

        <ModalRoot v-model:open="isFormOpen">
          <ModalOverlay />
          <ModalContent size="lg">
            <ModalHeader>
              <ModalTitle>Create New Ticket</ModalTitle>
              <ModalClose />
            </ModalHeader>

            <ModalBody>
              <form @submit.prevent="handleFormSubmit" id="ticketForm" class="space-y-5">
                <!-- Name Input -->
                <div>
                  <label for="name" class="mb-1.5 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>

                <!-- Email Input -->
                <div>
                  <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>

                <!-- Category Select using DropdownMenu Component -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700"> Category </label>
                  <DropdownMenuRoot>
                    <DropdownMenuButton
                      :label="categoryLabel"
                      variant="secondary"
                      class="w-full justify-between !bg-white !text-gray-700 hover:!bg-gray-50"
                    />
                    <DropdownMenuPanel teleport>
                      <DropdownMenuOption
                        v-for="option in categoryOptions"
                        :key="option.value"
                        @click="formData.category = option.value"
                      >
                        {{ option.label }}
                      </DropdownMenuOption>
                    </DropdownMenuPanel>
                  </DropdownMenuRoot>
                  <!-- Hidden input for form validation -->
                  <input
                    type="hidden"
                    :value="formData.category"
                    required
                    @invalid="handleInvalidCategory"
                    @input="handleInputChange"
                  />
                </div>

                <!-- Priority Select using DropdownMenu Component -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700">
                    Priority Level
                  </label>
                  <DropdownMenuRoot>
                    <DropdownMenuButton
                      :label="priorityLabel"
                      variant="secondary"
                      class="w-full justify-between !bg-white !text-gray-700 hover:!bg-gray-50"
                    />
                    <DropdownMenuPanel teleport>
                      <DropdownMenuOption
                        v-for="option in priorityOptions"
                        :key="option.value"
                        @click="formData.priority = option.value"
                      >
                        {{ option.label }}
                      </DropdownMenuOption>
                    </DropdownMenuPanel>
                  </DropdownMenuRoot>
                  <!-- Hidden input for form validation -->
                  <input
                    type="hidden"
                    :value="formData.priority"
                    required
                    @invalid="handleInvalidPriority"
                    @input="handleInputChange"
                  />
                </div>

                <!-- Country Select using DropdownMenu Component -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700"> Country </label>
                  <DropdownMenuRoot>
                    <DropdownMenuButton
                      :label="countryLabel"
                      variant="secondary"
                      class="w-full justify-between !bg-white !text-gray-700 hover:!bg-gray-50"
                    />
                    <DropdownMenuPanel teleport class="max-h-60 overflow-y-auto">
                      <DropdownMenuOption
                        v-for="option in countryOptions"
                        :key="option.value"
                        @click="formData.country = option.value"
                      >
                        {{ option.label }}
                      </DropdownMenuOption>
                    </DropdownMenuPanel>
                  </DropdownMenuRoot>
                  <!-- Hidden input for form validation -->
                  <input
                    type="hidden"
                    :value="formData.country"
                    required
                    @invalid="handleInvalidCountry"
                    @input="handleInputChange"
                  />
                </div>

                <!-- Department Select using Select Component -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700"> Department </label>
                  <SelectRoot v-model="formData.department" placeholder="Select department">
                    <SelectTrigger class="w-full" />
                    <SelectContent>
                      <SelectItem
                        v-for="option in departmentOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </SelectItem>
                    </SelectContent>
                  </SelectRoot>
                </div>

                <!-- Timezone Select using Select Component with Groups -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700"> Timezone </label>
                  <SelectRoot v-model="formData.timezone" placeholder="Select timezone">
                    <SelectTrigger class="w-full" />
                    <SelectContent class="max-h-60">
                      <SelectGroup>
                        <SelectLabel>Asia</SelectLabel>
                        <SelectItem
                          v-for="option in timezoneOptions.asia"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>America</SelectLabel>
                        <SelectItem
                          v-for="option in timezoneOptions.america"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Europe</SelectLabel>
                        <SelectItem
                          v-for="option in timezoneOptions.europe"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectRoot>
                </div>

                <!-- Info Box -->
                <div class="rounded-md bg-indigo-50 p-3">
                  <p class="text-xs text-indigo-800">
                    <strong>💡 Tip:</strong> This form demonstrates both DropdownMenu (for
                    Category/Priority/Country) and Select components (for Department/Timezone).
                    Select components are specifically designed for form inputs with v-model support
                    and visual indicators. Both work perfectly inside modals with proper z-index and
                    teleport!
                  </p>
                </div>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" @click="isFormOpen = false"> Cancel </Button>
              <Button form="ticketForm" variant="default"> Submit Ticket </Button>
            </ModalFooter>
          </ModalContent>
        </ModalRoot>
      </div>
    </div>

    <!-- Usage Example Code -->
    <div class="mt-12">
      <h2 class="mb-4 text-2xl font-bold">Usage Example</h2>
      <div class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">
        <pre><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import {
  ModalRoot,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
} from '@/components/modal'

const isOpen = ref(false)
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="isOpen = true"&gt;Open Modal&lt;/button&gt;

  &lt;ModalRoot v-model:open="isOpen"&gt;
    &lt;ModalOverlay /&gt;
    &lt;ModalContent&gt;
      &lt;ModalHeader&gt;
        &lt;ModalTitle&gt;Modal Title&lt;/ModalTitle&gt;
        &lt;ModalClose /&gt;
      &lt;/ModalHeader&gt;

      &lt;ModalBody&gt;
        &lt;p&gt;Your content here&lt;/p&gt;
      &lt;/ModalBody&gt;

      &lt;ModalFooter&gt;
        &lt;button @click="isOpen = false"&gt;Cancel&lt;/button&gt;
        &lt;button @click="isOpen = false"&gt;Confirm&lt;/button&gt;
      &lt;/ModalFooter&gt;
    &lt;/ModalContent&gt;
  &lt;/ModalRoot&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>
  </div>
</template>
