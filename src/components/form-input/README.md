# Form Input Components - Compound Component Pattern

Koleksi komponen form input yang menggunakan compound component pattern untuk fleksibilitas maksimal.

## Instalasi

```typescript
import FormInput from '@/components/form-input'
// atau import individual components
import { Input, Label, CharacterCounter, ErrorMessage } from '@/components/form-input'
```

## Penggunaan Dasar

### Form Field Lengkap dengan Label dan Error Message

```vue
<template>
  <div class="space-y-2">
    <FormInput.Label html-for="username">Username</FormInput.Label>
    <FormInput
      v-model="username"
      id="username"
      placeholder="Enter your username"
      :clearable="true"
      :error="hasError"
    />
    <FormInput.ErrorMessage v-if="hasError" message="Username is required" />
  </div>
</template>
```

### Form Field dengan Character Counter

```vue
<template>
  <div class="space-y-2">
    <FormInput.Label html-for="description">Description</FormInput.Label>
    <FormInput
      v-model="description"
      id="description"
      placeholder="Enter a description"
      maxlength="100"
      :clearable="true"
    />
  </div>
</template>
```

### Password Input dengan Required Label

```vue
<template>
  <div class="space-y-2">
    <FormInput.Label html-for="password" :required="true">Password</FormInput.Label>
    <FormInput
      v-model="password"
      id="password"
      type="password"
      placeholder="Enter your password"
      :clearable="true"
    />
    <FormInput.ErrorMessage v-if="showError" message="Password must be at least 8 characters" />
  </div>
</template>
```

### Input dengan Suffix Icon

```vue
<template>
  <div class="space-y-2">
    <FormInput.Label html-for="email">Email Address</FormInput.Label>
    <FormInput
      v-model="email"
      id="email"
      type="email"
      placeholder="Enter your email"
      :clearable="true"
    >
      <template #suffix-icon>
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
</template>
```

### Standalone Input (tanpa Label)

```vue
<template>
  <div class="space-y-2">
    <FormInput v-model="search" id="search" placeholder="Search..." :clearable="true" />
  </div>
</template>
```

## Komponen yang Tersedia

### FormInput (Default Export)

Komponen utama yang menampilkan input field dengan fitur lengkap.

**Props:**

- `v-model` (string | number) - Value dari input
- `id` (string) - ID untuk input element
- `type` (string) - Tipe input: 'text', 'password', 'number', 'email', 'tel', 'url', 'search' (default: 'text')
- `placeholder` (string) - Placeholder text
- `disabled` (boolean) - State disabled
- `error` (boolean) - State error
- `clearable` (boolean) - Tampilkan tombol clear (default: false)
- `maxlength` (number) - Maksimal karakter (otomatis menampilkan counter)
- `wrapperClass` (string) - Custom class untuk wrapper
- `inputClass` (string) - Custom class untuk input

**Slots:**

- `suffix-icon` - Icon di sebelah kiri input
- `append-button` - Tombol di sebelah kanan input
- `append-button-icon` - Icon button di sebelah kanan input

### FormInput.Label

Komponen label untuk input field.

**Props:**

- `html-for` (string) - ID dari input yang terkait
- `required` (boolean) - Menampilkan tanda \* untuk required field
- `state` ('default' | 'disabled') - State dari label
- `class` (string) - Custom class

### FormInput.ErrorMessage

Komponen untuk menampilkan error message.

**Props:**

- `id` (string) - ID untuk error message (untuk accessibility)
- `message` (string) - Error message yang ditampilkan
- `class` (string) - Custom class

### FormInput.CharacterCounter

Komponen untuk menampilkan character counter (sudah otomatis muncul ketika menggunakan maxlength di FormInput).

**Props:**

- `current` (number) - Jumlah karakter saat ini
- `max` (number) - Maksimal karakter
- `error` (boolean) - State error
- `disabled` (boolean) - State disabled
- `class` (string) - Custom class

### FormInput.Input

Komponen input standalone untuk penggunaan yang lebih custom.

**Props:**

- `v-model` (string | number) - Value dari input
- `id` (string) - ID untuk input element
- `disabled` (boolean) - State disabled
- `state` ('default' | 'disabled' | 'error' | 'focus') - State dari input
- `spacing` ('default' | 'withCounter' | 'withIcons') - Spacing mode
- `class` (string) - Custom class

## Keuntungan Compound Component Pattern

1. **Fleksibilitas Tinggi** - Anda bisa mengkombinasikan komponen sesuai kebutuhan
2. **Reusability** - Setiap sub-komponen bisa digunakan secara independent
3. **Type Safety** - Full TypeScript support
4. **Maintainability** - Kode lebih mudah di-maintain dan di-extend
5. **Customization** - Mudah dikustomisasi tanpa harus mengubah komponen utama

## Contoh Implementasi

Lihat file `src/views/DemoAdvancedInput.vue` untuk contoh implementasi lengkap.
