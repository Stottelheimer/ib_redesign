'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

export function MetricCard({ title, value, badge, trend, dateRange }: MetricCardProps) {
  const TrendIcon = trend.direction === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header with Title and Badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <Badge variant={badge.variant} className="whitespace-nowrap">
              {badge.label}
            </Badge>
          </div>

          {/* Value */}
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>

          {/* Trend */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{trend.label}</span>
            <TrendIcon className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Date Range */}
          <p className="text-xs text-muted-foreground">{dateRange}</p>
        </div>
      </CardContent>
    </Card>
  );
}
