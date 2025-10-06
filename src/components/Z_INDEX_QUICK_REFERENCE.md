# Z-Index Quick Reference

Quick reference untuk z-index values dalam project. Untuk detail lengkap, lihat `Z_INDEX_HIERARCHY.md`.

---

## 📊 Z-Index Values (Highest → Lowest)

```
z-[9999] → MenuPanel (teleported)
z-[9998] → MenuOverlay (teleported)
z-[999]  → ModalContent
z-[998]  → ModalOverlay
z-50     → MenuPanel (non-teleported)
z-20     → Input Action Icons
z-auto   → Base Components
```

---

## 🎯 Common Use Cases

### **Need dropdown inside Modal?**

```vue
<MenuPanel></MenuPanel>
```

### **Need simple dropdown?**

```vue
<MenuPanel :teleport="false"></MenuPanel>
```

### **Need icons in input field?**

```vue
<div class="z-20"></div>
```

---

## ⚠️ Rules

1. **NEVER use z-index > 9999** (reserved for Menu)
2. **NEVER use z-index 900-1000** (reserved for Modal)
3. **ALWAYS use Tailwind classes** (`z-[xxx]` notation)
4. **ALWAYS test with Modal** for new overlay components

---

## 🔗 See Also

- **Full Documentation**: `Z_INDEX_HIERARCHY.md`
- **Menu Components**: `menu/README.md`
- **Modal Components**: `modal/README.md`
