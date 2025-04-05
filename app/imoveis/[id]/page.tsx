"use client";

import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This is a placeholder component - you'll want to fetch real data here
export default function PropertyPage({ params }: { params: { id: string } }) {
  // For now, we'll simulate a property not being found
  // Later you can replace this with actual data fetching logic
  if (!params.id) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Property ID: {params.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              This is a placeholder for property details. You can expand this
              component to show real property data once connected to your backend.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}