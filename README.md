# B2B Tool - shadcn/ui Implementation

A modern B2B tool built with Next.js, React, TypeScript, and shadcn/ui components.

## Project Setup

- **Framework**: Next.js with App Router
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: npm

## Project Structure

```
/src
  /app              - App Router pages
  /components       - React components
    /ui             - shadcn/ui components (auto-generated)
    /custom         - Custom components combining shadcn elements
  /lib              - Utility functions
/screens            - Figma design exports and screen components
```

## Workflow

### 1. Import Figma Screens
Place your Figma design exports in the `/screens` folder.

### 2. Build Components
- Components combining shadcn/ui elements go in `/src/components/custom/`
- Import shadcn/ui components from `/src/components/ui/` (auto-generated)

### 3. Component Validation
When importing screens from Figma, I will:
- Cross-reference all UI elements with the shadcn/ui component library
- Ensure proper component usage and API compatibility
- Verify Tailwind CSS class names
- Validate accessibility and prop combinations

## Adding shadcn Components

To add a new shadcn/ui component:
```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Build for production
npm start        # Production server
npm run lint     # Run ESLint
```

## Getting Started

1. Run: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Start building screens in `/screens` folder
4. Use `npx shadcn@latest add` to add components as needed

---

**Ready to start!** Import your Figma screens and I'll validate the component usage against the shadcn library.
