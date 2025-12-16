# shadcn/ui Component Reference

## Quick Command to Add Components

```bash
npx shadcn@latest add <component-name>
```

---

## All Available Components

### Form & Input Components
| Component | Command | Use Case |
|-----------|---------|----------|
| Input | `npx shadcn@latest add input` | Text field |
| Textarea | `npx shadcn@latest add textarea` | Multi-line text |
| Select | `npx shadcn@latest add select` | Dropdown menu |
| Checkbox | `npx shadcn@latest add checkbox` | Multiple choice |
| Radio Group | `npx shadcn@latest add radio-group` | Single choice |
| Toggle | `npx shadcn@latest add toggle` | On/off button |
| Switch | `npx shadcn@latest add switch` | Toggle switch |
| Combobox | `npx shadcn@latest add combobox` | Searchable dropdown |
| Command | `npx shadcn@latest add command` | Command palette |

### Display & Container Components
| Component | Command | Use Case |
|-----------|---------|----------|
| Card | `npx shadcn@latest add card` | Content container |
| Badge | `npx shadcn@latest add badge` | Status/tag |
| Alert | `npx shadcn@latest add alert` | Alert message |
| Alert Dialog | `npx shadcn@latest add alert-dialog` | Confirmation dialog |
| Tooltip | `npx shadcn@latest add tooltip` | Hover information |
| Progress | `npx shadcn@latest add progress` | Progress bar |
| Skeleton | `npx shadcn@latest add skeleton` | Loading placeholder |

### Navigation Components
| Component | Command | Use Case |
|-----------|---------|----------|
| Tabs | `npx shadcn@latest add tabs` | Tab navigation |
| Dropdown Menu | `npx shadcn@latest add dropdown-menu` | Menu dropdown |
| Breadcrumb | `npx shadcn@latest add breadcrumb` | Path navigation |
| Pagination | `npx shadcn@latest add pagination` | Page navigation |
| Navigation Menu | `npx shadcn@latest add navigation-menu` | Main navigation |
| Sidebar | `npx shadcn@latest add sidebar` | Side navigation |

### Modal & Overlay Components
| Component | Command | Use Case |
|-----------|---------|----------|
| Dialog | `npx shadcn@latest add dialog` | Modal dialog |
| Sheet | `npx shadcn@latest add sheet` | Sidebar drawer |
| Drawer | `npx shadcn@latest add drawer` | Slide-out panel |
| Popover | `npx shadcn@latest add popover` | Pop-up content |

### Data Display Components
| Component | Command | Use Case |
|-----------|---------|----------|
| Table | `npx shadcn@latest add table` | Data table |
| Carousel | `npx shadcn@latest add carousel` | Image carousel |

### Button Components
| Component | Command | Use Case |
|-----------|---------|----------|
| Button | `npx shadcn@latest add button` | Click action |
| Button Group | (Use Button) | Group of buttons |

### Typography & Text
| Component | Command | Use Case |
|-----------|---------|----------|
| (Use Tailwind) | N/A | Use Tailwind classes directly |

### Form Builder
| Component | Command | Use Case |
|-----------|---------|----------|
| Form | `npx shadcn@latest add form` | Full form validation |
| Label | `npx shadcn@latest add label` | Form labels |

### Loading & Status
| Component | Command | Use Case |
|-----------|---------|----------|
| Spinner | (Use custom) | Loading spinner |
| Toast | `npx shadcn@latest add sonner` | Toast notifications |
| Sonner | `npx shadcn@latest add sonner` | Notifications |

---

## Installation Batch Commands

Add multiple components at once:

```bash
# Form essentials
npx shadcn@latest add form input select checkbox textarea

# Navigation
npx shadcn@latest add tabs dropdown-menu breadcrumb pagination

# Modals & Overlays
npx shadcn@latest add dialog sheet popover alert-dialog

# Data Display
npx shadcn@latest add table card badge

# Common set
npx shadcn@latest add button card input form alert dialog sheet tabs
```

---

## Component Usage Examples

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button size="sm">Small</Button>
<Button disabled>Disabled</Button>
```

### Card
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Input
```tsx
import { Input } from '@/components/ui/input';

<Input type="email" placeholder="Enter email" />
```

### Select
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Dialog
```tsx
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>Dialog content</DialogContent>
</Dialog>
```

### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

## Adding Custom Components

After adding a component, it lives in `/src/components/ui/component-name.tsx`

To use it:
```tsx
import { MyComponent } from '@/components/ui/my-component';
```

---

## Need More?

- **Full Component Docs**: https://ui.shadcn.com/docs/components
- **Search all components**: https://ui.shadcn.com/docs/components/accordion (change URL)
- **Accessibility**: All components have built-in a11y support

---

## Pro Tips

1. **Check the docs** before using - each component has detailed examples
2. **Props are composable** - components accept standard HTML attributes
3. **Use variants** - Most components have `variant`, `size`, `state` props
4. **Extend with Tailwind** - Customize appearance with className prop
5. **TypeScript support** - All components are fully typed

