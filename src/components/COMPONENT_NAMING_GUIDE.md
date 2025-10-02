# Component Naming Best Practices

## 📊 Perbandingan: Dot Notation vs Compound Names

Proyek ini menggunakan **KEDUA pattern** untuk kasus yang berbeda:

### 1. **Dot Notation (Namespaced)** - `FormInput.Label`

```vue
<template>
  <FormInput.Label html-for="username">Username</FormInput.Label>
  <FormInput v-model="username" id="username" />
  <FormInput.ErrorMessage message="Error" />
</template>

<script setup>
import FormInput from '@/components/form-input'
</script>
```

### 2. **Compound Names** - `MenuPanel`

```vue
<template>
  <MenuRoot>
    <MenuButton label="Actions" />
    <MenuPanel>
      <MenuOption>Edit</MenuOption>
    </MenuPanel>
  </MenuRoot>
</template>

<script setup>
import { MenuRoot, MenuButton, MenuPanel, MenuOption } from '@/components/menu'
</script>
```

---

## ✅ Kapan Menggunakan **Dot Notation** (FormInput.Label)

### **Use Cases:**

- ✅ **Parent-Child yang sangat terikat** (strongly coupled)
- ✅ **Sub-components yang TIDAK berdiri sendiri**
- ✅ **Component dengan satu main component utama**
- ✅ **Form components** (Input, Label, Error, Help Text)
- ✅ **Card components** (Card.Header, Card.Body, Card.Footer)
- ✅ **API mirip HTML native** (`<input>` + `<label>`)

### **Pros:**

✅ **Visual Hierarchy Jelas**

```vue
<FormInput>        <!-- Main component -->
  <FormInput.Label />    <!-- Sub-component -->
  <FormInput.ErrorMessage />  <!-- Sub-component -->
</FormInput>
```

✅ **Single Import**

```ts
import FormInput from '@/components/form-input'
// Dapat akses: FormInput, FormInput.Label, FormInput.ErrorMessage
```

✅ **Namespace Protection**

- Tidak perlu khawatir naming collision
- `FormInput.Label` vs `Accordion.Label` - jelas berbeda

✅ **IDE Autocomplete Better**

```ts
FormInput.  // IDE langsung suggest: Label, ErrorMessage, CharacterCounter
```

✅ **Relationship yang Explicit**

- Terlihat jelas bahwa `Label` adalah bagian dari `FormInput`
- Tidak bisa digunakan sendirian (by design)

### **Cons:**

❌ **Setup lebih kompleks**

```ts
// Butuh compound component pattern
const FormInput = FormInputField as typeof FormInputField & {
  Input: typeof Input
  Label: typeof Label
}
FormInput.Label = Label
```

❌ **Tree-shaking kurang optimal**

```ts
import FormInput from '@/components/form-input'
// Import semua, meskipun hanya pakai FormInput.Label
```

❌ **TypeScript bisa tricky**

- Butuh type assertion
- Generic types lebih kompleks

❌ **Testing lebih ribet**

```ts
// Harus import parent dulu
import FormInput from '@/components/form-input'
mount(FormInput.Label) // ❌
```

---

## ✅ Kapan Menggunakan **Compound Names** (MenuPanel)

### **Use Cases:**

- ✅ **Compound component pattern** yang loosely coupled
- ✅ **Sub-components yang BISA berdiri sendiri**
- ✅ **Equal-level components** (tidak ada parent-child strict)
- ✅ **Menu/Dropdown systems**
- ✅ **Dialog/Modal systems**
- ✅ **Tab/Accordion systems**
- ✅ **Composition pattern** (flexible arrangement)

### **Pros:**

✅ **Tree-shaking Optimal**

```ts
import { MenuButton, MenuPanel } from '@/components/menu'
// Hanya import yang dipakai
```

✅ **Setup Simpel**

```ts
// Cukup export biasa
export { default as MenuButton } from './MenuButton.vue'
export { default as MenuPanel } from './MenuPanel.vue'
```

✅ **TypeScript Friendly**

```ts
// Tidak butuh type assertion khusus
const props = defineProps<MenuButtonProps>()
```

