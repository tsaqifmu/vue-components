# Tabs API Comparison

## shadcn/ui (React) vs This Component (Vue)

Component ini terinspirasi dari shadcn/ui dengan adaptasi untuk Vue patterns yang lebih idiomatis.

### Props Comparison

| shadcn/ui (React) | Vue Component  | Deskripsi                                       |
| ----------------- | -------------- | ----------------------------------------------- |
| `defaultValue`    | `defaultValue` | ✅ Sama - Nilai default untuk uncontrolled mode |
| `value`           | `modelValue`   | ⭐ Vue style - Gunakan dengan v-model           |
| `orientation`     | `orientation`  | ✅ Sama - 'horizontal' \| 'vertical'            |

### Events Comparison

| shadcn/ui (React) | Vue Component        | Deskripsi                    |
| ----------------- | -------------------- | ---------------------------- |
| `onValueChange`   | `@update:modelValue` | ⭐ Vue style - Untuk v-model |

## Usage Examples

### 1. Uncontrolled Mode (Sama di keduanya)

**shadcn/ui (React):**

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="password">...</TabsContent>
</Tabs>
```

**Vue Component:**

```vue
<TabsRoot default-value="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="password">...</TabsContent>
</TabsRoot>
```

### 2. Controlled Mode

**shadcn/ui (React):**

```tsx
const [value, setValue] = useState("account")

<Tabs value={value} onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="password">...</TabsContent>
</Tabs>
```

**Vue Component (with v-model):**

```vue
<script setup>
const activeTab = ref('account')
</script>

<TabsRoot v-model="activeTab">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="password">...</TabsContent>
</TabsRoot>
```

## Migration dari shadcn/ui ke Vue

Jika Anda familiar dengan shadcn/ui, berikut panduan migrasi cepat:

### 1. Component Names

- `<Tabs>` → `<TabsRoot>`
- `<TabsList>` → `<TabsList>` ✅ Same
- `<TabsTrigger>` → `<TabsTrigger>` ✅ Same
- `<TabsContent>` → `<TabsContent>` ✅ Same

### 2. Props

- `defaultValue` → `defaultValue` atau `default-value` ✅ Same
- `value={state}` → `v-model="state"` (Vue two-way binding)
- `orientation` → `orientation` ✅ Same

### 3. Events

- `onValueChange={handler}` → Gunakan `v-model="state"` untuk automatic two-way binding

### 4. Styling

- `className` → `class` (Vue standard)
- Tailwind classes work exactly the same ✅

## Keuntungan Vue Version

1. ⭐ **v-model support** - two-way binding yang simple dan idiomatis
2. ⭐ **Modern defineModel()** - menggunakan Vue 3.4+ macro untuk binding yang lebih clean
3. ⭐ **TypeScript support** - full type safety
4. ⭐ **Composition API ready** - modern Vue patterns
5. ⭐ **Cleaner API** - fokus pada Vue best practices
6. ✅ **Functionality setara** dengan shadcn/ui

## Kesimpulan

Component ini memberikan functionality yang sama dengan shadcn/ui, namun dengan API yang lebih idiomatis untuk Vue:

- ✅ `defaultValue` prop untuk uncontrolled mode
- ⭐ `v-model` untuk controlled mode (lebih simple dari `value` + `onValueChange`)
- ✅ `orientation` prop
- ✅ Semua functionality yang sama

**Keunggulan:**

- ⭐ API yang lebih clean dan Vue-idiomatic
- ⭐ Two-way binding otomatis dengan v-model
- ⭐ Lebih mudah digunakan untuk Vue developers
