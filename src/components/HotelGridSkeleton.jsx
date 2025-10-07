import { HotelCardSkeleton } from "@/components/HotelCardSkeleton"

export function HotelGridSkeleton({ viewMode = "grid", count = 6 }) {
    return (
      <div
        className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}
      >
        {Array.from({ length: count }).map((_, index) => (
          <HotelCardSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    )
}
  