<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/tabs'
import { ref } from 'vue'

// For controlled example
const controlledTab = ref('account')
const compactTab = ref('all')
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-6xl space-y-12">
      <!-- Header -->
      <div>
        <h1 class="mb-2 text-3xl font-bold text-gray-900">Tabs Component Demo</h1>
        <p class="text-gray-600">Compound component pattern inspired by shadcn/ui</p>
      </div>

      <!-- Basic Example -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Basic Example</h2>
          <p class="text-sm text-gray-600">Simple tabs with uncontrolled mode</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <TabsRoot default-value="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Overview</h3>
                <p class="text-gray-600">
                  This is the overview tab content. You can put any content here including forms,
                  charts, or other components.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Analytics</h3>
                <p class="text-gray-600">
                  Analytics data and insights would be displayed here. This could include charts,
                  graphs, and key metrics.
                </p>
                <div class="mt-4 grid grid-cols-3 gap-4">
                  <div class="rounded-lg bg-blue-50 p-4">
                    <p class="text-sm text-gray-600">Total Views</p>
                    <p class="text-2xl font-bold text-gray-900">12,543</p>
                  </div>
                  <div class="rounded-lg bg-green-50 p-4">
                    <p class="text-sm text-gray-600">Active Users</p>
                    <p class="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <div class="rounded-lg bg-purple-50 p-4">
                    <p class="text-sm text-gray-600">Conversion</p>
                    <p class="text-2xl font-bold text-gray-900">23%</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Reports</h3>
                <p class="text-gray-600">Generate and view reports from your data.</p>
                <ul class="mt-4 space-y-2">
                  <li class="flex items-center justify-between rounded bg-gray-50 p-3">
                    <span class="text-gray-900">Monthly Report - October</span>
                    <button class="text-sm text-blue-600 hover:underline">Download</button>
                  </li>
                  <li class="flex items-center justify-between rounded bg-gray-50 p-3">
                    <span class="text-gray-900">Quarterly Report - Q3</span>
                    <button class="text-sm text-blue-600 hover:underline">Download</button>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
                <p class="text-gray-600">Manage your notification preferences.</p>
                <div class="mt-4 space-y-3">
                  <label
                    class="flex cursor-pointer items-center justify-between rounded bg-gray-50 p-3"
                  >
                    <span class="text-gray-900">Email notifications</span>
                    <input type="checkbox" checked class="h-4 w-4" />
                  </label>
                  <label
                    class="flex cursor-pointer items-center justify-between rounded bg-gray-50 p-3"
                  >
                    <span class="text-gray-900">Push notifications</span>
                    <input type="checkbox" class="h-4 w-4" />
                  </label>
                  <label
                    class="flex cursor-pointer items-center justify-between rounded bg-gray-50 p-3"
                  >
                    <span class="text-gray-900">SMS notifications</span>
                    <input type="checkbox" class="h-4 w-4" />
                  </label>
                </div>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </section>

      <!-- Controlled Mode Example -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Controlled Mode</h2>
          <p class="text-sm text-gray-600">Using v-model to control the active tab</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="mb-4 rounded bg-blue-50 p-3">
            <p class="text-sm text-gray-700">
              Active tab: <span class="font-mono font-semibold">{{ controlledTab }}</span>
            </p>
          </div>

          <TabsRoot v-model="controlledTab">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <div class="space-y-4 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Account Settings</h3>
                <div class="space-y-3">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value="john_doe"
                      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value="john@example.com"
                      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="password">
              <div class="space-y-4 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Change Password</h3>
                <div class="space-y-3">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <div class="space-y-4 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Preferences</h3>
                <div class="space-y-3">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Language</label>
                    <select
                      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      <option>English</option>
                      <option>Indonesia</option>
                      <option>日本語</option>
                    </select>
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">Timezone</label>
                    <select
                      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      <option>UTC+7 (Jakarta)</option>
                      <option>UTC+0 (London)</option>
                      <option>UTC-5 (New York)</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </TabsRoot>

          <div class="mt-4 flex gap-2">
            <button
              @click="controlledTab = 'account'"
              class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Go to Account
            </button>
            <button
              @click="controlledTab = 'password'"
              class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Go to Password
            </button>
            <button
              @click="controlledTab = 'preferences'"
              class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
            >
              Go to Preferences
            </button>
          </div>
        </div>
      </section>

      <!-- With Disabled Tab -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Disabled Tab</h2>
          <p class="text-sm text-gray-600">
            Some tabs can be disabled based on permissions or conditions
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <TabsRoot default-value="free">
            <TabsList>
              <TabsTrigger value="free">Free Features</TabsTrigger>
              <TabsTrigger value="pro" disabled>Pro Features (Upgrade)</TabsTrigger>
              <TabsTrigger value="enterprise" disabled>Enterprise (Contact Us)</TabsTrigger>
            </TabsList>

            <TabsContent value="free">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Free Features</h3>
                <p class="text-gray-600">These features are available on the free plan:</p>
                <ul class="mt-3 space-y-2 text-gray-600">
                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Basic dashboard
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Up to 100 items
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-green-500">✓</span>
                    Community support
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="pro">
              <div class="py-4">
                <p class="text-gray-600">Pro features are locked. Upgrade to access!</p>
              </div>
            </TabsContent>

            <TabsContent value="enterprise">
              <div class="py-4">
                <p class="text-gray-600">Enterprise features require custom plan.</p>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </section>

      <!-- Submenu Variant -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Submenu Variant</h2>
          <p class="text-sm text-gray-600">Underline style tabs, perfect for navigation menus</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <TabsRoot default-value="marketing">
            <TabsList variant="submenu">
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="utility">Utility</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
            </TabsList>

            <TabsContent value="marketing">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Marketing</h3>
                <p class="text-gray-600">
                  Marketing tools and analytics to help grow your business. Track campaigns, measure
                  ROI, and optimize your marketing strategies.
                </p>
                <div class="mt-4 grid grid-cols-2 gap-4">
                  <div class="rounded-lg border border-gray-200 p-4">
                    <h4 class="font-semibold text-gray-900">Campaign Manager</h4>
                    <p class="mt-1 text-sm text-gray-600">Create and manage marketing campaigns</p>
                  </div>
                  <div class="rounded-lg border border-gray-200 p-4">
                    <h4 class="font-semibold text-gray-900">Email Marketing</h4>
                    <p class="mt-1 text-sm text-gray-600">Send targeted email campaigns</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="utility">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Utility</h3>
                <p class="text-gray-600">
                  Essential utility tools for your daily operations. File management, data
                  processing, and automation tools.
                </p>
                <ul class="mt-4 space-y-2">
                  <li class="flex items-center gap-2 text-gray-700">
                    <span class="text-blue-500">•</span>
                    File converter
                  </li>
                  <li class="flex items-center gap-2 text-gray-700">
                    <span class="text-blue-500">•</span>
                    Data export/import
                  </li>
                  <li class="flex items-center gap-2 text-gray-700">
                    <span class="text-blue-500">•</span>
                    Backup management
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="authentication">
              <div class="space-y-2 py-4">
                <h3 class="text-lg font-semibold text-gray-900">Authentication</h3>
                <p class="text-gray-600">
                  Secure authentication and authorization settings. Manage user access, roles, and
                  security policies.
                </p>
                <div class="mt-4 rounded-lg bg-blue-50 p-4">
                  <h4 class="font-semibold text-blue-900">Security Status: Active</h4>
                  <p class="mt-1 text-sm text-blue-700">
                    Two-factor authentication is enabled for all users
                  </p>
                </div>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </section>

      <!-- Compact Style -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Compact Style</h2>
          <p class="text-sm text-gray-600">Tabs with minimal content for quick switching</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <TabsRoot default-value="all" v-model="compactTab">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </TabsRoot>

          <div v-if="compactTab === 'all'" class="py-3">
            <p class="text-sm text-gray-600">Showing all items ini pake vif</p>
          </div>

          <div v-if="compactTab === 'active'" class="py-3">
            <p class="text-sm text-gray-600">Showing active items (12)</p>
          </div>

          <div v-if="compactTab === 'completed'" class="py-3">
            <p class="text-sm text-gray-600">Showing completed items (8)</p>
          </div>

          <div v-if="compactTab === 'archived'" class="py-3">
            <p class="text-sm text-gray-600">Showing archived items (4)</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
