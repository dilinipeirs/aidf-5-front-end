"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function FilterSidebar({ locationObjects, amenityObjects, filters, setFilters }) {

  // console.log(locationObjects);

  // iterate through locationObjects, and amenityObjects, and prepare a locations and amenities arrays
  const locations = locationObjects?.map(locationObj => locationObj.name); 
  const amenities = amenityObjects?.map(amenityObj => amenityObj.name);

  const [locationSearch, setLocationSearch] = useState("")
  const [priceRange, setPriceRange] = useState(filters.priceRange)

  const toggleLocation = (location) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location],
    }))
  }

  const toggleStarRating = (rating) => {
    setFilters((prev) => ({
      ...prev,
      starRatings: prev.starRatings.includes(rating)
        ? prev.starRatings.filter((r) => r !== rating)
        : [...prev.starRatings, rating],
    }))
  }

  const toggleAmenity = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }))
  }

  const handleGuestRating = (rating) => {
    setFilters((prev) => ({
      ...prev,
      guestRating: prev.guestRating === rating ? 0 : rating,
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      locations: [],
      priceRange: [0, 500],
      starRatings: [],
      amenities: [],
      guestRating: 0,
    })
    setPriceRange([0, 500])
    setLocationSearch("")
  }

  const filteredLocations = locations.filter((loc) => loc.toLowerCase().includes(locationSearch.toLowerCase()))

  const hasActiveFilters =
    filters.locations?.length > 0 ||
    filters.starRatings?.length > 0 ||
    filters.amenities?.length > 0 ||
    filters.guestRating > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 500

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.locations.map((location) => (
            <Badge key={location} variant="secondary" className="gap-1">
              {location}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleLocation(location)} />
            </Badge>
          ))}
          {filters.starRatings.map((rating) => (
            <Badge key={rating} variant="secondary" className="gap-1">
              {rating} Star
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleStarRating(rating)} />
            </Badge>
          ))}
          {filters.amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="gap-1">
              {amenity}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleAmenity(amenity)} />
            </Badge>
          ))}
        </div>
      )}

      <Separator />

      {/* Location Filter */}
      <div className="space-y-4">
        <h4 className="font-medium">Location</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {filteredLocations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.locations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              />
              <Label htmlFor={`location-${location}`} className="text-sm font-normal cursor-pointer">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range Filter */}
      <div className="space-y-4">
        <h4 className="font-medium">Price Range</h4>
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={handlePriceChange} max={500} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">${priceRange[0]}</span>
            <span className="text-muted-foreground">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Star Rating Filter */}
      <div className="space-y-4">
        <h4 className="font-medium">Star Rating</h4>
        <div className="space-y-3">
          {[5, 4, 3].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`star-${rating}`}
                checked={filters.starRatings.includes(rating)}
                onCheckedChange={() => toggleStarRating(rating)}
              />
              <Label htmlFor={`star-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                {"⭐".repeat(rating)}
                <span className="ml-2 text-muted-foreground">
                  {rating} Star{rating > 1 ? "s" : ""}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Guest Rating Filter */}
      <div className="space-y-4">
        <h4 className="font-medium">Guest Rating</h4>
        <div className="space-y-3">
          {[4.5, 4.0, 3.5].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`guest-${rating}`}
                checked={filters.guestRating === rating}
                onCheckedChange={() => handleGuestRating(rating)}
              />
              <Label htmlFor={`guest-${rating}`} className="text-sm font-normal cursor-pointer">
                {rating}+ and above
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities Filter */}
      <div className="space-y-4">
        <h4 className="font-medium">Amenities</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {amenities?.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal cursor-pointer">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
