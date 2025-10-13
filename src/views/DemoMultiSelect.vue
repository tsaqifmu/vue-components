<script setup lang="ts">
import {
  MultiSelectBadges,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectRoot,
  MultiSelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/select'
import { ref } from 'vue'

// Demo data
const selectedLanguages = ref<Array<string | number>>(['english', 'malay'])
const selectedCountries = ref<Array<string | number>>([])
const selectedFrameworks = ref<Array<string | number>>([])

// Helper to display selected values
const getDisplayValue = (values: Array<string | number>) => {
  return values.length > 0 ? JSON.stringify(values, null, 2) : '[]'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-gray-900">Multi Select Component</h1>
        <p class="text-gray-600">
          Multi-select dengan badge yang bisa dihapus dengan klik tombol X pada badge
        </p>
      </div>

      <!-- Example 1: Languages -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-gray-900">1. Languages</h2>
          <p class="text-sm text-gray-600">
            Pilih bahasa yang Anda kuasai. Selected values akan tampil sebagai badge.
          </p>
        </div>

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
              <MultiSelectItem value="portugese" label="Portugese">Portugese</MultiSelectItem>
              <MultiSelectItem value="japanese" label="Japanese">Japanese</MultiSelectItem>
              <MultiSelectItem value="chinese" label="Chinese">Chinese</MultiSelectItem>
              <MultiSelectItem value="spanish" label="Spanish">Spanish</MultiSelectItem>
              <MultiSelectItem value="french" label="French">French</MultiSelectItem>
              <MultiSelectItem value="german" label="German">German</MultiSelectItem>
            </MultiSelectContent>
          </MultiSelectRoot>
        </div>

        <div class="rounded-md bg-gray-50 p-4">
          <p class="mb-1 text-xs font-medium text-gray-700">Selected Value:</p>
          <pre class="text-xs text-gray-600">{{ getDisplayValue(selectedLanguages) }}</pre>
        </div>
      </div>

      <!-- Example 2: Countries -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-gray-900">2. Countries (with emoji)</h2>
          <p class="text-sm text-gray-600">
            Multi select dengan emoji flags. Klik badge X untuk menghapus.
          </p>
        </div>

        <div class="space-y-3">
          <MultiSelectRoot v-model="selectedCountries" placeholder="Add Countries">
            <!-- Badge list di atas -->
            <MultiSelectBadges :max-display="6" />

            <!-- Separator jika ada selection -->
            <hr v-if="selectedCountries.length > 0" class="my-3 border-gray-200" />

            <!-- Select trigger di bawah -->
            <MultiSelectTrigger class="w-full" />

            <!-- Dropdown content -->
            <MultiSelectContent>
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <MultiSelectItem value="id" label="🇮🇩 Indonesia">🇮🇩 Indonesia</MultiSelectItem>
                <MultiSelectItem value="sg" label="🇸🇬 Singapore">🇸🇬 Singapore</MultiSelectItem>
                <MultiSelectItem value="my" label="🇲🇾 Malaysia">🇲🇾 Malaysia</MultiSelectItem>
                <MultiSelectItem value="jp" label="🇯🇵 Japan">🇯🇵 Japan</MultiSelectItem>
                <MultiSelectItem value="kr" label="🇰🇷 South Korea">🇰🇷 South Korea</MultiSelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <MultiSelectItem value="gb" label="🇬🇧 United Kingdom"
                  >🇬🇧 United Kingdom</MultiSelectItem
                >
                <MultiSelectItem value="fr" label="🇫🇷 France">🇫🇷 France</MultiSelectItem>
                <MultiSelectItem value="de" label="🇩🇪 Germany">🇩🇪 Germany</MultiSelectItem>
                <MultiSelectItem value="es" label="🇪🇸 Spain">🇪🇸 Spain</MultiSelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <MultiSelectItem value="us" label="🇺🇸 United States"
                  >🇺🇸 United States</MultiSelectItem
                >
                <MultiSelectItem value="ca" label="🇨🇦 Canada">🇨🇦 Canada</MultiSelectItem>
                <MultiSelectItem value="br" label="🇧🇷 Brazil">🇧🇷 Brazil</MultiSelectItem>
                <MultiSelectItem value="mx" label="🇲🇽 Mexico">🇲🇽 Mexico</MultiSelectItem>
              </SelectGroup>
            </MultiSelectContent>
          </MultiSelectRoot>
        </div>

        <div class="rounded-md bg-gray-50 p-4">
          <p class="mb-1 text-xs font-medium text-gray-700">Selected Value:</p>
          <pre class="text-xs text-gray-600">{{ getDisplayValue(selectedCountries) }}</pre>
        </div>
      </div>

      <!-- Example 3: Frameworks -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-gray-900">3. Frameworks (max display 3)</h2>
          <p class="text-sm text-gray-600">Jika lebih dari 3 item dipilih, akan tampil "+N more"</p>
        </div>

        <div class="space-y-3">
          <MultiSelectRoot v-model="selectedFrameworks" placeholder="Add Frameworks">
            <!-- Badge list di atas dengan max 3 -->
            <MultiSelectBadges :max-display="3" />

            <!-- Separator jika ada selection -->
            <hr v-if="selectedFrameworks.length > 0" class="my-3 border-gray-200" />

            <!-- Select trigger di bawah -->
            <MultiSelectTrigger class="w-full" />

            <!-- Dropdown content -->
            <MultiSelectContent>
              <MultiSelectItem value="vue" label="Vue.js">Vue.js</MultiSelectItem>
              <MultiSelectItem value="react" label="React">React</MultiSelectItem>
              <MultiSelectItem value="angular" label="Angular">Angular</MultiSelectItem>
              <MultiSelectItem value="svelte" label="Svelte">Svelte</MultiSelectItem>
              <MultiSelectItem value="solid" label="Solid.js">Solid.js</MultiSelectItem>
              <MultiSelectItem value="next" label="Next.js">Next.js</MultiSelectItem>
              <MultiSelectItem value="nuxt" label="Nuxt.js">Nuxt.js</MultiSelectItem>
              <MultiSelectItem value="remix" label="Remix">Remix</MultiSelectItem>
            </MultiSelectContent>
          </MultiSelectRoot>
        </div>

        <div class="rounded-md bg-gray-50 p-4">
          <p class="mb-1 text-xs font-medium text-gray-700">Selected Value:</p>
          <pre class="text-xs text-gray-600">{{ getDisplayValue(selectedFrameworks) }}</pre>
        </div>
      </div>

      <!-- Features -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900">✨ Features</h2>
        <ul class="space-y-2 text-sm text-gray-600">
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Multiple selection dengan visual feedback (checkmark)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Badges terpisah di atas select trigger</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Click X pada badge untuk remove item</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Toggle behavior: click item untuk select/deselect</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Dropdown tidak auto close setelah selection</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Max display: tampilkan "+N more" jika items terlalu banyak</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Support untuk groups, labels, dan separators</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Full TypeScript support dengan v-model Array</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-600">✓</span>
            <span>Flexible composition: arrange badges dan trigger sesuai kebutuhan</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
