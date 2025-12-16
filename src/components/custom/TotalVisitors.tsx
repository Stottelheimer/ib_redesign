'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const chartData = [
  { date: 'Apr 7', visitors: 2400 },
  { date: 'Apr 15', visitors: 1398 },
  { date: 'Apr 23', visitors: 9800 },
  { date: 'May 1', visitors: 3908 },
  { date: 'May 9', visitors: 4800 },
  { date: 'May 17', visitors: 3800 },
  { date: 'May 26', visitors: 4300 },
];

interface TotalVisitorsProps {
  onFilterChange?: (value: string) => void;
}

export function TotalVisitors({ onFilterChange }: TotalVisitorsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('3-months');

  const handleFilterChange = (value: string) => {
    setSelectedPeriod(value);
    onFilterChange?.(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <CardTitle className="text-xl">Total Visitors</CardTitle>
            <CardDescription>Total for the last 3 months</CardDescription>
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="3-months" className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="1-month" className="text-xs">
                1 Monat
              </TabsTrigger>
              <TabsTrigger value="3-months" className="text-xs">
                3 Monate
              </TabsTrigger>
              <TabsTrigger value="yearly" className="text-xs">
                7 Tage
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Chart */}
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="date"
                stroke="var(--color-muted-foreground)"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="hsl(217 91% 60%)"
                dot={{ fill: 'hsl(217 91% 60%)', r: 4 }}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