✅ **Testing Mudah**

```ts
import { MenuButton } from '@/components/menu'
mount(MenuButton, { props: { label: 'Test' } }) // ✅
```

✅ **Flexible Composition**

```vue
<!-- Bisa diatur sesuka hati -->
<MenuRoot>
  <div class="custom-wrapper">
    <MenuButton />
  </div>
  <MenuPanel />
</MenuRoot>
```

✅ **Independent Usage**

```vue
<!-- MenuButton bisa dipakai sendiri jika perlu -->
<MenuButton label="Standalone" @click="handler" />
```

### **Cons:**

❌ **Naming Collision Risk**

```ts
import { Label } from '@/components/form'
import { Label } from '@/components/card' // ❌ Conflict!
```

❌ **Import Statement Panjang**

```ts
import {
  MenuRoot,
  MenuButton,
  MenuPanel,
  MenuOption,
  MenuDivider,
  MenuHeader,
} from '@/components/menu'
```

❌ **Relationship kurang explicit**

```ts
// Tidak terlihat jelas bahwa MenuPanel adalah bagian dari Menu system
import { Panel } from '@/components/menu' // Kurang jelas
```

❌ **IDE Autocomplete terbatas**

```ts
Menu // Tidak muncul apa-apa
// Harus tahu nama exact: MenuButton, MenuPanel, dll
```

---

## 🎯 **Rekomendasi Berdasarkan Context**

### **Gunakan DOT NOTATION jika:**

```vue
<!-- ❌ BAD: Sub-component yang terlalu terikat -->
<Form>
  <FormLabel />  <!-- Harus pakai FormInput.Label -->
  <FormInput />
  <FormError />  <!-- Harus pakai FormInput.ErrorMessage -->
</Form>

<!-- ✅ GOOD: Dot notation untuk strongly coupled -->
<FormInput>
  <FormInput.Label />
  <FormInput.ErrorMessage />
</FormInput>
```

**Kriteria:**

1. Ada **main component yang dominan**
2. Sub-components **jarang/tidak pernah** dipakai sendiri
3. **Visual hierarchy** penting (parent-child)
4. Mirip dengan **native HTML elements** (`<select>` + `<option>`)
5. Satu default import sudah cukup

**Contoh yang cocok:**

- `FormInput.Label`, `FormInput.ErrorMessage`
- `Card.Header`, `Card.Body`, `Card.Footer`
- `Table.Head`, `Table.Body`, `Table.Row`, `Table.Cell`
- `List.Item`, `List.Divider`
- `Accordion.Item`, `Accordion.Header`, `Accordion.Content`

---

### **Gunakan COMPOUND NAMES jika:**

```vue
<!-- ✅ GOOD: Compound components yang loosely coupled -->
<MenuRoot>
  <MenuButton label="Actions" />
  <MenuPanel>
    <MenuHeader>Title</MenuHeader>
    <MenuOption>Edit</MenuOption>
    <MenuDivider />
  </MenuPanel>
</MenuRoot>
```

**Kriteria:**

1. Tidak ada single main component
2. Sub-components bisa **berdiri sendiri**
3. **Composition flexibility** penting
4. **Tree-shaking** adalah prioritas
5. Library-style components (mirip Radix UI, Headless UI)

**Contoh yang cocok:**

- `MenuRoot`, `MenuButton`, `MenuPanel`, `MenuOption`
- `DialogTrigger`, `DialogContent`, `DialogTitle`
- `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`
- `DropdownTrigger`, `DropdownContent`, `DropdownItem`
- `TooltipTrigger`, `TooltipContent`

---

## 📋 **Decision Matrix**

