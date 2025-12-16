# Dashboard Implementation - Quick Example

## How to Use the Dashboard Components

### Option 1: Complete Dashboard (Recommended for Getting Started)

**File: `src/app/page.tsx`**

```tsx
import { Dashboard } from '@/components/custom/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Dashboard />
    </main>
  );
}
```

This gives you the complete dashboard with all sections.

---

### Option 2: Individual Components (For Custom Layouts)

**File: `src/app/dashboard/page.tsx`**

```tsx
'use client';

import { MetricCard } from '@/components/custom/MetricCard';
import { TotalVisitors } from '@/components/custom/TotalVisitors';
import { InvoiceCard } from '@/components/custom/InvoiceCard';
import { DataTable } from '@/components/custom/DataTable';

interface TableRow {
  id: string;
  name: string;
  email: string;
  status: string;
  amount: string;
  date: string;
}

const data: TableRow[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    amount: '$1,200.00',
    date: '2024-01-15',
  },
  // ... more rows
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Klicks letzte Woche"
          value="1.234"
          badge={{ label: '+12.5%', variant: 'default' }}
          trend={{ label: 'Trending up this month', direction: 'up' }}
          dateRange="01.02. - 07.02."
        />
        <MetricCard
          title="Klicks letzter Monat"
          value="23.555"
          badge={{ label: '-3.2%', variant: 'destructive' }}
          trend={{ label: 'Trending down last month', direction: 'down' }}
          dateRange="01.02. - 07.02."
        />
        <MetricCard
          title="Klicks letzte Woche"
          value="1.234"
          badge={{ label: '+8.1%', variant: 'default' }}
          trend={{ label: 'Trending up this month', direction: 'up' }}
          dateRange="01.02. - 07.02."
        />
      </div>

      {/* Chart and Invoice */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TotalVisitors
            onFilterChange={(period) => {
              console.log('Period changed:', period);
              // Fetch new data based on period
            }}
          />
        </div>
        <InvoiceCard
          title="Rechnungen"
          value="Big text"
          dateRange="01.02. - 07.02."
          onViewAll={() => {
            // Navigate to invoices
            console.log('View all invoices');
          }}
        />
      </div>

      {/* Data Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <DataTable
          data={data}
          onRowSelect={(selectedIds) => {
            console.log('Selected rows:', selectedIds);
          }}
          onEdit={(id) => {
            console.log('Edit row:', id);
            // Navigate to edit page
          }}
          onDelete={(id) => {
            console.log('Delete row:', id);
            // Show confirmation dialog
          }}
        />
      </div>
    </div>
  );
}
```

---

### Option 3: Minimal Example

If you just want a few components, here's a minimal setup:

```tsx
'use client';

import { MetricCard } from '@/components/custom/MetricCard';
import { TotalVisitors } from '@/components/custom/TotalVisitors';

export default function SimplePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Users"
          value="1.234"
          badge={{ label: '+12.5%', variant: 'default' }}
          trend={{ label: 'Trending up', direction: 'up' }}
          dateRange="This month"
        />
      </div>
      <TotalVisitors />
    </div>
  );
}
```

---

## Common Tasks

### Customize the Chart Data

**File: `src/components/custom/TotalVisitors.tsx`**

```tsx
// Replace chartData with your data
const chartData = [
  { date: 'Jan 1', visitors: 2400 },
  { date: 'Jan 2', visitors: 1398 },
  // ... your data
];
```

### Add More Metric Cards

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <MetricCard {...card1} />
  <MetricCard {...card2} />
  <MetricCard {...card3} />
  <MetricCard {...card4} />
</div>
```

### Populate Table with Real Data

```tsx
import { Database } from '@supabase/supabase-js';

const { data: users } = await supabase
  .from('users')
  .select('*');

<DataTable
  data={users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    amount: formatCurrency(user.amount),
    date: formatDate(user.created_at),
  }))}
/>
```

### Connect to Your API

```tsx
'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/custom/DataTable';

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/transactions');
        const transactions = await response.json();
        setData(transactions);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <DataTable data={data} />;
}
```

---

## TypeScript Types Reference

### MetricCard Props
```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  badge: {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  trend: {
    label: string;
    direction: 'up' | 'down';
  };
  dateRange: string;
}
```

### DataTable Props
```typescript
interface DataTableProps {
  data: TableRow[];
  onRowSelect?: (selectedRows: string[]) => void;
  onEdit?: (rowId: string) => void;
  onDelete?: (rowId: string) => void;
}

interface TableRow {
  id: string;
  name: string;
  email: string;
  status: string;
  amount: string;
  date: string;
}
```

### InvoiceCard Props
```typescript
interface InvoiceCardProps {
  title: string;
  value: string | number;
  dateRange: string;
  onViewAll?: () => void;
}
```

---

## Styling & Customization

### Dark Mode
Components automatically support dark mode via CSS variables in `globals.css`.

### Custom Colors
Update CSS variables in `src/app/globals.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
  --primary: 217 91% 60%;
  --destructive: 0 84.2% 60.2%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
  }
}
```

### Spacing
Modify padding/gaps in components:
```tsx
<div className="space-y-4 p-4 sm:p-6 lg:p-8">
  {/* Adjust these values */}
</div>
```

---

## Performance Tips

1. **Memoize Heavy Components:**
```tsx
export const MetricCard = memo(function MetricCard(props: MetricCardProps) {
  return (/* ... */);
});
```

2. **Lazy Load Table:**
```tsx
import dynamic from 'next/dynamic';

const DataTable = dynamic(() => import('@/components/custom/DataTable'), {
  loading: () => <div>Loading table...</div>,
});
```

3. **Optimize Chart:**
```tsx
// Use only the data points you need
const chartData = data.slice(0, 30);
```

---

## Testing

### Unit Test Example
```tsx
import { render, screen } from '@testing-library/react';
import { MetricCard } from '@/components/custom/MetricCard';

describe('MetricCard', () => {
  it('displays the metric value', () => {
    render(
      <MetricCard
        title="Test"
        value="123"
        badge={{ label: '+10%', variant: 'default' }}
        trend={{ label: 'Up', direction: 'up' }}
        dateRange="Jan 2024"
      />
    );
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
```

---

## Troubleshooting

### "Module not found" error
Make sure all imports use `@/` path:
```tsx
// ✅ Correct
import { MetricCard } from '@/components/custom/MetricCard';

// ❌ Wrong
import { MetricCard } from './components/custom/MetricCard';
```

### Chart not showing
Verify `recharts` is installed:
```bash
npm list recharts
```

### Table rows not appearing
Check that `data` prop has correct structure:
```tsx
const data = [
  { id: '1', name: 'John', email: 'john@example.com', status: 'Active', amount: '$100', date: '2024-01-15' }
];
```

---

## Next Steps

1. ✅ Run `npm run dev`
2. ✅ Import Dashboard or individual components
3. ✅ Replace sample data with real data
4. ✅ Connect to your API
5. ✅ Customize styling as needed
6. ✅ Deploy!

---

**Ready to build!** Start with `npm run dev` and import the Dashboard component. 🚀
