<script setup lang="ts">
import { ref } from 'vue'

// Import Compound Component Pattern Modal
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

// Import Props-based Modal
import { Modal } from '@/components/modal-props'

import Button from '@/components/ui/Button.vue'

// State for Compound Component Pattern
const isCompoundOpen = ref(false)
const isCompoundCustomOpen = ref(false)
const isCompoundFormOpen = ref(false)

// State for Props-based Modal
const isPropsOpen = ref(false)
const isPropsCustomOpen = ref(false)
const isPropsFormOpen = ref(false)

// Form data
const compoundFormData = ref({
  name: '',
  email: '',
  message: '',
})

const propsFormData = ref({
  name: '',
  email: '',
  message: '',
})

// Handlers for Compound Pattern
const handleCompoundConfirm = () => {
  console.log('Compound: Confirmed!')
  isCompoundOpen.value = false
}

const handleCompoundDelete = () => {
  console.log('Compound: Item deleted!')
  isCompoundCustomOpen.value = false
}

const handleCompoundFormSubmit = () => {
  console.log('Compound Form submitted:', compoundFormData.value)
  isCompoundFormOpen.value = false
  compoundFormData.value = { name: '', email: '', message: '' }
}

// Handlers for Props-based Pattern
const handlePropsConfirm = () => {
  console.log('Props: Confirmed!')
  isPropsOpen.value = false
}

const handlePropsDelete = () => {
  console.log('Props: Item deleted!')
  isPropsCustomOpen.value = false
}

