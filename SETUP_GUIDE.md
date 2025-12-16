# B2B Tool Setup Guide - shadcn/ui Implementation

## ✅ Setup Complete!

Your project has been configured with:
- ✅ Next.js 16+ with App Router
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS v4 with CSS variables
- ✅ shadcn/ui component library
- ✅ ESLint configured
- ✅ src/ directory structure
- ✅ Project folders ready for Figma screens

---

## 📁 Project Structure

```
ib_redesign/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles with CSS vars
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (auto-generated)
│   │   │   └── card.tsx
│   │   │   └── button.tsx
│   │   │   └── ... (add with 'npx shadcn@latest add')
│   │   └── custom/             # Your custom components
│   │       └── ExampleCard.tsx
│   ├── lib/
│   │   └── utils.ts            # shadcn utility functions
│   └── hooks/                  # Custom React hooks
├── screens/                     # Figma screen implementations
│   └── [YourScreenName]/
│       ├── page.tsx
│       └── layout.tsx
├── components.json             # shadcn configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md
```

---

## 🚀 Getting Started

### 1. Start Development Server
```bash
cd /Users/joshua.folaji/ib_redesign
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000)

### 2. Add shadcn Components as Needed
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
# ... and many more available
```

### 3. Create Screen Components in `/screens`
```bash
# Example structure for a Dashboard screen:
mkdir -p screens/dashboard
touch screens/dashboard/page.tsx
touch screens/dashboard/layout.tsx
```

---

## 🎨 Workflow: Figma → Code

### Step 1: Export from Figma
- Export your Figma design
- Place components in appropriate location

### Step 2: Create Component File
Create file: `src/components/custom/MyComponent.tsx`

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Step 3: Component Validation
I will verify:
- ✓ All UI elements match shadcn/ui components
- ✓ Props and APIs are correctly used
- ✓ Tailwind classes are properly applied
- ✓ Accessibility standards (a11y) are met
- ✓ TypeScript types are correct
- ✓ Component composition patterns

---

## 📦 Available shadcn/ui Components

Visit: https://ui.shadcn.com/docs/components

**Commonly Used:**
- `button` - Button component
- `card` - Card container
- `input` - Text input
- `label` - Form label
- `form` - Form builder
- `select` - Dropdown select
- `checkbox` - Checkbox input
- `radio-group` - Radio buttons
- `textarea` - Multi-line text
- `dialog` - Modal dialog
- `dropdown-menu` - Dropdown menu
- `sheet` - Sidebar/drawer
- `tabs` - Tab navigation
- `tooltip` - Hover tooltips
- `table` - Data table
- `badge` - Status badge
- `alert` - Alert messages
- `skeleton` - Loading skeleton
- And 30+ more...

---

## 🛠️ Key Configuration Files

### `components.json`
```json
{
  "style": "new-york",              // Design system style
  "rsc": true,                       // React Server Components enabled
  "tsx": true,                       // TypeScript enabled
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true             // CSS variable support
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### `tailwind.config.ts`
Configured with:
- CSS variables for colors
- shadcn/ui base colors
- Extended utilities
- Dark mode support

### `src/app/globals.css`
Contains:
- CSS variables for theme colors
- Base Tailwind styles
- shadcn/ui styles

---

## 💡 Best Practices

### Naming Conventions
- Components: PascalCase (`MyComponent.tsx`)
- Files in `/custom`: PascalCase
- Screens: kebab-case (`dashboard-screen.tsx`)

### Component Organization
```tsx
// 1. Imports
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

// 3. Component
export function MyComponent({ title, onClick }: MyComponentProps) {
  return <Button onClick={onClick}>{title}</Button>;
}
```

### Styling
- Use Tailwind classes from `globals.css`
- Leverage CSS variables: `bg-background`, `text-foreground`
- Keep custom CSS minimal
- Use `cn()` utility for conditional classes:
  ```tsx
  import { cn } from '@/lib/utils';
  
  <div className={cn("base-class", isActive && "active-class")} />
  ```

### Accessibility (a11y)
- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

---

## 📝 Example: Building a Custom Card Component

**File: `src/components/custom/DashboardCard.tsx`**
```tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function DashboardCard({
  title,
  description,
  children,
  actionLabel,
  onAction,
}: DashboardCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        {actionLabel && (
          <Button onClick={onAction} className="w-full">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## ⚙️ npm Scripts

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Run production server
npm run lint         # Run ESLint
npx shadcn@latest add [component]  # Add shadcn component
```

---

## 🔗 Resources

- **shadcn/ui Docs**: https://ui.shadcn.com
- **shadcn/ui Components**: https://ui.shadcn.com/docs/components
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org

---

## 🎯 Next Steps

1. **Start dev server**: `npm run dev`
2. **Add components**: `npx shadcn@latest add [component-name]`
3. **Create screens**: Place files in `/screens` folder
4. **Build components**: Combine shadcn elements in `/src/components/custom/`
5. **Share design**: Send Figma screens, I'll validate & optimize

---

## ❓ Questions?

When you import Figma screens:
- Share the screen URL or image
- I'll identify all UI elements
- Cross-reference with shadcn/ui library
- Provide optimized component code
- Ensure full compatibility

**Ready to build!** 🚀
