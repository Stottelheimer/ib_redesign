'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { MetricCard } from './MetricCard';
import { TotalVisitors } from './TotalVisitors';
import { InvoiceCard } from './InvoiceCard';
import { DataTable } from './DataTable';

// Sample data
const metricCards = [
  {
    title: 'Klicks letzte Woche',
    value: '1.234',
    badge: { label: '+12.5%', variant: 'default' as const },
    trend: { label: 'Trending up this month', direction: 'up' as const },
    dateRange: '01.02. - 07.02.',
  },
  {
    title: 'Klicks letzter Monat',
    value: '23.555',
    badge: { label: '-3.2%', variant: 'destructive' as const },
    trend: { label: 'Trending down last month', direction: 'down' as const },
    dateRange: '01.02. - 07.02.',
  },
  {
    title: 'Klicks letzte Woche',
    value: '1.234',
    badge: { label: '+8.1%', variant: 'default' as const },
    trend: { label: 'Trending up this month', direction: 'up' as const },
    dateRange: '01.02. - 07.02.',
  },
];

const tableData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    amount: '$1,200.00',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Pending',
    amount: '$2,500.00',
    date: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'Active',
    amount: '$800.00',
    date: '2024-01-13',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    status: 'Inactive',
    amount: '$3,100.00',
    date: '2024-01-12',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    status: 'Active',
    amount: '$950.00',
    date: '2024-01-11',
  },
  {
    id: '6',
    name: 'Diana Martinez',
    email: 'diana@example.com',
    status: 'Active',
    amount: '$2,200.00',
    date: '2024-01-10',
  },
  {
    id: '7',
    name: 'Edward Taylor',
    email: 'edward@example.com',
    status: 'Pending',
    amount: '$1,750.00',
    date: '2024-01-09',
  },
  {
    id: '8',
    name: 'Fiona Anderson',
    email: 'fiona@example.com',
    status: 'Active',
    amount: '$3,450.00',
    date: '2024-01-08',
  },
  {
    id: '9',
    name: 'George Thomas',
    email: 'george@example.com',
    status: 'Active',
    amount: '$1,100.00',
    date: '2024-01-07',
  },
  {
    id: '10',
    name: 'Hannah Jackson',
    email: 'hannah@example.com',
    status: 'Active',
    amount: '$2,800.00',
    date: '2024-01-06',
  },
];

export function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight">Übersicht</h1>
          </div>

          {/* Alert */}
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Error: This is a rather unstyled error box.</AlertDescription>
          </Alert>

          {/* Metric Cards - Responsive Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metricCards.map((card, index) => (
              <MetricCard key={index} {...card} />
            ))}
          </div>

          {/* Total Visitors and Invoice Card */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Total Visitors - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2">
              <TotalVisitors />
            </div>

            {/* Invoice Card */}
            <InvoiceCard
              title="Rechnungen"
              value="Big text"
              dateRange="01.02. - 07.02."
              onViewAll={() => console.log('Navigate to invoices')}
            />
          </div>

          {/* Data Table Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Transactions</h2>
            <DataTable
              data={tableData}
              onEdit={(id) => console.log('Edit row:', id)}
              onDelete={(id) => console.log('Delete row:', id)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
