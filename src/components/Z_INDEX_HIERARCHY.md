# Z-Index Hierarchy Documentation

Dokumentasi ini menjelaskan hierarki z-index untuk semua komponen dalam project ini, memastikan layering yang konsisten dan tidak ada konflik visual.

---

## 📊 Z-Index Hierarchy (Highest to Lowest)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Z-INDEX STACK ORDER                          │
└─────────────────────────────────────────────────────────────────────┘

┌────────── Level 5: Dropdown/Select Layer (9998-9999) ──────────┐
│                                                      │
│  z-[9999]  DropdownMenuPanel, SelectContent,        │ ← HIGHEST
│            MultiSelectContent (teleported)          │
│  z-[9998]  DropdownMenuOverlay, SelectOverlay,      │
│            MultiSelectOverlay (teleported)          │
│                                                      │
└──────────────────────────────────────────────────────┘
                          ↓
┌────────── Level 4: Modal Layer (998-999) ───────────┐
│                                                      │
│  z-[999]   ModalContent                             │
│  z-[998]   ModalOverlay                             │
│                                                      │
└──────────────────────────────────────────────────────┘
                          ↓
┌────────── Level 3: Dropdown/Select (50) ────────────┐
│                                                      │
│  z-50      DropdownMenuPanel, SelectContent,        │
│            MultiSelectContent (non-teleported)      │
│                                                      │
└──────────────────────────────────────────────────────┘
                          ↓
┌────────── Level 2: Input Icons (20) ────────────────┐
│                                                      │
│  z-20      FormInputField (action icons)            │
│  z-20      AdvancedInputField (action icons)        │
│                                                      │
└──────────────────────────────────────────────────────┘
                          ↓
┌────────── Level 1: Base Layer (0-10) ───────────────┐
│                                                      │
│  z-0/auto  Normal components                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Detailed Breakdown

### **Level 5: Dropdown/Select Layer (9998-9999)** - HIGHEST

#### **DropdownMenuPanel, SelectContent, MultiSelectContent (Teleported)** - `z-[9999]`

- **Locations**:
  - `src/components/dropdown-menu/DropdownMenuPanel.vue:101`
  - `src/components/select/SelectContent.vue:75`
  - `src/components/select/MultiSelectContent.vue:79`
- **CSS Class**: `fixed z-[9999]`
- **Context**: Ketika `teleport: true` (default)
- **Reasoning**:
  - Harus berada di atas semua komponen termasuk Modal
  - Memungkinkan dropdown/select bekerja di dalam Modal
  - Z-index tertinggi untuk memastikan tidak tertutup apapun

**Use Case:**

```vue
<!-- Dropdown inside Modal - needs highest z-index -->
<ModalContent>
  <DropdownMenuRoot>
    <DropdownMenuButton label="Select" />
    <DropdownMenuPanel> <!-- z-[9999] -->
      <DropdownMenuOption>Option 1</DropdownMenuOption>
    </DropdownMenuPanel>
  </DropdownMenuRoot>
</ModalContent>
```

#### **DropdownMenuOverlay, SelectOverlay, MultiSelectOverlay (Teleported)** - `z-[9998]`

- **Locations**:
  - `src/components/dropdown-menu/DropdownMenuPanel.vue:92`
  - `src/components/select/SelectContent.vue:67`
  - `src/components/select/MultiSelectContent.vue:71`
- **CSS Class**: `fixed inset-0 z-[9998]`
- **Context**: Transparent overlay untuk click-outside detection
- **Reasoning**:
  - Satu tingkat di bawah panel content
  - Menutupi seluruh viewport termasuk Modal overlay
  - Memungkinkan detection click outside dropdown/select

---

### **Level 4: Modal Layer (998-999)**

#### **ModalContent** - `z-[999]`

- **Location**: `src/components/modal/ModalContent.vue:30`
- **CSS Class**: `fixed z-[999]`
- **Context**: Dialog/Modal content container
- **Reasoning**:
  - Harus berada di atas ModalOverlay (998)
  - Di bawah Menu layer (9998-9999) agar menu di dalam modal tetap berfungsi
  - Centered dengan `top-1/2 left-1/2 translate(-50%, -50%)`

**Use Case:**

```vue
<ModalRoot v-model:open="isOpen">
  <ModalOverlay /> <!-- z-[998] -->
  <ModalContent>   <!-- z-[999] -->
    <ModalHeader>
      <ModalTitle>Dialog Title</ModalTitle>
    </ModalHeader>
    <ModalBody>Content here</ModalBody>
  </ModalContent>
</ModalRoot>
```

#### **ModalOverlay** - `z-[998]`

- **Location**: `src/components/modal/ModalOverlay.vue:42`
- **CSS Class**: `fixed inset-0 z-[998]`
- **Context**: Semi-transparent backdrop dengan blur
- **Reasoning**:
  - Harus menutupi seluruh halaman kecuali ModalContent
  - `bg-black/50 backdrop-blur-sm` untuk visual focus
  - Lowest dalam Modal layer, highest dalam Base layer

