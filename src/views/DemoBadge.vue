<script setup lang="ts">
import { BadgeClose, BadgeIcon, BadgeRoot } from '@/components/badge'
import { ref } from 'vue'

// For dismissible badges demo
const dismissedBadges = ref<string[]>([])
const tags = ref(['Vue.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Pinia'])

const handleDismiss = (badgeName: string) => {
  dismissedBadges.value.push(badgeName)
}

const resetDismissed = () => {
  dismissedBadges.value = []
}

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((t) => t !== tag)
}

const resetTags = () => {
  tags.value = ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Pinia']
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-6xl space-y-12">
      <!-- Header -->
      <div>
        <h1 class="mb-2 text-3xl font-bold text-gray-900">Badge Component Demo</h1>
        <p class="text-gray-600">
          Compound component pattern inspired by shadcn/ui - Badges, Tags, and Chips
        </p>
      </div>

      <!-- Solid Variants -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Solid Variants</h2>
          <p class="text-sm text-gray-600">
            Badges with solid background colors for strong visual emphasis
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-wrap items-center gap-3">
            <BadgeRoot variant="default">Default</BadgeRoot>
            <BadgeRoot variant="secondary">Secondary</BadgeRoot>
            <BadgeRoot variant="destructive">Destructive</BadgeRoot>
            <BadgeRoot variant="outline">Outline</BadgeRoot>
            <BadgeRoot variant="success">Success</BadgeRoot>
            <BadgeRoot variant="warning">Warning</BadgeRoot>
            <BadgeRoot variant="info">Info</BadgeRoot>
          </div>
        </div>
      </section>

      <!-- Soft/Light Variants -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Soft/Light Variants</h2>
          <p class="text-sm text-gray-600">
            Badges with lighter backgrounds for subtle visual indication
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-wrap items-center gap-3">
            <BadgeRoot variant="positive">Positive</BadgeRoot>
            <BadgeRoot variant="negative">Negative</BadgeRoot>
            <BadgeRoot variant="progress">Progress</BadgeRoot>
            <BadgeRoot variant="caution">Caution</BadgeRoot>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Sizes</h2>
          <p class="text-sm text-gray-600">Available in three sizes: small, default, and large</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <BadgeRoot size="sm">Small</BadgeRoot>
              <span class="text-xs text-gray-500">size="sm"</span>
            </div>
            <div class="flex items-center gap-2">
              <BadgeRoot size="default">Default</BadgeRoot>
              <span class="text-xs text-gray-500">size="default"</span>
            </div>
            <div class="flex items-center gap-2">
              <BadgeRoot size="lg">Large</BadgeRoot>
              <span class="text-xs text-gray-500">size="lg"</span>
            </div>
          </div>

          <!-- Sizes with different variants -->
          <div class="mt-6 space-y-3">
            <p class="text-sm font-medium text-gray-700">All sizes with secondary variant:</p>
            <div class="flex flex-wrap items-center gap-3">
              <BadgeRoot variant="secondary" size="sm">Small Secondary</BadgeRoot>
              <BadgeRoot variant="secondary" size="default">Default Secondary</BadgeRoot>
              <BadgeRoot variant="secondary" size="lg">Large Secondary</BadgeRoot>
            </div>
          </div>
        </div>
      </section>

      <!-- With Icons -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">With Icons</h2>
          <p class="text-sm text-gray-600">Badges can include icons at start or end position</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <!-- Icon at start -->
          <div class="mb-6">
            <p class="mb-3 text-sm font-medium text-gray-700">Icon at start (default):</p>
            <div class="flex flex-wrap items-center gap-3">
              <BadgeRoot variant="success">
                <BadgeIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </BadgeIcon>
                Verified
              </BadgeRoot>

              <BadgeRoot variant="positive">
                <BadgeIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </BadgeIcon>
                Completed
              </BadgeRoot>

              <BadgeRoot variant="negative">
                <BadgeIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </BadgeIcon>
                Error
              </BadgeRoot>

              <BadgeRoot variant="progress">
                <BadgeIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </BadgeIcon>
                In Progress
              </BadgeRoot>
            </div>
          </div>

          <!-- Icon at end -->
          <div>
            <p class="mb-3 text-sm font-medium text-gray-700">Icon at end:</p>
            <div class="flex flex-wrap items-center gap-3">
              <BadgeRoot variant="secondary">
                New
                <BadgeIcon position="end">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </BadgeIcon>
              </BadgeRoot>

              <BadgeRoot variant="info">
                External Link
                <BadgeIcon position="end">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </BadgeIcon>
              </BadgeRoot>
            </div>
          </div>
        </div>
      </section>

      <!-- Dismissible Badges -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Dismissible Badges</h2>
          <p class="text-sm text-gray-600">
            Badges that can be dismissed/closed. Uses compound component pattern with BadgeClose.
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="mb-4 flex flex-wrap items-center gap-3">
            <BadgeRoot
              v-if="!dismissedBadges.includes('tag1')"
              variant="secondary"
              dismissible
              @dismiss="handleDismiss('tag1')"
            >
              Removable Tag
              <BadgeClose />
            </BadgeRoot>

            <BadgeRoot
              v-if="!dismissedBadges.includes('tag2')"
              variant="positive"
              dismissible
              @dismiss="handleDismiss('tag2')"
            >
              Active Filter
              <BadgeClose />
            </BadgeRoot>

            <BadgeRoot
              v-if="!dismissedBadges.includes('tag3')"
              variant="progress"
              dismissible
              @dismiss="handleDismiss('tag3')"
            >
              Selected Item
              <BadgeClose />
            </BadgeRoot>

            <BadgeRoot
              v-if="!dismissedBadges.includes('tag4')"
              variant="caution"
              dismissible
              @dismiss="handleDismiss('tag4')"
            >
              Pending Review
              <BadgeClose />
            </BadgeRoot>
          </div>

          <div class="flex items-center gap-4">
            <p class="text-sm text-gray-500">
              Dismissed: {{ dismissedBadges.length > 0 ? dismissedBadges.join(', ') : 'None' }}
            </p>
            <button
              v-if="dismissedBadges.length > 0"
              @click="resetDismissed"
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <!-- Complete Example: Icon + Dismissible -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">
            Complete Example (Icon + Dismissible)
          </h2>
          <p class="text-sm text-gray-600">
            Combining icons with dismissible functionality for tag selection
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <p class="mb-3 text-sm font-medium text-gray-700">Selected Technologies:</p>
          <div class="mb-4 flex flex-wrap items-center gap-3">
            <BadgeRoot
              v-for="tag in tags"
              :key="tag"
              variant="secondary"
              dismissible
              @dismiss="removeTag(tag)"
            >
              <BadgeIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
              </BadgeIcon>
              {{ tag }}
              <BadgeClose />
            </BadgeRoot>

            <span v-if="tags.length === 0" class="text-sm text-gray-400 italic">
              No tags selected
            </span>
          </div>

          <button
            v-if="tags.length < 5"
            @click="resetTags"
            class="rounded bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
          >
            Reset Tags
          </button>
        </div>
      </section>

      <!-- Status Indicators -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Status Indicators</h2>
          <p class="text-sm text-gray-600">Common use cases for status indication</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <!-- Order Status -->
          <div class="mb-6">
            <p class="mb-3 text-sm font-medium text-gray-700">Order Status:</p>
            <div class="flex flex-wrap items-center gap-3">
              <BadgeRoot variant="secondary">Draft</BadgeRoot>
              <BadgeRoot variant="progress">Processing</BadgeRoot>
              <BadgeRoot variant="caution">Pending Payment</BadgeRoot>
              <BadgeRoot variant="info">Shipped</BadgeRoot>
              <BadgeRoot variant="positive">Delivered</BadgeRoot>
              <BadgeRoot variant="negative">Cancelled</BadgeRoot>
            </div>
          </div>

          <!-- User Roles -->
          <div class="mb-6">
            <p class="mb-3 text-sm font-medium text-gray-700">User Roles:</p>
            <div class="flex flex-wrap items-center gap-3">
              <BadgeRoot variant="default">Admin</BadgeRoot>
              <BadgeRoot variant="secondary">Member</BadgeRoot>
              <BadgeRoot variant="outline">Guest</BadgeRoot>
              <BadgeRoot variant="warning">Moderator</BadgeRoot>
            </div>
          </div>

          <!-- Priority Levels -->
          <div>
            <p class="mb-3 text-sm font-medium text-gray-700">Priority Levels:</p>
            <div class="flex flex-wrap items-center gap-3">
              <BadgeRoot variant="secondary">Low</BadgeRoot>
              <BadgeRoot variant="caution">Medium</BadgeRoot>
              <BadgeRoot variant="warning">High</BadgeRoot>
              <BadgeRoot variant="destructive">Critical</BadgeRoot>
            </div>
          </div>
        </div>
      </section>

      <!-- In Context Example -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">In Context Example</h2>
          <p class="text-sm text-gray-600">Badges used in real-world UI scenarios</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <!-- Product Card -->
          <div class="mb-6 max-w-sm rounded-lg border border-gray-200 p-4">
            <div class="mb-2 flex items-start justify-between">
              <h3 class="font-semibold text-gray-900">Premium Plan</h3>
              <BadgeRoot variant="success" size="sm">Popular</BadgeRoot>
            </div>
            <p class="mb-3 text-sm text-gray-600">
              Access to all features including priority support
            </p>
            <div class="flex items-center gap-2">
              <BadgeRoot variant="positive" size="sm">
                <BadgeIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </BadgeIcon>
                Active
              </BadgeRoot>
              <BadgeRoot variant="secondary" size="sm">Monthly</BadgeRoot>
            </div>
          </div>

          <!-- Notification Item -->
          <div class="flex max-w-md items-start gap-3 rounded-lg border border-gray-200 p-4">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <div class="mb-1 flex items-center gap-2">
                <h4 class="font-medium text-gray-900">New Message</h4>
                <BadgeRoot variant="destructive" size="sm">3</BadgeRoot>
              </div>
              <p class="text-sm text-gray-600">You have 3 unread messages from your team</p>
              <p class="mt-1 text-xs text-gray-400">5 minutes ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
