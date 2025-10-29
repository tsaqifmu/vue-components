# Z-Index Quick Reference

Quick reference untuk z-index values dalam project. Untuk detail lengkap, lihat `Z_INDEX_HIERARCHY.md`.

---

## 📊 Z-Index Values (Highest → Lowest)

```
z-[9999] → DropdownMenuPanel, SelectContent, MultiSelectContent (teleported)
z-[9998] → DropdownMenuOverlay, SelectOverlay, MultiSelectOverlay (teleported)
z-[999]  → ModalContent
z-[998]  → ModalOverlay
z-50     → DropdownMenuPanel, SelectContent, MultiSelectContent (non-teleported)
z-20     → FormInputField, AdvancedInputField (action icons)
z-auto   → Base Components
```

---

## 🎯 Common Use Cases

### **Need dropdown inside Modal?**

```vue
<DropdownMenuPanel></DropdownMenuPanel>
<SelectContent></SelectContent>
<MultiSelectContent></MultiSelectContent>
```

### **Need simple dropdown?**

```vue
<DropdownMenuPanel :teleport="false"></DropdownMenuPanel>
<SelectContent :teleport="false"></SelectContent>
<MultiSelectContent :teleport="false"></MultiSelectContent>
```

### **Need icons in input field?**

```vue
<div class="z-20"></div>
```

---

## ⚠️ Rules

1. **NEVER use z-index > 9999** (reserved for Dropdown/Select components)
2. **NEVER use z-index 900-1000** (reserved for Modal)
3. **ALWAYS use Tailwind classes** (`z-[xxx]` notation)
4. **ALWAYS test with Modal** for new overlay components

---

## 🔗 See Also

- **Full Documentation**: `Z_INDEX_HIERARCHY.md`
- **Dropdown Components**: `dropdown-menu/README.md`
- **Select Components**: `select/README.md`
- **Modal Components**: `modal/README.md`
