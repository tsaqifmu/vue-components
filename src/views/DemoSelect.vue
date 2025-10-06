<template>
  <div class="bg-surface-secondary min-h-screen p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <h1 class="text-text-title text-3xl font-bold">Select Component Demo</h1>

      <!-- Basic Select -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Basic Select</h2>
        <SelectRoot v-model="selectedCountry">
          <SelectTrigger class="w-[280px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id" label="🇮🇩 Indonesia">🇮🇩 Indonesia</SelectItem>
            <SelectItem value="us" label="🇺🇸 United States">🇺🇸 United States</SelectItem>
            <SelectItem value="sg" label="🇸🇬 Singapore">🇸🇬 Singapore</SelectItem>
            <SelectItem value="jp" label="🇯🇵 Japan">🇯🇵 Japan</SelectItem>
            <SelectItem value="kr" label="🇰🇷 South Korea">🇰🇷 South Korea</SelectItem>
          </SelectContent>
        </SelectRoot>
        <p class="text-sm text-gray-600">Selected: {{ selectedCountry || 'none' }}</p>
      </div>

      <!-- With Groups and Labels -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">With Groups and Labels</h2>
        <SelectRoot v-model="selectedTimezone">
          <SelectTrigger class="w-[300px]">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Asia Pacific</SelectLabel>
              <SelectItem value="asia/jakarta" label="Jakarta (GMT+7)">Jakarta (GMT+7)</SelectItem>
              <SelectItem value="asia/singapore" label="Singapore (GMT+8)"
                >Singapore (GMT+8)</SelectItem
              >
              <SelectItem value="asia/tokyo" label="Tokyo (GMT+9)">Tokyo (GMT+9)</SelectItem>
              <SelectItem value="asia/seoul" label="Seoul (GMT+9)">Seoul (GMT+9)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>America</SelectLabel>
              <SelectItem value="america/new_york" label="New York (GMT-5)"
                >New York (GMT-5)</SelectItem
              >
              <SelectItem value="america/chicago" label="Chicago (GMT-6)"
                >Chicago (GMT-6)</SelectItem
              >
              <SelectItem value="america/los_angeles" label="Los Angeles (GMT-8)"
                >Los Angeles (GMT-8)</SelectItem
              >
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="europe/london" label="London (GMT+0)">London (GMT+0)</SelectItem>
              <SelectItem value="europe/paris" label="Paris (GMT+1)">Paris (GMT+1)</SelectItem>
              <SelectItem value="europe/berlin" label="Berlin (GMT+1)">Berlin (GMT+1)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
        <p class="text-sm text-gray-600">Selected: {{ selectedTimezone || 'none' }}</p>
      </div>

      <!-- Different Sizes -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Different Sizes</h2>
        <div class="flex items-start gap-4">
          <div>
            <p class="mb-2 text-sm text-gray-600">Small</p>
            <SelectRoot v-model="size1">
              <SelectTrigger size="sm" class="w-[180px]">
                <SelectValue placeholder="Small" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1" label="Option 1">Option 1</SelectItem>
                <SelectItem value="2" label="Option 2">Option 2</SelectItem>
                <SelectItem value="3" label="Option 3">Option 3</SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Default</p>
            <SelectRoot v-model="size2">
              <SelectTrigger size="default" class="w-[180px]">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1" label="Option 1">Option 1</SelectItem>
                <SelectItem value="2" label="Option 2">Option 2</SelectItem>
                <SelectItem value="3" label="Option 3">Option 3</SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Large</p>
            <SelectRoot v-model="size3">
              <SelectTrigger size="lg" class="w-[180px]">
                <SelectValue placeholder="Large" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1" label="Option 1">Option 1</SelectItem>
                <SelectItem value="2" label="Option 2">Option 2</SelectItem>
                <SelectItem value="3" label="Option 3">Option 3</SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>
        </div>
      </div>

      <!-- With Disabled Options -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">With Disabled Options</h2>
        <SelectRoot v-model="selectedPriority">
          <SelectTrigger class="w-[200px]">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low" label="Low Priority">Low Priority</SelectItem>
            <SelectItem value="medium" label="Medium Priority">Medium Priority</SelectItem>
            <SelectItem value="high" label="High Priority">High Priority</SelectItem>
            <SelectItem value="urgent" label="Urgent (Disabled)" disabled
              >Urgent (Disabled)</SelectItem
            >
          </SelectContent>
        </SelectRoot>
        <p class="text-sm text-gray-600">Selected: {{ selectedPriority || 'none' }}</p>
      </div>

      <!-- Disabled Select -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Disabled Select</h2>
        <SelectRoot v-model="disabledValue">
          <SelectTrigger class="w-[200px]" disabled>
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" label="Option 1">Option 1</SelectItem>
            <SelectItem value="2" label="Option 2">Option 2</SelectItem>
          </SelectContent>
        </SelectRoot>
      </div>

      <!-- Multiple Selects (Context Isolation Test) -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">
          Multiple Selects (Context Isolation Test)
        </h2>
        <div class="flex gap-4">
          <SelectRoot v-model="multi1">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a" label="Option A">Option A</SelectItem>
              <SelectItem value="b" label="Option B">Option B</SelectItem>
              <SelectItem value="c" label="Option C">Option C</SelectItem>
            </SelectContent>
          </SelectRoot>

          <SelectRoot v-model="multi2">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select 2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="x" label="Option X">Option X</SelectItem>
              <SelectItem value="y" label="Option Y">Option Y</SelectItem>
              <SelectItem value="z" label="Option Z">Option Z</SelectItem>
            </SelectContent>
          </SelectRoot>

          <SelectRoot v-model="multi3">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select 3" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1" label="Option 1">Option 1</SelectItem>
              <SelectItem value="2" label="Option 2">Option 2</SelectItem>
              <SelectItem value="3" label="Option 3">Option 3</SelectItem>
            </SelectContent>
          </SelectRoot>
        </div>
        <p class="text-sm text-gray-600">
          Selected: {{ multi1 || 'none' }}, {{ multi2 || 'none' }}, {{ multi3 || 'none' }}
        </p>
      </div>

      <!-- Status Select Example -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Status Select Example</h2>
        <SelectRoot v-model="selectedStatus">
          <SelectTrigger class="w-[200px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo" label="To Do">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-gray-400"></span>
                <span>To Do</span>
              </div>
            </SelectItem>
            <SelectItem value="in-progress" label="In Progress">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>In Progress</span>
              </div>
            </SelectItem>
            <SelectItem value="review" label="In Review">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                <span>In Review</span>
              </div>
            </SelectItem>
            <SelectItem value="done" label="Done">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Done</span>
              </div>
            </SelectItem>
          </SelectContent>
        </SelectRoot>
        <p class="text-sm text-gray-600">Selected: {{ selectedStatus || 'none' }}</p>
      </div>

      <!-- Long List with Scroll -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Long List with Scroll</h2>
        <SelectRoot v-model="selectedNumber">
          <SelectTrigger class="w-[200px]">
            <SelectValue placeholder="Select a number" />
          </SelectTrigger>
          <SelectContent class="max-h-60">
            <SelectItem v-for="i in 50" :key="i" :value="String(i)" :label="`Number ${i}`">
              Number {{ i }}
            </SelectItem>
          </SelectContent>
        </SelectRoot>
        <p class="text-sm text-gray-600">Selected: {{ selectedNumber || 'none' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { ref } from 'vue'

const selectedCountry = ref<string>()
const selectedTimezone = ref<string>('asia/jakarta')
const selectedPriority = ref<string>()
const selectedStatus = ref<string>()
const selectedNumber = ref<string>()
const disabledValue = ref<string>()

const size1 = ref<string>()
const size2 = ref<string>()
const size3 = ref<string>()

const multi1 = ref<string>()
const multi2 = ref<string>()
const multi3 = ref<string>()
</script>
