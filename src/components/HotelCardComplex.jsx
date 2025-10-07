"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router";
import { useCreateBookingMutation } from "@/lib/api";
import { BookingDialog } from "@/components/BookingDialog";

export function HotelCardComplex({ hotel, viewMode }) {
  const navigate = useNavigate();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleBook = async (bookingData) => {
    try {
      const result = await createBooking({
        hotelId: _id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
      }).unwrap();
      navigate(`/booking/payment?bookingId=${result._id}`);
    } catch (error) {}
  };

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1))
  }

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative w-full sm:w-80 h-64 sm:h-auto flex-shrink-0 group">
            <img
              src={hotel.images?.[currentImageIndex] || hotel.image || "/placeholder.svg"}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            {hotel.images?.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {hotel.images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
            <Badge className="absolute top-3 right-3">{"⭐".repeat(hotel.starRating)}</Badge>
          </div>

          {/* Content Section */}
          <CardContent className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({hotel.reviews?.length ?? "No"} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities?.slice(0, 5).map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                  {hotel.amenities?.length > 5 && <Badge variant="secondary">+{hotel.amenities?.length - 5} more</Badge>}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="text-2xl font-bold">${hotel.price}</p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline"
                  onClick={() => {
                    const hotelId = hotel._id || hotel.id;
                    navigate(`/hotels/${hotelId}`);
                  }}> View Details</Button>
                  <BookingDialog
                    hotelName={hotel.name}
                    hotelId={hotel._id}
                    onSubmit={handleBook}
                    isLoading={isCreateBookingLoading}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="relative h-56 group">
        <img
          src={hotel.images?.[currentImageIndex] || hotel.image || "/placeholder.svg"}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        {hotel.images?.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {hotel.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
        <Badge className="absolute top-3 right-3">{"⭐".repeat(hotel.starRating)}</Badge>
      </div>

      {/* Content Section */}
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{hotel.name}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{hotel.location}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{hotel.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({hotel.reviews?.length ?? "No"} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities?.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {hotel.amenities?.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{hotel.amenities?.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-end justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">From</p>
            <p className="text-2xl font-bold">${hotel.price}</p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="sm" variant="outline" className="w-full bg-transparent"
            onClick={() => {
              const hotelId = hotel._id || hotel.id;
              navigate(`/hotels/${hotelId}`);
            }}
            >
              View Details
            </Button>
            <BookingDialog
                    hotelName={hotel.name}
                    hotelId={hotel._id}
                    onSubmit={handleBook}
                    isLoading={isCreateBookingLoading}
            />
            {/* <Button size="sm" className="w-full">
              Book Now
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
