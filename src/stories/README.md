# Storybook Documentation

## Button Component

Dokumentasi lengkap untuk komponen Button UI yang dapat digunakan kembali.

### Cara Menjalankan Storybook

```bash
# Install dependencies (jika belum)
npm install
# atau
pnpm install

# Jalankan Storybook
npm run storybook
# atau
pnpm storybook
```

### Fitur Dokumentasi

1. **Interactive Stories** - 12+ stories yang mencakup semua varian dan use cases
2. **Props Controls** - Kontrol interaktif untuk testing berbagai kombinasi props
3. **Code Examples** - Contoh kode Vue untuk setiap penggunaan
4. **Accessibility Guidelines** - Panduan aksesibilitas dan best practices
5. **Design Tokens** - Dokumentasi styling dan customization

### Stories yang Tersedia

- **Default Variants**: Default, Outline, Destructive, Ghost, Secondary, Link
- **Size Variants**: Small, Default, Icon
- **State Variants**: Disabled, Loading
- **Advanced**: WithIcon, AllVariants, Playground

### Struktur File

```
src/stories/
├── Button.stories.ts    # Stories utama dengan semua varian
├── Button.mdx          # Dokumentasi detail dengan panduan
└── README.md           # File ini
```

### Cara Menggunakan

1. Buka Storybook di browser (biasanya http://localhost:6006)
2. Navigasi ke **UI Components > Button**
3. Explore berbagai stories di sidebar
4. Gunakan **Controls** panel untuk testing props
5. Lihat **Docs** tab untuk dokumentasi lengkap
6. Copy code examples untuk implementasi

### Tips

- Gunakan **Playground** story untuk eksperimen bebas
- Lihat **AllVariants** untuk overview lengkap
- Perhatikan **Accessibility** guidelines untuk implementasi yang baik
- Gunakan code examples sebagai starting point untuk development
