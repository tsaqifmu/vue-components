# Z-Index Hierarchy Documentation

Dokumentasi ini menjelaskan hierarki z-index untuk semua komponen dalam project ini, memastikan layering yang konsisten dan tidak ada konflik visual.

---

## 📊 Z-Index Hierarchy (Highest to Lowest)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Z-INDEX STACK ORDER                          │
└─────────────────────────────────────────────────────────────────────┘

┌────────── Level 5: Menu Layer (9998-9999) ──────────┐
│                                                      │
│  z-[9999]  MenuPanel (teleported)                   │ ← HIGHEST
│  z-[9998]  MenuOverlay (teleported)                 │
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
┌────────── Level 3: Dropdown (50) ───────────────────┐
│                                                      │
│  z-50      MenuPanel (non-teleported)               │
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

### **Level 5: Menu Layer (9998-9999)** - HIGHEST

#### **MenuPanel (Teleported)** - `z-[9999]`

- **Location**: `src/components/menu/MenuPanel.vue:100`
- **CSS Class**: `fixed z-[9999]`
- **Context**: Ketika `teleport: true` (default)
- **Reasoning**:
  - Harus berada di atas semua komponen termasuk Modal
  - Memungkinkan menu dropdown bekerja di dalam Modal
  - Z-index tertinggi untuk memastikan tidak tertutup apapun

**Use Case:**

```vue
<!-- Menu inside Modal - needs highest z-index -->
<ModalContent>
  <MenuRoot>
    <MenuButton label="Select" />
    <MenuPanel> <!-- z-[9999] -->
      <MenuOption>Option 1</MenuOption>
    </MenuPanel>
  </MenuRoot>
</ModalContent>
```

#### **MenuOverlay (Teleported)** - `z-[9998]`

- **Location**: `src/components/menu/MenuPanel.vue:91`
- **CSS Class**: `fixed inset-0 z-[9998]`
- **Context**: Transparent overlay untuk click-outside detection
- **Reasoning**:
  - Satu tingkat di bawah MenuPanel
  - Menutupi seluruh viewport termasuk Modal overlay
  - Memungkinkan detection click outside menu

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

### **Level 3: Dropdown Layer (50)**

#### **MenuPanel (Non-Teleported)** - `z-50`

- **Location**: `src/components/menu/MenuPanel.vue:100`
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
<MenuRoot>
  <MenuButton label="Actions" />
  <MenuPanel :teleport="false"> <!-- z-50 -->
    <MenuOption>Edit</MenuOption>
    <MenuOption>Delete</MenuOption>
  </MenuPanel>
</MenuRoot>
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
│                    MenuPanel                        │ z-[9999]
│  ┌────────────────────────────┐                     │
│  │ Option 1                   │                     │
│  │ Option 2                   │                     │
│  └────────────────────────────┘                     │
└─────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────┘ z-[9998] (MenuOverlay - transparent)
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

| Z-Index Value | Component                  | Position   | Teleport | File                           | Use Case                           |
| ------------- | -------------------------- | ---------- | -------- | ------------------------------ | ---------------------------------- |
| `z-[9999]`    | MenuPanel                  | `fixed`    | ✅ Yes   | `menu/MenuPanel.vue`           | Dropdown inside Modal              |
| `z-[9998]`    | MenuOverlay                | `fixed`    | ✅ Yes   | `menu/MenuPanel.vue`           | Click-outside detection for Menu   |
| `z-[999]`     | ModalContent               | `fixed`    | ✅ Yes   | `modal/ModalContent.vue`       | Dialog/Modal content box           |
| `z-[998]`     | ModalOverlay               | `fixed`    | ✅ Yes   | `modal/ModalOverlay.vue`       | Modal backdrop with blur           |
| `z-50`        | MenuPanel                  | `absolute` | ❌ No    | `menu/MenuPanel.vue`           | Normal dropdown (not in Modal)     |
| `z-20`        | FormInputField (icons)     | `absolute` | ❌ No    | `form-input/FormInputField`    | Password eye, clear, counter icons |
| `z-20`        | AdvancedInputField (icons) | `absolute` | ❌ No    | `molecules/AdvancedInputField` | Password eye, clear, counter icons |
| `z-auto/0`    | All other components       | various    | ❌ No    | -                              | Normal page content                |

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

### **Issue: Menu tertutup oleh Modal**

**Solution:**

```vue
<!-- ✅ CORRECT: Use teleport (default) -->
<MenuPanel> <!-- z-[9999] > Modal's z-[999] -->
  <MenuOption>Item</MenuOption>
</MenuPanel>

<!-- ❌ WRONG: Disable teleport inside Modal -->
<MenuPanel :teleport="false"> <!-- z-50 < Modal's z-[999] -->
  <MenuOption>Item</MenuOption>
</MenuPanel>
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