---

### **Level 3: Dropdown/Select Layer (50)**

#### **DropdownMenuPanel, SelectContent, MultiSelectContent (Non-Teleported)** - `z-50`

- **Locations**:
  - `src/components/dropdown-menu/DropdownMenuPanel.vue:101`
  - `src/components/select/SelectContent.vue:75`
  - `src/components/select/MultiSelectContent.vue:79`
- **CSS Class**: `absolute z-50 top-full mt-1`
- **Context**: Ketika `teleport: false`
- **Reasoning**:
  - Positioned relative ke parent container
  - Cukup tinggi untuk berada di atas content normal
  - Tidak perlu setinggi teleported mode karena tidak di dalam Modal
  - Standard Tailwind z-index untuk dropdown

**Use Case:**

```vue
<!-- Simple dropdown without teleport -->
<DropdownMenuRoot>
  <DropdownMenuButton label="Actions" />
  <DropdownMenuPanel :teleport="false"> <!-- z-50 -->
    <DropdownMenuOption>Edit</DropdownMenuOption>
    <DropdownMenuOption>Delete</DropdownMenuOption>
  </DropdownMenuPanel>
</DropdownMenuRoot>
```

**Comparison:**

```
Teleported:     position: fixed, z-[9999], rendered in <body>
Non-Teleported: position: absolute, z-50, rendered in parent
```

---

### **Level 2: Input Icons Layer (20)**

#### **FormInputField & AdvancedInputField - Action Icons** - `z-20`

- **Locations**:
  - `src/components/form-input/FormInputField.vue:210`
  - `src/components/molecules/AdvancedInputField/AdvancedInputField.vue:204`
- **CSS Class**: `absolute top-[11px] right-1 z-20`
- **Context**: Container untuk eye icon (password toggle), clear button, character counter
- **Reasoning**:
  - Positioned absolute di dalam input field
  - Harus berada di atas input background (`bg-white`)
  - Harus tetap clickable dan tidak tertutup border/shadow
  - Z-20 cukup untuk local stacking context dalam form field

**Visual:**

```
┌──────────────────────────────────┐
│ [  Input Value Here        ] ✕👁 │ ← Icons at z-20
└──────────────────────────────────┘
   └─ Input field (z-auto)
```

**Components Included:**

- Eye icon (password visibility toggle)
- Clear button (X icon)
- Character counter

---

## 🎨 Visual Stacking Example

Ketika semua komponen ditampilkan bersamaan:

```
┌─────────────────────────────────────────────────────┐
│                    DropdownMenuPanel                │ z-[9999]
│  ┌────────────────────────────┐                     │
│  │ Option 1                   │                     │
│  │ Option 2                   │                     │
│  └────────────────────────────┘                     │
└─────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────┘ z-[9998] (DropdownMenuOverlay - transparent)
┌─────────────────────────────────────────────────────┐
│           ┌─────────────────────────┐               │
│           │   ModalContent          │               │ z-[999]
│           │  ┌──────────────────┐   │               │
│           │  │ Form Input    ✕👁│   │               │ z-20 (icons)
│           │  └──────────────────┘   │               │
│           │  [Button]  [Button]    │               │
│           └─────────────────────────┘               │
└─────────────────────────────────────────────────────┘ z-[998] (ModalOverlay - black/50)
─────────────────────────────────────────────────────── z-50 (non-teleported dropdown)
─────────────────────────────────────────────────────── z-20 (input icons)
─────────────────────────────────────────────────────── z-0/auto (base content)
```

---

## 📋 Complete Z-Index Table

| Z-Index Value | Component                  | Position   | Teleport | File                                                  | Use Case                                |
| ------------- | -------------------------- | ---------- | -------- | ----------------------------------------------------- | --------------------------------------- |
| `z-[9999]`    | DropdownMenuPanel          | `fixed`    | ✅ Yes   | `dropdown-menu/DropdownMenuPanel.vue`                 | Dropdown inside Modal                   |
| `z-[9999]`    | SelectContent              | `fixed`    | ✅ Yes   | `select/SelectContent.vue`                            | Select inside Modal                     |
| `z-[9999]`    | MultiSelectContent         | `fixed`    | ✅ Yes   | `select/MultiSelectContent.vue`                       | MultiSelect inside Modal                |
| `z-[9998]`    | DropdownMenuOverlay        | `fixed`    | ✅ Yes   | `dropdown-menu/DropdownMenuPanel.vue`                 | Click-outside detection for Dropdown    |
| `z-[9998]`    | SelectOverlay              | `fixed`    | ✅ Yes   | `select/SelectContent.vue`                            | Click-outside detection for Select      |
| `z-[9998]`    | MultiSelectOverlay         | `fixed`    | ✅ Yes   | `select/MultiSelectContent.vue`                       | Click-outside detection for MultiSelect |
| `z-[999]`     | ModalContent               | `fixed`    | ✅ Yes   | `modal/ModalContent.vue`                              | Dialog/Modal content box                |
| `z-[998]`     | ModalOverlay               | `fixed`    | ✅ Yes   | `modal/ModalOverlay.vue`                              | Modal backdrop with blur                |
| `z-50`        | DropdownMenuPanel          | `absolute` | ❌ No    | `dropdown-menu/DropdownMenuPanel.vue`                 | Normal dropdown (not in Modal)          |
| `z-50`        | SelectContent              | `absolute` | ❌ No    | `select/SelectContent.vue`                            | Normal select (not in Modal)            |
| `z-50`        | MultiSelectContent         | `absolute` | ❌ No    | `select/MultiSelectContent.vue`                       | Normal multiselect (not in Modal)       |
| `z-20`        | FormInputField (icons)     | `absolute` | ❌ No    | `form-input/FormInputField.vue`                       | Password eye, clear, counter icons      |
| `z-20`        | AdvancedInputField (icons) | `absolute` | ❌ No    | `molecules/AdvancedInputField/AdvancedInputField.vue` | Password eye, clear, counter icons      |
| `z-auto/0`    | All other components       | various    | ❌ No    | -                                                     | Normal page content                     |

