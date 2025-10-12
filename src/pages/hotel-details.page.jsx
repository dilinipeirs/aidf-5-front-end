import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddReviewMutation, useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { Building2, Coffee, MapPin, PlusCircle, Star, Wifi, ChevronLeft, ChevronRight, Dumbbell, Utensils, Waves, ParkingCircle, Bed, Phone, Heart, Plane } from "lucide-react";
import { useParams } from "react-router";
import { BookingDialog } from "@/components/BookingDialog";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const HotelDetailsPage = () => {
  const { _id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);
  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { user } = useUser();

  // Reset image index when hotel data changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [hotel?._id]);

  // Amenity icon mapping for specific hotel amenities
  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    
    // WiFi
    if (amenityLower === 'wifi' || amenityLower === 'wi-fi') {
      return <Wifi className="h-5 w-5 mr-2" />;
    }
    
    // Pool
    if (amenityLower === 'pool') {
      return <Waves className="h-5 w-5 mr-2" />;
    }
    
    // Gym
    if (amenityLower === 'gym') {
      return <Dumbbell className="h-5 w-5 mr-2" />;
    }
    
    // Spa
    if (amenityLower === 'spa') {
      return <Bed className="h-5 w-5 mr-2" />;
    }
    
    // Restaurant
    if (amenityLower === 'restaurant') {
      return <Utensils className="h-5 w-5 mr-2" />;
    }
    
    // Bar
    if (amenityLower === 'bar') {
      return <Coffee className="h-5 w-5 mr-2" />;
    }
    
    // Parking
    if (amenityLower === 'parking') {
      return <ParkingCircle className="h-5 w-5 mr-2" />;
    }
    
    // Pet Friendly
    if (amenityLower === 'pet friendly' || amenityLower === 'pet-friendly') {
      return <Heart className="h-5 w-5 mr-2" />;
    }
    
    // Airport Shuttle
    if (amenityLower === 'airport shuttle' || amenityLower === 'airport-shuttle') {
      return <Plane className="h-5 w-5 mr-2" />;
    }
    
    // Room Service
    if (amenityLower === 'room service' || amenityLower === 'room-service') {
      return <Phone className="h-5 w-5 mr-2" />;
    }
    
    // Default icon for unknown amenities
    return <Building2 className="h-5 w-5 mr-2" />;
  };

  const nextImage = () => {
    const images = hotel?.images || [];
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    const images = hotel?.images || [];
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handleAddReview = async () => {
    try {
      await addReview({
        hotelId: _id,
        comment: "This is a test review",
        rating: 5,
      }).unwrap();
    } catch (error) {}
  };

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

  if (isLoading) {
    return (
      <main className="px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative w-full h-[400px]">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-9 w-48" />
                <div className="flex items-center mt-2">
                  <Skeleton className="h-5 w-5 mr-1" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-24 w-full" />
            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-7 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-28" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Error Loading Hotel Details
        </h2>
        <p className="text-muted-foreground">
          {error?.data?.message ||
            "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  }

  return (
    <main className="px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-[400px] group">
            <img
              src={hotel.images?.[currentImageIndex] || hotel.image || "/placeholder.svg"}
              alt={hotel.name}
              className="absolute object-cover rounded-lg w-full h-full"
            />
            {hotel.images && hotel.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {hotel.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">Rooftop View</Badge>
            <Badge variant="secondary">French Cuisine</Badge>
            <Badge variant="secondary">City Center</Badge>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                <p className="text-muted-foreground">{hotel.location}</p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Star className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-bold">{hotel?.rating ?? "No rating"}</span>
            <span className="text-muted-foreground">
              ({hotel?.reviews.length === 0 ? "No" : hotel?.reviews.length}{" "}
              Reviews)
            </span>
          </div>
          <p className="text-muted-foreground">{hotel.description}</p>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              {hotel?.amenities && hotel.amenities.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-center py-4">
                  <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No amenities listed</p>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${hotel.price}</p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>
            <Button
              disabled={isAddReviewLoading}
              className={`${isAddReviewLoading ? "opacity-50" : ""}`}
              onClick={handleAddReview}
            >
              <PlusCircle className="w-4 h-4" /> Add Review
            </Button>
            <BookingDialog
              hotelName={hotel.name}
              hotelId={_id}
              onSubmit={handleBook}
              isLoading={isCreateBookingLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelDetailsPage;