| Kriteria                      | Dot Notation      | Compound Names      |
| ----------------------------- | ----------------- | ------------------- |
| **Parent-child relationship** | Strong ✅         | Loose ✅            |
| **Sub-component standalone**  | Jarang ❌         | Sering ✅           |
| **Import simplicity**         | Single import ✅  | Multiple imports ❌ |
| **Tree-shaking**              | Kurang optimal ❌ | Optimal ✅          |
| **TypeScript complexity**     | Medium 😐         | Simple ✅           |
| **Visual hierarchy**          | Very clear ✅     | Less clear 😐       |
| **Testing ease**              | Harder ❌         | Easier ✅           |
| **Setup complexity**          | Complex ❌        | Simple ✅           |
| **Naming collision**          | Protected ✅      | Risk ❌             |
| **Composition flexibility**   | Limited 😐        | High ✅             |

---

## 🎨 **Proyek Ini: Hybrid Approach**

Proyek ini menggunakan **BOTH patterns** dengan bijak:

### ✅ **FormInput** = Dot Notation

```ts
// src/components/form-input/index.ts
const FormInput = FormInputField as typeof FormInputField & {
  Input: typeof Input
  Label: typeof Label
  // ...
}
```

**Why?**

- Form inputs memiliki **strong parent-child relationship**
- Label/Error **tidak berguna** tanpa Input
- User expect **single import** untuk form field
- Mirip native HTML (`<input>` + `<label>`)

### ✅ **Menu** = Compound Names

```ts
// src/components/menu/index.ts
export { default as MenuRoot } from './MenuRoot.vue'
export { default as MenuButton } from './MenuButton.vue'
// ...
```

**Why?**

- Menu components **loosely coupled**
- MenuButton bisa standalone (contoh: toggle tanpa panel)
- Composition **flexibility** tinggi
- Tree-shaking **important** (tidak semua page butuh full menu)
- Inspired by Radix UI / Headless UI

---

## 🚀 **Kesimpulan & Rekomendasi**

### **Untuk Proyek Ini:**

1. **Keep using DOT NOTATION untuk:**
   - ✅ `FormInput.Label`, `FormInput.ErrorMessage`
   - ✅ Future: `Card.Header`, `Card.Body`, `Card.Footer`
   - ✅ Future: `Table.Head`, `Table.Body`, `Table.Cell`

2. **Keep using COMPOUND NAMES untuk:**
   - ✅ `MenuRoot`, `MenuButton`, `MenuPanel`
   - ✅ Future: `DialogTrigger`, `DialogContent`
   - ✅ Future: `TabsRoot`, `TabsList`, `TabsContent`

### **General Rule:**

```
📦 Strongly Coupled + Parent-Centric = DOT NOTATION
   Example: FormInput.Label

🧩 Loosely Coupled + Composition-Focused = COMPOUND NAMES
   Example: MenuButton
```

---

## 📚 **Referensi & Best Practices**

### **Industry Examples:**

**Radix UI (Compound Names):**

```vue
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Content />
</Dialog.Root>
```

**Ant Design (Dot Notation):**

```vue
<Form>
  <Form.Item label="Username">
    <Input />
  </Form.Item>
</Form>
```

**Headless UI (Compound Names):**

```vue
<Menu>
  <MenuButton />
  <MenuItems>
    <MenuItem />
  </MenuItems>
</Menu>
```

**Material UI (Compound Names):**

```vue
<Tabs>
  <Tab />
  <Tab />
</Tabs>
<TabPanel />
```

### **Trend:**

- Modern libraries (Radix, Headless UI) → **Compound Names**
- Traditional libraries (Ant Design) → **Dot Notation**
- React Compound Components → **Dot Notation**
- Vue Renderless Components → **Compound Names**

---

## 💡 **Key Takeaway**

**TIDAK ADA yang "lebih baik" secara absolut!**

✅ **Pilih pattern berdasarkan:**

1. Relationship strength (strong vs loose coupling)
2. Use case (standalone vs always together)
3. Team preference & consistency
4. Library inspiration (Radix vs Ant Design)

✅ **Yang penting:**

- **Consistency** dalam satu project
- **Clear documentation** untuk pattern choice
- **Team agreement** pada naming convention

---

**TL;DR:**

- `FormInput.Label` ✅ → Parent-child yang kuat, jarang standalone
- `MenuButton` ✅ → Loosely coupled, bisa standalone, flexible composition
- **Both are valid!** Pilih berdasarkan use case, bukan "best practice universal"
