<template>
  <div class="bg-surface-secondary min-h-screen p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <h1 class="text-text-title text-3xl font-bold">Menu Component Demo</h1>

      <!-- Basic Menu -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Basic Menu</h2>
        <MenuRoot>
          <MenuButton label="Actions" variant="primary" />
          <MenuPanel>
            <MenuOption>Edit</MenuOption>
            <MenuOption>Duplicate</MenuOption>
            <MenuOption>Archive</MenuOption>
            <MenuDivider />
            <MenuOption destructive>Delete</MenuOption>
          </MenuPanel>
        </MenuRoot>
      </div>

      <!-- Menu with Headers -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Menu with Headers</h2>
        <MenuRoot>
          <MenuButton label="User Menu" variant="secondary" />
          <MenuPanel>
            <MenuHeader>Account</MenuHeader>
            <MenuOption>Profile</MenuOption>
            <MenuOption>Settings</MenuOption>
            <MenuOption>Billing</MenuOption>
            <MenuDivider />
            <MenuHeader>Actions</MenuHeader>
            <MenuOption>Sign Out</MenuOption>
          </MenuPanel>
        </MenuRoot>
      </div>

      <!-- Ghost Variant -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Ghost Variant</h2>
        <MenuRoot>
          <MenuButton label="Options" variant="ghost" />
          <MenuPanel>
            <MenuOption>View Details</MenuOption>
            <MenuOption>Share</MenuOption>
            <MenuOption>Download</MenuOption>
          </MenuPanel>
        </MenuRoot>
      </div>

      <!-- Menu with Disabled Options -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">With Disabled Options</h2>
        <MenuRoot>
          <MenuButton label="More" variant="primary" />
          <MenuPanel>
            <MenuOption>Available Option</MenuOption>
            <MenuOption disabled>Disabled Option</MenuOption>
            <MenuOption>Another Available</MenuOption>
          </MenuPanel>
        </MenuRoot>
      </div>

      <!-- Top Position -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">Top Position Menu</h2>
        <MenuRoot>
          <MenuButton label="Open Up" variant="secondary" />
          <MenuPanel position="top">
            <MenuOption>Option 1</MenuOption>
            <MenuOption>Option 2</MenuOption>
            <MenuOption>Option 3</MenuOption>
          </MenuPanel>
        </MenuRoot>
      </div>

      <!-- Multiple Menus Test -->
      <div class="space-y-4">
        <h2 class="text-text-title text-xl font-semibold">
          Multiple Menus (Context Isolation Test)
        </h2>
        <div class="flex gap-4">
          <MenuRoot>
            <MenuButton label="Menu 1" variant="primary" />
            <MenuPanel>
              <MenuOption>Menu 1 - Option A</MenuOption>
              <MenuOption>Menu 1 - Option B</MenuOption>
            </MenuPanel>
          </MenuRoot>

          <MenuRoot>
            <MenuButton label="Menu 2" variant="secondary" />
            <MenuPanel>
              <MenuOption>Menu 2 - Option A</MenuOption>
              <MenuOption>Menu 2 - Option B</MenuOption>
            </MenuPanel>
          </MenuRoot>

          <MenuRoot>
            <MenuButton label="Menu 3" variant="ghost" />
            <MenuPanel>
              <MenuOption>Menu 3 - Option A</MenuOption>
              <MenuOption>Menu 3 - Option B</MenuOption>
            </MenuPanel>
          </MenuRoot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MenuButton,
  MenuDivider,
  MenuHeader,
  MenuOption,
  MenuPanel,
  MenuRoot,
} from '@/components/menu'
</script>
