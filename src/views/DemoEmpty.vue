<script setup lang="ts">
import {
  EmptyRoot,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/empty'
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-6xl space-y-12">
      <!-- Header -->
      <div>
        <h1 class="mb-2 text-3xl font-bold text-gray-900">Empty Component Demo</h1>
        <p class="text-gray-600">
          Compound component pattern for empty states - placeholder content when there's no data
        </p>
      </div>

      <!-- Basic Empty State -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Basic Empty State</h2>
          <p class="text-sm text-gray-600">Simple empty state with title and description</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <EmptyRoot class="border">
            <EmptyHeader>
              <EmptyTitle>No data found</EmptyTitle>
              <EmptyDescription>
                There are no items to display at the moment.
              </EmptyDescription>
            </EmptyHeader>
          </EmptyRoot>
        </div>
      </section>

      <!-- With Default Media -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">With Default Media (Icon)</h2>
          <p class="text-sm text-gray-600">
            Empty state with a large icon using default variant
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <EmptyRoot class="border">
            <EmptyHeader>
              <EmptyMedia>
                <!-- Search Icon -->
                <svg
                  class="size-16 text-text-subtitle"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </EmptyMedia>
              <EmptyTitle>No results found</EmptyTitle>
              <EmptyDescription>
                We couldn't find any results matching your search criteria. Try adjusting your
                filters or search terms.
              </EmptyDescription>
            </EmptyHeader>
          </EmptyRoot>
        </div>
      </section>

      <!-- With Icon Variant -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">With Icon Variant</h2>
          <p class="text-sm text-gray-600">
            Empty state with icon variant (rounded background)
          </p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <EmptyRoot class="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <!-- Folder Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
              </EmptyMedia>
              <EmptyTitle>No files uploaded</EmptyTitle>
              <EmptyDescription>
                Get started by uploading your first file. Drag and drop files here or click the
                button below.
              </EmptyDescription>
            </EmptyHeader>
          </EmptyRoot>
        </div>
      </section>

      <!-- With Action Button -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">With Action Button</h2>
          <p class="text-sm text-gray-600">Empty state with call-to-action button</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <EmptyRoot class="border">
            <EmptyHeader>
              <EmptyMedia>
                <!-- Document Plus Icon -->
                <svg
                  class="size-16 text-text-subtitle"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </EmptyMedia>
              <EmptyTitle>No documents yet</EmptyTitle>
              <EmptyDescription>
                Create your first document to get started with collaboration.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <button
                class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <svg
                  class="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Document
              </button>
            </EmptyContent>
          </EmptyRoot>
        </div>
      </section>

      <!-- With Multiple Actions -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">With Multiple Actions</h2>
          <p class="text-sm text-gray-600">Empty state with primary and secondary actions</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <EmptyRoot class="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <!-- Users Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </EmptyMedia>
              <EmptyTitle>No team members</EmptyTitle>
              <EmptyDescription>
                Start building your team by inviting members or creating new accounts.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div class="flex flex-wrap items-center justify-center gap-3">
                <button
                  class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <svg
                    class="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                  Invite Members
                </button>
                <button
                  class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Import from CSV
                </button>
              </div>
            </EmptyContent>
          </EmptyRoot>
        </div>
      </section>

      <!-- With Link in Description -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">With Link in Description</h2>
          <p class="text-sm text-gray-600">Empty state with clickable link in description</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <EmptyRoot class="border">
            <EmptyHeader>
              <EmptyMedia>
                <!-- Cog Icon -->
                <svg
                  class="size-16 text-text-subtitle"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </EmptyMedia>
              <EmptyTitle>Configuration required</EmptyTitle>
              <EmptyDescription>
                Please complete your <a href="#">account settings</a> before accessing this feature.
                Need help? Check out our <a href="#">documentation</a>.
              </EmptyDescription>
            </EmptyHeader>
          </EmptyRoot>
        </div>
      </section>

      <!-- Without Border (Inline) -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Without Border (Inline)</h2>
          <p class="text-sm text-gray-600">Empty state without border for inline usage</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="rounded-lg border border-gray-200 p-4">
            <h3 class="mb-4 text-lg font-semibold">Recent Activity</h3>
            <EmptyRoot>
              <EmptyHeader>
              <EmptyMedia>
                <!-- Clock Icon -->
                <svg
                  class="size-12 text-text-subtitle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </EmptyMedia>
                <EmptyTitle>No recent activity</EmptyTitle>
                <EmptyDescription>
                  Your recent actions will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </EmptyRoot>
          </div>
        </div>
      </section>

      <!-- Real World Examples -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Real World Examples</h2>
          <p class="text-sm text-gray-600">Common empty state scenarios</p>
        </div>
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Inbox Empty -->
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <h3 class="mb-4 text-sm font-medium text-gray-500">Inbox</h3>
            <EmptyRoot class="border">
              <EmptyHeader>
              <EmptyMedia>
                <svg
                  class="size-14 text-text-subtitle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                    />
                  </svg>
                </EmptyMedia>
                <EmptyTitle>Your inbox is empty</EmptyTitle>
                <EmptyDescription>
                  Messages you receive will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </EmptyRoot>
          </div>

          <!-- Cart Empty -->
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <h3 class="mb-4 text-sm font-medium text-gray-500">Shopping Cart</h3>
            <EmptyRoot class="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </EmptyMedia>
                <EmptyTitle>Your cart is empty</EmptyTitle>
                <EmptyDescription>
                  Browse our products and add items to your cart.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <button
                  class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Continue Shopping
                </button>
              </EmptyContent>
            </EmptyRoot>
          </div>

          <!-- Notifications Empty -->
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <h3 class="mb-4 text-sm font-medium text-gray-500">Notifications</h3>
            <EmptyRoot class="border">
              <EmptyHeader>
              <EmptyMedia>
                <svg
                  class="size-14 text-text-subtitle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </EmptyMedia>
                <EmptyTitle>All caught up!</EmptyTitle>
                <EmptyDescription>
                  You have no new notifications at this time.
                </EmptyDescription>
              </EmptyHeader>
            </EmptyRoot>
          </div>

          <!-- Search Results Empty -->
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <h3 class="mb-4 text-sm font-medium text-gray-500">Search Results</h3>
            <EmptyRoot class="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </EmptyMedia>
                <EmptyTitle>No results for "xyz"</EmptyTitle>
                <EmptyDescription>
                  Try different keywords or check your spelling.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <button
                  class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Clear Search
                </button>
              </EmptyContent>
            </EmptyRoot>
          </div>
        </div>
      </section>

      <!-- Custom Styling -->
      <section class="space-y-4">
        <div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900">Custom Styling</h2>
          <p class="text-sm text-gray-600">Examples with custom colors and styling</p>
        </div>
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Blue Theme -->
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <EmptyRoot class="border-2 border-blue-200 bg-blue-50">
              <EmptyHeader>
                <EmptyMedia class="text-blue-500">
                  <svg
                    class="size-14"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                </EmptyMedia>
                <EmptyTitle class="text-blue-900">Get started with AI</EmptyTitle>
                <EmptyDescription class="text-blue-700">
                  Unlock the power of artificial intelligence for your workflow.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <button
                  class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Enable AI Features
                </button>
              </EmptyContent>
            </EmptyRoot>
          </div>

          <!-- Green Theme -->
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <EmptyRoot class="border-2 border-green-200 bg-green-50">
              <EmptyHeader>
                <EmptyMedia class="text-green-500">
                  <svg
                    class="size-14"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </EmptyMedia>
                <EmptyTitle class="text-green-900">All tasks completed!</EmptyTitle>
                <EmptyDescription class="text-green-700">
                  Great job! You've finished all your tasks for today.
                </EmptyDescription>
              </EmptyHeader>
            </EmptyRoot>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