const handlePropsFormSubmit = () => {
  console.log('Props Form submitted:', propsFormData.value)
  isPropsFormOpen.value = false
  propsFormData.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8">
        <h1 class="mb-4 text-4xl font-bold text-gray-900">Modal Pattern Comparison</h1>
        <p class="text-lg text-gray-600">
          Perbandingan antara <strong>Compound Component Pattern</strong> dan
          <strong>Props-based Pattern</strong>
        </p>
      </div>

      <!-- Comparison Grid -->
      <div class="grid gap-8 lg:grid-cols-2">
        <!-- LEFT COLUMN: Compound Component Pattern -->
        <div class="space-y-6">
          <div class="rounded-lg bg-green-50 p-6">
            <h2 class="mb-2 text-2xl font-bold text-green-900">✨ Compound Component Pattern</h2>
            <p class="text-sm text-green-700">
              Pattern yang sudah ada di project ini. Menggunakan multiple components yang
              terkomposisi.
            </p>
          </div>

          <!-- Example 1: Basic Modal -->
          <div class="rounded-lg border-2 border-green-500 bg-white p-6 shadow-md">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">1. Basic Modal</h3>
            <div class="mb-4 rounded bg-gray-50 p-3">
              <code class="text-xs text-gray-700">
                &lt;ModalRoot&gt;<br />
                &nbsp;&nbsp;&lt;ModalOverlay /&gt;<br />
                &nbsp;&nbsp;&lt;ModalContent&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;ModalHeader&gt;...&lt;/ModalHeader&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;ModalBody&gt;...&lt;/ModalBody&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;ModalFooter&gt;...&lt;/ModalFooter&gt;<br />
                &nbsp;&nbsp;&lt;/ModalContent&gt;<br />
                &lt;/ModalRoot&gt;
              </code>
            </div>
            <Button @click="isCompoundOpen = true" variant="default"> Open Compound Modal </Button>

            <ModalRoot v-model:open="isCompoundOpen">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Compound Component Pattern</ModalTitle>
                  <ModalClose />
                </ModalHeader>

                <ModalBody>
                  <p class="mb-4">
                    Ini adalah modal yang dibuat dengan <strong>Compound Component Pattern</strong>.
                  </p>
                  <ul class="list-inside list-disc space-y-2 text-sm text-gray-600">
                    <li>Setiap bagian adalah component terpisah</li>
                    <li>Dapat dikomposisi dengan fleksibel</li>
                    <li>Styling individual per component</li>
                    <li>Context API untuk state sharing</li>
                  </ul>
                </ModalBody>

                <ModalFooter>
                  <Button @click="isCompoundOpen = false" variant="outline"> Cancel </Button>
                  <Button @click="handleCompoundConfirm" variant="default"> Confirm </Button>
                </ModalFooter>
              </ModalContent>
            </ModalRoot>
          </div>

          <!-- Example 2: Custom Styled -->
          <div class="rounded-lg border-2 border-green-500 bg-white p-6 shadow-md">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">2. Custom Styled Modal</h3>
            <div class="mb-4 rounded bg-gray-50 p-3">
              <code class="text-xs text-gray-700">
                &lt;ModalHeader class="bg-gradient-to-r ..."&gt;<br />
                &nbsp;&nbsp;&lt;ModalTitle class="text-white"&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Custom Title<br />
                &nbsp;&nbsp;&lt;/ModalTitle&gt;<br />
                &lt;/ModalHeader&gt;
              </code>
            </div>
            <Button @click="isCompoundCustomOpen = true" variant="destructive">
              Open Custom Compound
            </Button>

            <ModalRoot v-model:open="isCompoundCustomOpen">
              <ModalOverlay class="bg-blue-500/20" />
              <ModalContent class="border-4 border-blue-500">
                <ModalHeader class="bg-gradient-to-r from-yellow-500 to-pink-500 text-white">
                  <ModalTitle class="text-white">⚠️ Danger Zone (Compound)</ModalTitle>
                  <ModalClose class="text-white hover:bg-white/20" />
                </ModalHeader>

                <ModalBody class="bg-red-50">
                  <p class="mb-2 font-semibold text-red-800">
                    Setiap component bisa di-style secara individual!
                  </p>
                  <ul class="list-inside list-disc space-y-1 text-sm text-gray-700">
                    <li>Header dengan gradient background</li>
                    <li>Body dengan background color</li>
                    <li>Footer dengan custom alignment</li>
                    <li>Overlay dengan custom opacity</li>
                  </ul>
                </ModalBody>

                <ModalFooter class="justify-end bg-red-50">
                  <Button @click="isCompoundCustomOpen = false" variant="outline"> Cancel </Button>
                  <Button @click="handleCompoundDelete" variant="destructive">
                    Delete Permanently
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalRoot>
          </div>

          <!-- Example 3: Form Modal -->
          <div class="rounded-lg border-2 border-green-500 bg-white p-6 shadow-md">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">3. Form Modal</h3>
            <div class="mb-4 rounded bg-gray-50 p-3">
              <code class="text-xs text-gray-700">
                &lt;ModalBody&gt;<br />
                &nbsp;&nbsp;&lt;form @submit.prevent="..."&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Custom form layout --&gt;<br />
                &nbsp;&nbsp;&lt;/form&gt;<br />
                &lt;/ModalBody&gt;
              </code>
            </div>
            <Button @click="isCompoundFormOpen = true" variant="default"> Open Form Modal </Button>

            <ModalRoot v-model:open="isCompoundFormOpen">
              <ModalOverlay />
              <ModalContent size="lg">
                <ModalHeader>
                  <ModalTitle>Contact Form (Compound)</ModalTitle>
                  <ModalClose />
                </ModalHeader>

                <ModalBody>
                  <form
                    @submit.prevent="handleCompoundFormSubmit"
                    id="compoundForm"
                    class="space-y-4"
                  >
                    <div>
                      <label class="mb-1.5 block text-sm font-medium text-gray-700"> Name </label>
                      <input
                        v-model="compoundFormData.name"
                        type="text"
                        required
                        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label class="mb-1.5 block text-sm font-medium text-gray-700"> Email </label>
                      <input
                        v-model="compoundFormData.email"
                        type="email"
                        required
                        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label class="mb-1.5 block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        v-model="compoundFormData.message"
                        rows="4"
                        required
                        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      ></textarea>
                    </div>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button @click="isCompoundFormOpen = false" variant="outline"> Cancel </Button>
                  <Button form="compoundForm" variant="default"> Submit </Button>
                </ModalFooter>
              </ModalContent>
            </ModalRoot>
          </div>
        </div>

        <!-- RIGHT COLUMN: Props-based Pattern -->
        <div class="space-y-6">
          <div class="rounded-lg bg-blue-50 p-6">
            <h2 class="mb-2 text-2xl font-bold text-blue-900">⚙️ Props-based Pattern</h2>
            <p class="text-sm text-blue-700">
              Pattern tradisional menggunakan props untuk konfigurasi. Satu component monolithic.
            </p>
          </div>

          <!-- Example 1: Basic Modal -->
          <div class="rounded-lg border-2 border-blue-500 bg-white p-6 shadow-md">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">1. Basic Modal</h3>
            <div class="mb-4 rounded bg-gray-50 p-3">
              <code class="text-xs text-gray-700">
                &lt;Modal<br />
                &nbsp;&nbsp;v-model:open="isOpen"<br />
                &nbsp;&nbsp;title="Modal Title"<br />
                &nbsp;&nbsp;confirm-text="Confirm"<br />
                &nbsp;&nbsp;cancel-text="Cancel"<br />
                &nbsp;&nbsp;@confirm="handleConfirm"<br />
                &gt;<br />
                &nbsp;&nbsp;Content here<br />
                &lt;/Modal&gt;
              </code>
            </div>
            <Button @click="isPropsOpen = true" variant="default"> Open Props Modal </Button>

            <Modal
              v-model:open="isPropsOpen"
              title="Props-based Pattern"
              confirm-text="Confirm"
              cancel-text="Cancel"
              @confirm="handlePropsConfirm"
            >
              <p class="mb-4">
                Ini adalah modal yang dibuat dengan <strong>Props-based Pattern</strong>.
              </p>
              <ul class="list-inside list-disc space-y-2 text-sm text-gray-600">
                <li>Konfigurasi melalui props</li>
                <li>Lebih mudah untuk use case sederhana</li>
                <li>Kurang fleksibel untuk custom layout</li>
                <li>Props drilling untuk customization</li>
              </ul>
            </Modal>
          </div>

          <!-- Example 2: Custom Styled -->
          <div class="rounded-lg border-2 border-blue-500 bg-white p-6 shadow-md">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">2. Custom Styled Modal</h3>
            <div class="mb-4 rounded bg-gray-50 p-3">
              <code class="text-xs text-gray-700">
                &lt;Modal<br />
                &nbsp;&nbsp;header-class="bg-gradient-to-r ..."<br />
                &nbsp;&nbsp;body-class="bg-red-50"<br />
                &nbsp;&nbsp;footer-class="bg-red-50"<br />
                &nbsp;&nbsp;title-class="text-white"<br />
                &nbsp;&nbsp;overlay-class="bg-red-500/20"<br />
                &gt;
              </code>
            </div>
            <Button @click="isPropsCustomOpen = true" variant="destructive">
              Open Custom Props
            </Button>

            <Modal
              v-model:open="isPropsCustomOpen"
              title="⚠️ Danger Zone (Props)"
              confirm-text="Delete Permanently"
              cancel-text="Cancel"
              header-class="bg-gradient-to-r from-red-500 to-pink-500 text-white"
              body-class="bg-red-50"
              footer-class="bg-red-50 justify-end"
              title-class="text-white"
              overlay-class="bg-red-500/20"
              content-class="border-4 border-red-500"
              confirm-button-class="bg-red-600 hover:bg-red-700"
              @confirm="handlePropsDelete"
            >
              <p class="mb-2 font-semibold text-red-800">
                Styling via props membutuhkan banyak props!
              </p>
              <ul class="list-inside list-disc space-y-1 text-sm text-gray-700">
                <li>Perlu props untuk setiap bagian (header-class, body-class, dll)</li>
                <li>Props drilling untuk customization mendalam</li>
                <li>API component menjadi kompleks</li>
                <li>Lebih sulit untuk maintain</li>
              </ul>
            </Modal>
          </div>

          <!-- Example 3: Form Modal -->
          <div class="rounded-lg border-2 border-blue-500 bg-white p-6 shadow-md">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">3. Form Modal</h3>
            <div class="mb-4 rounded bg-gray-50 p-3">
              <code class="text-xs text-gray-700">
                &lt;Modal<br />
                &nbsp;&nbsp;title="Contact Form"<br />
                &nbsp;&nbsp;size="lg"<br />
                &nbsp;&nbsp;:show-footer="false"<br />
                &gt;<br />
                &nbsp;&nbsp;&lt;form&gt;...&lt;/form&gt;<br />
                &nbsp;&nbsp;&lt;template #footer&gt;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Custom footer --&gt;<br />
                &nbsp;&nbsp;&lt;/template&gt;<br />
                &lt;/Modal&gt;
              </code>
            </div>
            <Button @click="isPropsFormOpen = true" variant="default"> Open Form Modal </Button>

            <Modal
              v-model:open="isPropsFormOpen"
              title="Contact Form (Props)"
              size="lg"
              :show-footer="false"
            >
              <form @submit.prevent="handlePropsFormSubmit" id="propsForm" class="space-y-4">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700"> Name </label>
                  <input
                    v-model="propsFormData.name"
                    type="text"
                    required
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700"> Email </label>
                  <input
                    v-model="propsFormData.email"
                    type="email"
                    required
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700"> Message </label>
                  <textarea
                    v-model="propsFormData.message"
                    rows="4"
                    required
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  ></textarea>
                </div>
                <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                  <Button @click="isPropsFormOpen = false" variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button variant="default" type="submit"> Submit </Button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="mt-12 overflow-hidden rounded-lg bg-white shadow-lg">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 class="text-2xl font-bold text-white">📊 Perbandingan Detail</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Aspek</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-green-900">
                  Compound Component
                </th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-blue-900">Props-based</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Fleksibilitas</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Sangat tinggi - bisa compose layout apapun
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ⚠️ Terbatas - harus ikuti struktur yang sudah ditentukan
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Styling</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Mudah - langsung tambah class di component yang ingin di-style
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ❌ Sulit - perlu props untuk setiap bagian (props drilling)
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Learning Curve</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ⚠️ Perlu memahami structure dan context API
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Lebih mudah dipahami - familiar pattern
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">TypeScript Support</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Excellent - setiap component punya type sendiri
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ⚠️ Good - tapi interface props bisa sangat besar
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Maintainability</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Tinggi - component kecil, focused, reusable
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ❌ Rendah - satu component besar dengan banyak responsibility
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Code Reusability</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Tinggi - bisa mix & match components
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ⚠️ Sedang - harus gunakan slot untuk customization
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Bundle Size</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Optimal - tree-shaking lebih efektif
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ⚠️ Lebih besar - satu component dengan semua fitur
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">API Complexity</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Sederhana - setiap component punya API minimal
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ❌ Kompleks - banyak props untuk cover semua use case
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Developer Experience</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Excellent - autocomplete per component, clear intent
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ⚠️ Good - tapi props list bisa overwhelming
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">Testing</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ✅ Mudah - test setiap component secara isolated
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  ⚠️ Lebih sulit - harus test semua variant & props combination
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Advantages Section -->
      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <!-- Compound Component Advantages -->
        <div class="rounded-lg bg-green-50 p-6 shadow-md">
          <h3 class="mb-4 text-xl font-bold text-green-900">
            ✨ Keuntungan Compound Component Pattern
          </h3>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Maksimal Flexibility:</strong> Anda bisa compose layout apapun sesuai
                kebutuhan tanpa batasan</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Clean API:</strong> Setiap component punya props minimal dan focused</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Easy Styling:</strong> Langsung tambah class di component yang ingin
                di-style, tidak perlu props drilling</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Better Type Safety:</strong> TypeScript inference lebih baik untuk setiap
                component</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Maintainable:</strong> Small, focused components yang mudah di-maintain dan
                test</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Reusability:</strong> Component bisa digunakan ulang dalam kombinasi yang
                berbeda</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>No Props Explosion:</strong> Tidak perlu ratusan props untuk handle semua
                customization</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Future-Proof:</strong> Mudah extend dengan component baru tanpa breaking
                existing API</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-green-600">✓</span>
              <span
                ><strong>Industry Standard:</strong> Digunakan oleh Radix UI, Headless UI, shadcn,
                React Aria</span
              >
            </li>
          </ul>
        </div>

        <!-- Props-based Disadvantages -->
        <div class="rounded-lg bg-red-50 p-6 shadow-md">
          <h3 class="mb-4 text-xl font-bold text-red-900">⚠️ Kekurangan Props-based Pattern</h3>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Props Drilling:</strong> Perlu props untuk setiap aspek customization
                (header-class, body-class, title-class, dll)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Limited Flexibility:</strong> Sulit untuk custom layout yang tidak
                terprediksi</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Complex API:</strong> Interface props menjadi sangat besar dan
                overwhelming</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Hard to Extend:</strong> Menambah fitur baru = tambah props baru = breaking
                change potential</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Monolithic:</strong> Satu component besar dengan banyak responsibility
                (violation of Single Responsibility Principle)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Testing Complexity:</strong> Harus test kombinasi props yang sangat
                banyak</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Poor DX:</strong> Developer harus ingat banyak props names dan values</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-0.5 text-red-600">✗</span>
              <span
                ><strong>Larger Bundle:</strong> Tree-shaking kurang efektif karena semua logic
                dalam satu file</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Code Comparison -->
      <div class="mt-12 rounded-lg bg-white p-6 shadow-lg">
        <h2 class="mb-6 text-2xl font-bold text-gray-900">💻 Perbandingan Kode</h2>

        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Compound Pattern Code -->
          <div>
            <h3 class="mb-3 text-lg font-semibold text-green-900">Compound Component Pattern</h3>
            <pre
              class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-400"
            ><code>&lt;ModalRoot v-model:open="isOpen"&gt;
  &lt;ModalOverlay /&gt;
  &lt;ModalContent size="lg"&gt;
    &lt;ModalHeader class="bg-blue-500"&gt;
      &lt;ModalTitle&gt;Custom Title&lt;/ModalTitle&gt;
      &lt;ModalClose /&gt;
    &lt;/ModalHeader&gt;

    &lt;ModalBody class="p-8"&gt;
      &lt;!-- Any custom content --&gt;
      &lt;YourCustomComponent /&gt;
    &lt;/ModalBody&gt;

    &lt;ModalFooter class="justify-between"&gt;
      &lt;button&gt;Custom Left&lt;/button&gt;
      &lt;button&gt;Custom Right&lt;/button&gt;
    &lt;/ModalFooter&gt;
  &lt;/ModalContent&gt;
&lt;/ModalRoot&gt;</code></pre>
            <div class="mt-3 rounded-lg bg-green-100 p-3">
              <p class="text-xs text-green-800">
                <strong>✨ Keuntungan:</strong> Langsung style di component yang diinginkan. Clear
                dan intuitive.
              </p>
            </div>
          </div>

          <!-- Props-based Code -->
          <div>
            <h3 class="mb-3 text-lg font-semibold text-blue-900">Props-based Pattern</h3>
            <pre
              class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-blue-400"
            ><code>&lt;Modal
  v-model:open="isOpen"
  title="Custom Title"
  size="lg"
  header-class="bg-blue-500"
  body-class="p-8"
  footer-class="justify-between"
  title-class="text-white"
  :show-default-footer="false"
  @confirm="handleConfirm"
&gt;
  &lt;!-- Content --&gt;
  &lt;YourCustomComponent /&gt;

  &lt;template #footer&gt;
    &lt;button&gt;Custom Left&lt;/button&gt;
    &lt;button&gt;Custom Right&lt;/button&gt;
  &lt;/template&gt;
&lt;/Modal&gt;</code></pre>
            <div class="mt-3 rounded-lg bg-red-100 p-3">
              <p class="text-xs text-red-800">
                <strong>⚠️ Masalah:</strong> Banyak props untuk styling. API menjadi kompleks dan
                sulit di-maintain.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Conclusion -->
      <div
        class="mt-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white shadow-xl"
      >
        <h2 class="mb-4 text-3xl font-bold">🎯 Kesimpulan</h2>
        <div class="space-y-4 text-lg">
          <p>
            <strong>Compound Component Pattern</strong> adalah pilihan yang lebih baik untuk
            component library modern karena:
          </p>
          <ul class="ml-6 list-disc space-y-2">
            <li>Memberikan fleksibilitas maksimal tanpa props explosion</li>
            <li>Code lebih maintainable dan testable</li>
            <li>Developer experience yang lebih baik</li>
            <li>Mengikuti industry best practices (Radix UI, Headless UI, shadcn)</li>
            <li>Mudah untuk extend tanpa breaking changes</li>
          </ul>
          <p class="mt-4 rounded-lg bg-white/10 p-4">
            <strong>Props-based pattern</strong> hanya cocok untuk component yang sangat sederhana
            dengan use case terbatas. Untuk component complex seperti Modal, Dropdown, Tabs,
            dll—<strong>Compound Component Pattern adalah pilihan terbaik</strong>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
