import { HotelCardComplex } from "@/components/HotelCardComplex"

export function HotelGrid({ hotels, viewMode }) {
  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🏨</div>
        <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {hotels.map((hotel) => (
          <HotelCardComplex key={hotel.id} hotel={hotel} viewMode="list" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCardComplex key={hotel.id} hotel={hotel} viewMode="grid" />
      ))}
    </div>
  )
}
