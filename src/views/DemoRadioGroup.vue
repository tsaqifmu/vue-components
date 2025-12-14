<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot } from '@/components/radio-group'
import DevelopmentStatus from '@/components/ui/DevelopmentStatus.vue'
import { ref } from 'vue'

// For controlled example
const selectedPlan = ref('comfortable')
const selectedPayment = ref('card')
const selectedSize = ref('medium')
const selectedNotification = ref('all')
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-6xl space-y-12">
      <!-- Header -->
      <div>
        <h1 class="mb-2 text-3xl font-bold text-gray-900">RadioGroup Component Demo</h1>
        <p class="text-gray-600">Compound component pattern inspired by shadcn/ui</p>
      </div>

      <!-- Basic Example -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Basic Example</h2>
          <p class="text-sm text-gray-600">Simple radio group with uncontrolled mode</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <DevelopmentStatus status="stable">
            <RadioGroupRoot default-value="comfortable">
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="default" />
                <span class="text-sm font-medium text-gray-900">Default</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="comfortable" />
                <span class="text-sm font-medium text-gray-900">Comfortable</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="compact" />
                <span class="text-sm font-medium text-gray-900">Compact</span>
              </label>
            </RadioGroupRoot>
          </DevelopmentStatus>
        </div>
      </section>

      <!-- Controlled Mode Example -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Controlled Mode</h2>
          <p class="text-sm text-gray-600">Using v-model to control the selected value</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="mb-4 rounded bg-blue-50 p-3">
            <p class="text-sm text-gray-700">
              Selected: <span class="font-mono font-semibold">{{ selectedPlan }}</span>
            </p>
          </div>

          <RadioGroupRoot v-model="selectedPlan">
            <label class="flex cursor-pointer items-center gap-2">
              <RadioGroupItem value="default" />
              <span class="text-sm font-medium text-gray-900">Default</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <RadioGroupItem value="comfortable" />
              <span class="text-sm font-medium text-gray-900">Comfortable</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <RadioGroupItem value="compact" />
              <span class="text-sm font-medium text-gray-900">Compact</span>
            </label>
          </RadioGroupRoot>

          <div class="mt-4 flex gap-2">
            <button
              @click="selectedPlan = 'default'"
              class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Set Default
            </button>
            <button
              @click="selectedPlan = 'comfortable'"
              class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Set Comfortable
            </button>
            <button
              @click="selectedPlan = 'compact'"
              class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Set Compact
            </button>
          </div>
        </div>
      </section>

      <!-- Horizontal Orientation -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Horizontal Orientation</h2>
          <p class="text-sm text-gray-600">Radio group with horizontal layout</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <DevelopmentStatus status="stable">
            <RadioGroupRoot v-model="selectedSize" orientation="horizontal">
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="small" />
                <span class="text-sm font-medium text-gray-900">Small</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="medium" />
                <span class="text-sm font-medium text-gray-900">Medium</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="large" />
                <span class="text-sm font-medium text-gray-900">Large</span>
              </label>
            </RadioGroupRoot>
          </DevelopmentStatus>
          <p class="mt-3 text-sm text-gray-500">Selected: {{ selectedSize }}</p>
        </div>
      </section>

      <!-- With Disabled Items -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">With Disabled Items</h2>
          <p class="text-sm text-gray-600">Some items can be disabled</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <DevelopmentStatus status="stable">
            <RadioGroupRoot v-model="selectedPayment">
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="card" />
                <span class="text-sm font-medium text-gray-900">Credit Card</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="paypal" />
                <span class="text-sm font-medium text-gray-900">PayPal</span>
              </label>
              <label class="flex cursor-not-allowed items-center gap-2">
                <RadioGroupItem value="crypto" disabled />
                <span class="text-sm font-medium text-gray-400">
                  Cryptocurrency (Coming Soon)
                </span>
              </label>
              <label class="flex cursor-not-allowed items-center gap-2">
                <RadioGroupItem value="bank" disabled />
                <span class="text-sm font-medium text-gray-400"> Bank Transfer (Unavailable) </span>
              </label>
            </RadioGroupRoot>
          </DevelopmentStatus>
          <p class="mt-3 text-sm text-gray-500">Selected: {{ selectedPayment }}</p>
        </div>
      </section>

      <!-- Form Example -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">In a Form</h2>
          <p class="text-sm text-gray-600">Radio group used in a form context</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <form class="space-y-6" @submit.prevent>
            <div>
              <label class="mb-3 block text-sm font-semibold text-gray-900">
                Notification Preferences
              </label>
              <RadioGroupRoot v-model="selectedNotification">
                <label class="flex cursor-pointer items-start gap-2">
                  <RadioGroupItem value="all" class="mt-0.5" />
                  <div>
                    <span class="text-sm font-medium text-gray-900">All notifications</span>
                    <p class="text-sm text-gray-500">Get notified about all activities</p>
                  </div>
                </label>
                <label class="flex cursor-pointer items-start gap-2">
                  <RadioGroupItem value="important" class="mt-0.5" />
                  <div>
                    <span class="text-sm font-medium text-gray-900">Important only</span>
                    <p class="text-sm text-gray-500">Only get notified about important updates</p>
                  </div>
                </label>
                <label class="flex cursor-pointer items-start gap-2">
                  <RadioGroupItem value="none" class="mt-0.5" />
                  <div>
                    <span class="text-sm font-medium text-gray-900">No notifications</span>
                    <p class="text-sm text-gray-500">Turn off all notifications</p>
                  </div>
                </label>
              </RadioGroupRoot>
            </div>

            <button
              type="submit"
              class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </section>

      <!-- Disabled Group -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Disabled Group</h2>
          <p class="text-sm text-gray-600">Entire radio group can be disabled</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <DevelopmentStatus status="stable">
            <RadioGroupRoot default-value="option1" disabled>
              <label class="flex cursor-not-allowed items-center gap-2">
                <RadioGroupItem value="option1" />
                <span class="text-sm font-medium text-gray-400">Option 1</span>
              </label>
              <label class="flex cursor-not-allowed items-center gap-2">
                <RadioGroupItem value="option2" />
                <span class="text-sm font-medium text-gray-400">Option 2</span>
              </label>
              <label class="flex cursor-not-allowed items-center gap-2">
                <RadioGroupItem value="option3" />
                <span class="text-sm font-medium text-gray-400">Option 3</span>
              </label>
            </RadioGroupRoot>
          </DevelopmentStatus>
          <p class="mt-3 text-sm text-gray-500">This entire group is disabled</p>
        </div>
      </section>
    </div>
  </div>
</template>