---

## 🚀 Best Practices

### ✅ DO's

1. **Follow the hierarchy** - Jangan menambahkan z-index arbitrary yang bisa konflik
2. **Use Tailwind classes** - Prefer `z-[xxx]` notation untuk custom values
3. **Document new z-index** - Update dokumentasi ini jika menambah z-index baru
4. **Test with Modal** - Pastikan komponen overlay baru bekerja dengan Modal
5. **Consider teleport** - Untuk overlay/dropdown, pertimbangkan teleport mode

### ❌ DON'Ts

1. **Jangan gunakan z-index > 9999** - Reserved untuk Menu layer
2. **Jangan gunakan z-index 900-1000** - Reserved untuk Modal layer
3. **Jangan gunakan z-index inline style** - Use Tailwind classes untuk consistency
4. **Jangan lupa position** - z-index hanya bekerja dengan `position: relative/absolute/fixed/sticky`

---

## 🔧 Adding New Z-Index

Jika perlu menambahkan komponen baru dengan z-index:

### **Step 1: Tentukan Layer**

Pilih layer yang sesuai:

- **Overlay/Fullscreen**: 998-9999
- **Dropdown/Popup**: 40-60
- **Local Stacking**: 10-30
- **Minimal Lift**: 1-10

### **Step 2: Check Conflicts**

```bash
# Search existing z-index values
grep -r "z-\[" src/components/
grep -r "z-\d" src/components/
```

### **Step 3: Test Interaction**

Test komponen baru dengan:

- ✅ Modal (apakah perlu visible di atas/bawah?)
- ✅ Menu (apakah dropdown tetap berfungsi?)
- ✅ Input fields (apakah icon tetap clickable?)

### **Step 4: Update Documentation**

Update file ini dengan:

- Z-index value
- Component name
- Location (file path + line number)
- Reasoning
- Use case example

---

## 🔍 Debugging Z-Index Issues

### **Issue: Component tertutup/tidak visible**

**Diagnosis:**

```javascript
// Check z-index di browser DevTools
$0.style.zIndex // Selected element
getComputedStyle($0).zIndex // Computed value
```

**Common Causes:**

1. ❌ Parent dengan lower z-index (stacking context problem)
2. ❌ Missing `position` property (z-index tidak apply)
3. ❌ Conflicting z-index value dengan komponen lain
4. ❌ CSS specificity issue (inline style > class)

**Solution:**

1. Ensure parent tidak membuat stacking context yang conflict
2. Add `position: relative/absolute/fixed`
3. Check hierarchy table di atas untuk nilai yang sesuai
4. Use `!important` hanya sebagai last resort

### **Issue: Dropdown/Select tertutup oleh Modal**

**Solution:**

```vue
<!-- ✅ CORRECT: Use teleport (default) -->
<DropdownMenuPanel> <!-- z-[9999] > Modal's z-[999] -->
  <DropdownMenuOption>Item</DropdownMenuOption>
</DropdownMenuPanel>

<SelectContent> <!-- z-[9999] > Modal's z-[999] -->
  <SelectItem>Option</SelectItem>
</SelectContent>

<!-- ❌ WRONG: Disable teleport inside Modal -->
<DropdownMenuPanel :teleport="false"> <!-- z-50 < Modal's z-[999] -->
  <DropdownMenuOption>Item</DropdownMenuOption>
</DropdownMenuPanel>
```

---

## 📚 References

- [MDN: CSS Z-Index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)
- [MDN: Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
- [Tailwind CSS: Z-Index](https://tailwindcss.com/docs/z-index)

---

## 📝 Changelog

| Date       | Change                                    | Author |
| ---------- | ----------------------------------------- | ------ |
| 2025-10-06 | Initial documentation with all components | -      |

---

**Last Updated**: October 6, 2025  
**Maintained by**: Development Team  
**Status**: ✅ Active
