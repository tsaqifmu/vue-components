<div align="center">

# 🚀 Vue Kickstart

**A modern, feature-rich Vue.js starter template**

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

_Get up and running with Vue 3 in minutes, not hours!_

[🎯 Features](#-features) •
[🚀 Quick Start](#-quick-start) •
[📖 Documentation](#-documentation) •
[🛠️ Development](#️-development) •
[🤝 Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td>

### 🎨 **Modern Stack**

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for lightning-fast builds
- **Tailwind CSS v4** for styling

</td>
<td>

### 🧪 **Testing & Quality**

- **Vitest** for unit testing
- **ESLint** for code linting
- **Prettier** for code formatting
- Pre-configured test setup

</td>
</tr>
<tr>
<td>

### 🔧 **Developer Experience**

- Hot module replacement
- Vue DevTools integration
- Path aliases configured
- TypeScript strict mode

</td>
<td>

### 📱 **Production Ready**

- Optimized build output
- Tree-shaking enabled
- Modern browser targets
- SEO-friendly structure

</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** `^20.19.0 || >=22.12.0`
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd vue-kickstart

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

🎉 **That's it!** Open [http://localhost:5173](http://localhost:5173) to see your app.

## 📖 Documentation

### 📁 Project Structure

```
vue-kickstart/
├── 📁 public/              # Static assets
├── 📁 src/
│   ├── 📁 __tests__/       # Test files
│   ├── 📁 router/          # Vue Router configuration
│   ├── 📁 views/           # Page components
│   ├── 📄 App.vue          # Root component
│   ├── 📄 main.ts          # Application entry point
│   └── 📄 style.css        # Global styles
├── 📄 vite.config.ts       # Vite configuration
└── 📄 package.json         # Dependencies & scripts
```

### 🎯 Available Scripts

| Command      | Description                       | Usage             |
| ------------ | --------------------------------- | ----------------- |
| `dev`        | Start development server with HMR | `pnpm dev`        |
| `build`      | Build for production              | `pnpm build`      |
| `preview`    | Preview production build locally  | `pnpm preview`    |
| `test:unit`  | Run unit tests with Vitest        | `pnpm test:unit`  |
| `lint`       | Lint and auto-fix code            | `pnpm lint`       |
| `format`     | Format code with Prettier         | `pnpm format`     |
| `type-check` | Run TypeScript type checking      | `pnpm type-check` |

## 🛠️ Development

### 🎨 Styling with Tailwind CSS

This project uses **Tailwind CSS v4** for styling. The configuration is handled through Vite plugin:

```vue
<template>
  <div class="rounded-lg bg-blue-500 p-4 text-white">
    <h1 class="text-2xl font-bold">Hello Tailwind!</h1>
  </div>
</template>
```

### 🧭 Routing

Vue Router is pre-configured with:

- **History mode** for clean URLs
- **Lazy loading** for better performance
- **TypeScript support**

Add new routes in `src/router/index.ts`:

```typescript
{
  path: '/new-page',
  component: () => import('@/views/NewPage.vue')
}
```

### 🔧 Path Aliases

The project includes pre-configured path aliases:

```typescript
import Component from '@/components/Component.vue' // src/components/
import { helper } from '@/utils/helper' // src/utils/
```

### 🧪 Testing

Write tests using **Vitest** and **Vue Test Utils**:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '@/components/Component.vue'

describe('Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('Hello')
  })
})
```

## 🔧 Configuration

### 🎛️ IDE Setup

**Recommended setup:**

- [VS Code](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

**Disable Vetur** if you have it installed to avoid conflicts.

### ⚙️ Customization

<details>
<summary><b>🎨 Tailwind Configuration</b></summary>

Tailwind CSS v4 uses a new configuration approach. Customize your design system by modifying the CSS custom properties in your stylesheets.

</details>

<details>
<summary><b>🔧 Vite Configuration</b></summary>

Modify `vite.config.ts` to customize the build process:

```typescript
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Add your custom configuration here
})
```

</details>

<details>
<summary><b>📋 ESLint & Prettier</b></summary>

The project comes with pre-configured ESLint and Prettier settings. Customize them in:

- `eslint.config.ts` - ESLint rules
- `.prettierrc` - Prettier formatting options

</details>

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Popular Deployment Options

| Platform         | Command      | Documentation                                                              |
| ---------------- | ------------ | -------------------------------------------------------------------------- |
| **Netlify**      | `pnpm build` | [Deploy to Netlify](https://docs.netlify.com/site-deploys/create-deploys/) |
| **Vercel**       | `pnpm build` | [Deploy to Vercel](https://vercel.com/docs)                                |
| **GitHub Pages** | `pnpm build` | [Deploy to GitHub Pages](https://docs.github.com/en/pages)                 |

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📝 Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📚 Resources

### 📖 Learn More

- [Vue.js Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev/)

### 🆘 Need Help?

- 💬 [Vue.js Discord](https://discord.com/invite/vue)
- 📚 [Vue.js Forum](https://forum.vuejs.org/)
- 🐛 [Report Issues](https://github.com/your-username/vue-kickstart/issues)

---

<div align="center">

**Built with ❤️ using Vue.js**

⭐ **Star this repo if it helped you!** ⭐

</div>
