"use client"

import { useState, useEffect } from "react"
import { FilterSidebar } from "@/components/FilterSidebar"
import { HotelGrid } from "@/components/HotelGrid"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "@/lib/api";
import { HotelGridSkeleton } from "@/components/HotelGridSkeleton"

// // Mock hotel data
// const mockHotels = [
//   {
//     id: 1,
//     name: "Grand Paris Vista",
//     location: "Paris, France",
//     rating: 4.7,
//     reviews: 342,
//     price: 160,
//     image: "/luxury-hotel-room-paris.jpg",
//     images: ["/luxury-hotel-room-paris.jpg", "/modern-hotel-bedroom.jpg"],
//     amenities: ["WiFi", "Pool", "Gym", "Spa", "Restaurant"],
//     starRating: 5,
//     guestRating: 4.7,
//   },
//   {
//     id: 2,
//     name: "Royal Lyon Harbor",
//     location: "Lyon, France",
//     rating: 4.6,
//     reviews: 289,
//     price: 170,
//     image: "/modern-hotel-bedroom.jpg",
//     images: ["/modern-hotel-bedroom.jpg", "/luxury-hotel-room-paris.jpg"],
//     amenities: ["WiFi", "Pool", "Parking", "Restaurant"],
//     starRating: 4,
//     guestRating: 4.6,
//   },
//   {
//     id: 3,
//     name: "Elegant Nice Gardens",
//     location: "Nice, France",
//     rating: 4.5,
//     reviews: 198,
//     price: 180,
//     image: "/elegant-hotel-dining-room.jpg",
//     images: ["/elegant-hotel-dining-room.jpg", "/luxury-hotel-room-paris.jpg"],
//     amenities: ["WiFi", "Gym", "Spa", "Bar"],
//     starRating: 5,
//     guestRating: 4.5,
//   },
//   {
//     id: 4,
//     name: "Majestic Bordeaux Plaza",
//     location: "Bordeaux, France",
//     rating: 4.6,
//     reviews: 256,
//     price: 190,
//     image: "/luxury-hotel-room-paris.jpg",
//     images: ["/luxury-hotel-room-paris.jpg", "/modern-hotel-bedroom.jpg"],
//     amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Bar"],
//     starRating: 5,
//     guestRating: 4.6,
//   },
//   {
//     id: 5,
//     name: "Coastal Retreat Marseille",
//     location: "Marseille, France",
//     rating: 4.3,
//     reviews: 167,
//     price: 140,
//     image: "/modern-hotel-bedroom.jpg",
//     images: ["/modern-hotel-bedroom.jpg", "/elegant-hotel-dining-room.jpg"],
//     amenities: ["WiFi", "Pool", "Parking"],
//     starRating: 4,
//     guestRating: 4.3,
//   },
//   {
//     id: 6,
//     name: "Alpine Lodge Chamonix",
//     location: "Chamonix, France",
//     rating: 4.8,
//     reviews: 412,
//     price: 220,
//     image: "/elegant-hotel-dining-room.jpg",
//     images: ["/elegant-hotel-dining-room.jpg", "/luxury-hotel-room-paris.jpg"],
//     amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Ski Storage"],
//     starRating: 5,
//     guestRating: 4.8,
//   },
// ]

export default function HotelsPage(
  // { hotels = [], isLoading = false, isError = false, error = null }
) {

  const {
    data: hotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery();


  const {
    data: locationObjects,
    isLoading: isLocationsLoading,
    isError: isLocationsError,
    error: locationsError,
  } = useGetAllLocationsQuery();

  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({
    locations: [],
    priceRange: [0, 500],
    starRatings: [],
    amenities: [],
    guestRating: 0,
  })
  const [filteredHotels, setFilteredHotels] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const hotelsPerPage = 6

  useEffect(() => {
    if (!hotels || hotels.length === 0) {
      setFilteredHotels([])
      return
    }

    let result = [...hotels]

    // Filter by location
    if (filters.locations.length > 0) {
      result = result.filter((hotel) => filters.locations.some((loc) => hotel.location.includes(loc)))
    }

    // Filter by price range
    result = result.filter((hotel) => hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1])

    // Filter by star rating
    if (filters.starRatings.length > 0) {
      result = result.filter((hotel) => filters.starRatings.includes(hotel.starRating))
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter((hotel) => filters.amenities.every((amenity) => hotel.amenities.includes(amenity)))
    }

    // Filter by guest rating
    if (filters.guestRating > 0) {
      result = result.filter((hotel) => hotel.rating >= filters.guestRating)
    }

    // Sort hotels
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredHotels(result)
    setCurrentPage(1)
  }, [hotels, filters, sortBy])

  // Pagination
  const indexOfLastHotel = currentPage * hotelsPerPage
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage

  // console.log(indexOfLastHotel);
  // console.log(indexOfFirstHotel);

  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel)
  // console.log(currentHotels);
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage)

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Discover Hotels</h2>
          <p className="text-muted-foreground">Browse our collection of premium hotels worldwide</p>
        </div>

        {(isHotelsError || isLocationsError) && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Failed to load hotels</h3>
              <p className="text-muted-foreground mb-4">
                {error?.message || "Something went wrong. Please try again later."}
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </div>
        )}

        {(isHotelsLoading || isLocationsLoading) && !(isHotelsError || isLocationsError) && (
          <div className="flex gap-8">
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="space-y-4">
                <div className="h-10 bg-muted rounded animate-pulse" />
                <div className="h-32 bg-muted rounded animate-pulse" />
                <div className="h-32 bg-muted rounded animate-pulse" />
                <div className="h-32 bg-muted rounded animate-pulse" />
              </div>
            </aside>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                <div className="h-10 w-48 bg-muted rounded animate-pulse" />
              </div>
              <HotelGridSkeleton viewMode={viewMode} count={6} />
            </div>
          </div>
        )}

        {!(isHotelsLoading || isLocationsLoading) && !hotelsError && (
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar locationObjects={locationObjects} filters={filters} setFilters={setFilters} />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">{filteredHotels.length} hotels found</p>

                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <FilterSidebar locationObjects={locationObjects} filters={filters} setFilters={setFilters} />
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured / Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating: High to Low</SelectItem>
                      <SelectItem value="name">Name: A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hotel Grid */}
              <HotelGrid hotels={currentHotels} viewMode={viewMode} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}