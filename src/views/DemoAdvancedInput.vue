<script setup lang="ts">
import FormInput from '@/components/form-input'
import { ref } from 'vue'

// Form data
const username = ref('')
const password = ref('')
const email = ref('')
const phone = ref('')
const search = ref('')
const description = ref('')
const channelName = ref('')
const errorField = ref('')

// States
const showError = ref(false)
const isDisabled = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <h1 class="mb-8 text-3xl font-bold text-gray-900">Advanced Input Components Demo</h1>

      <!-- Current Values Display -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold text-gray-800">Current Values</h2>
        <div class="space-y-2 font-mono text-sm">
          <div>Username: {{ username || '(empty)' }}</div>
          <div>Password: {{ password ? '•'.repeat(password.length) : '(empty)' }}</div>
          <div>Email: {{ email || '(empty)' }}</div>
          <div>Phone: {{ phone || '(empty)' }}</div>
          <div>Search: {{ search || '(empty)' }}</div>
          <div>Description: {{ description || '(empty)' }} ({{ description.length }}/100)</div>
          <div>Channel Name: {{ channelName || '(empty)' }}</div>
          <div>Error Field: {{ errorField || '(empty)' }} ({{ errorField.length }}/50)</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold text-gray-800">Controls</h2>
        <div class="flex gap-4">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="showError" class="rounded" />
            <span>Show Error State</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="isDisabled" class="rounded" />
            <span>Disabled State</span>
          </label>
        </div>
      </div>

      <!-- Basic Text Input with Clear -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Basic Text Input with Clear</h2>
        <div class="space-y-2">
          <FormInput.Label html-for="username">Username</FormInput.Label>
          <FormInput
            v-model="username"
            id="username"
            placeholder="Enter your username"
            :clearable="true"
            :disabled="isDisabled"
            :error="showError"
          />
          <FormInput.ErrorMessage
            v-if="showError"
            id="username-error"
            message="Username is required"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Password Input</h2>
        <div class="space-y-2">
          <FormInput.Label html-for="password" :required="true">Password</FormInput.Label>
          <FormInput
            v-model="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            :clearable="true"
            :disabled="isDisabled"
            :error="showError"
          />
          <FormInput.ErrorMessage
            v-if="showError"
            id="password-error"
            message="Password must be at least 8 characters"
          />
        </div>
      </div>

      <!-- Number Input -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Number Input</h2>
        <div class="space-y-2">
          <FormInput.Label html-for="phone">Phone Number</FormInput.Label>
          <FormInput
            v-model="phone"
            id="phone"
            type="number"
            placeholder="Enter phone number (numbers only)"
            :clearable="false"
            :disabled="isDisabled"
          />
        </div>
      </div>

      <!-- Input with Character Counter -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Input with Character Counter</h2>
        <div class="space-y-2">
          <FormInput.Label html-for="description">Description</FormInput.Label>
          <FormInput
            v-model="description"
            id="description"
            placeholder="Enter a description"
            maxlength="100"
            :clearable="true"
            :disabled="isDisabled"
            :error="showError"
          />
          <FormInput.ErrorMessage
            v-if="showError"
            id="description-error"
            message="Description is too long"
          />
        </div>
      </div>

      <!-- Input with Suffix Icon -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Input with Suffix Icon</h2>
        <div class="space-y-2">
          <FormInput.Label html-for="email">Email Address</FormInput.Label>
          <FormInput
            v-model="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            :clearable="true"
            :disabled="isDisabled"
          >
            <template #suffix-icon>
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </template>
          </FormInput>
        </div>
      </div>

      <!-- Input with Append Button -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Input with Append Button</h2>
        <div class="space-y-2">
          <FormInput.Label html-for="search">Search</FormInput.Label>
          <FormInput
            v-model="search"
            id="search"
            placeholder="Enter search term"
            :disabled="isDisabled"
          >
            <template #append-button>
              <span>Search</span>
            </template>
          </FormInput>
        </div>
      </div>

      <!-- Input with Append Icon Button -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Input with Append Icon Button</h2>
        <div class="space-y-2">
          <FormInput.Label html-for="channelName">Channel Name</FormInput.Label>
          <FormInput
            v-model="channelName"
            id="channelName"
            placeholder="Enter channel name"
            :clearable="true"
            :disabled="isDisabled"
          >
            <template #append-button-icon>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </template>
          </FormInput>
        </div>
      </div>

      <!-- Standalone Input Field without Label -->
      <div class="space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">Standalone Input Field (without Label)</h2>
        <div class="space-y-2">
          <FormInput
            v-model="errorField"
            id="errorField"
            placeholder="This is a standalone input field"
            :clearable="true"
            :error="showError"
            :disabled="isDisabled"
            maxlength="50"
          />
          <FormInput.ErrorMessage v-if="showError" message="This field has an error" />
        </div>
      </div>
    </div>
  </div>
</template>
