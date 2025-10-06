<template>
  <div class="bg-surface-secondary min-h-screen p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <h1 class="text-text-title text-3xl font-bold">DropdownMenu Component Demo</h1>

      <!-- Basic DropdownMenu -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Basic DropdownMenu</h2>
        <DropdownMenuRoot>
          <DropdownMenuButton label="Actions" variant="primary" />
          <DropdownMenuPanel>
            <DropdownMenuOption>Edit</DropdownMenuOption>
            <DropdownMenuOption>Duplicate</DropdownMenuOption>
            <DropdownMenuOption>Archive</DropdownMenuOption>
            <DropdownMenuDivider />
            <DropdownMenuOption destructive>Delete</DropdownMenuOption>
          </DropdownMenuPanel>
        </DropdownMenuRoot>
      </div>

      <!-- DropdownMenu with Headers -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">DropdownMenu with Headers</h2>
        <DropdownMenuRoot>
          <DropdownMenuButton label="User Menu" variant="secondary" />
          <DropdownMenuPanel>
            <DropdownMenuHeader>Account</DropdownMenuHeader>
            <DropdownMenuOption>Profile</DropdownMenuOption>
            <DropdownMenuOption>Settings</DropdownMenuOption>
            <DropdownMenuOption>Billing</DropdownMenuOption>
            <DropdownMenuDivider />
            <DropdownMenuHeader>Actions</DropdownMenuHeader>
            <DropdownMenuOption>Sign Out</DropdownMenuOption>
          </DropdownMenuPanel>
        </DropdownMenuRoot>
      </div>

      <!-- Ghost Variant -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Ghost Variant</h2>
        <DropdownMenuRoot>
          <DropdownMenuButton label="Options" variant="ghost" />
          <DropdownMenuPanel>
            <DropdownMenuOption>View Details</DropdownMenuOption>
            <DropdownMenuOption>Share</DropdownMenuOption>
            <DropdownMenuOption>Download</DropdownMenuOption>
          </DropdownMenuPanel>
        </DropdownMenuRoot>
      </div>

      <!-- DropdownMenu with Disabled Options -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">With Disabled Options</h2>
        <DropdownMenuRoot>
          <DropdownMenuButton label="More" variant="primary" />
          <DropdownMenuPanel>
            <DropdownMenuOption>Available Option</DropdownMenuOption>
            <DropdownMenuOption disabled>Disabled Option</DropdownMenuOption>
            <DropdownMenuOption>Another Available</DropdownMenuOption>
          </DropdownMenuPanel>
        </DropdownMenuRoot>
      </div>

      <!-- Top Position -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Top Position DropdownMenu</h2>
        <DropdownMenuRoot>
          <DropdownMenuButton label="Open Up" variant="secondary" />
          <DropdownMenuPanel position="top">
            <DropdownMenuOption>Option 1</DropdownMenuOption>
            <DropdownMenuOption>Option 2</DropdownMenuOption>
            <DropdownMenuOption>Option 3</DropdownMenuOption>
            <DropdownMenuOption>Option 4</DropdownMenuOption>
            <DropdownMenuOption>Option 5</DropdownMenuOption>
            <DropdownMenuOption>Option 6</DropdownMenuOption>
          </DropdownMenuPanel>
        </DropdownMenuRoot>
      </div>

      <!-- Multiple DropdownMenus Test -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">
          Multiple DropdownMenus (Context Isolation Test)
        </h2>
        <div class="flex gap-4">
          <DropdownMenuRoot>
            <DropdownMenuButton label="Menu 1" variant="primary" />
            <DropdownMenuPanel>
              <DropdownMenuOption>Menu 1 - Option A</DropdownMenuOption>
              <DropdownMenuOption>Menu 1 - Option B</DropdownMenuOption>
            </DropdownMenuPanel>
          </DropdownMenuRoot>

          <DropdownMenuRoot>
            <DropdownMenuButton label="Menu 2" variant="secondary" />
            <DropdownMenuPanel>
              <DropdownMenuOption>Menu 2 - Option A</DropdownMenuOption>
              <DropdownMenuOption>Menu 2 - Option B</DropdownMenuOption>
            </DropdownMenuPanel>
          </DropdownMenuRoot>

          <DropdownMenuRoot>
            <DropdownMenuButton label="Menu 3" variant="ghost" />
            <DropdownMenuPanel>
              <DropdownMenuOption>Menu 3 - Option A</DropdownMenuOption>
              <DropdownMenuOption>Menu 3 - Option B</DropdownMenuOption>
            </DropdownMenuPanel>
          </DropdownMenuRoot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenuButton,
  DropdownMenuDivider,
  DropdownMenuHeader,
  DropdownMenuOption,
  DropdownMenuPanel,
  DropdownMenuRoot,
} from '@/components/dropdown-menu'
</script>
