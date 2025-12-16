'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InvoiceCardProps {
  title: string;
  value: string | number;
  dateRange: string;
  onViewAll?: () => void;
}

export function InvoiceCard({ title, value, dateRange, onViewAll }: InvoiceCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Big value */}
        <div>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>

        {/* Date range */}
        <p className="text-sm text-muted-foreground">{dateRange}</p>

        {/* Action button */}
        <Button variant="default" className="w-full sm:w-auto">
          Zu den Rechnungen
        </Button>
      </CardContent>
    </Card>
  );
}
