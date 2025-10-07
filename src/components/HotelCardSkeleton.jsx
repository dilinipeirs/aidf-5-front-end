import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function HotelCardSkeleton({ viewMode = "grid" }) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <Skeleton className="w-full md:w-80 h-64" />
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-64" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  )
}

