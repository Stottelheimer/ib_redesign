'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExampleCardProps {
  title: string;
  description: string;
  onAction?: () => void;
}

export function ExampleCard({ title, description, onAction }: ExampleCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onAction} className="w-full">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
