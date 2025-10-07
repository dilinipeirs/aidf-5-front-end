import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star, Home, Hash } from "lucide-react"
import { format } from "date-fns";
import { useNavigate } from "react-router";

export default function BookingCard({ booking }) {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "PENDING":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "REFUNDED":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={booking.hotel.image || "/placeholder.svg"}
            alt={booking.hotel.name}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <CardContent className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div>
                <h3 className="text-xl font-semibold mb-1">{booking.hotel.name}</h3>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {booking.hotel.location}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{booking.hotel.rating}</span>
                <span className="text-gray-600 text-sm ml-1">({booking.hotel.reviews?.length === 0 ? 0: booking.hotel.reviews.length} Reviews)</span>
              </div>
            </div>
            <Badge className={getStatusColor(booking.paymentStatus)}>
              {booking.paymentStatus}
            </Badge>
          </div>

          <div className="mb-4">
            <div className="flex items-center text-sm mb-4">
              <Hash className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <p className="text-gray-600">Booking ID</p>
                <p className="font-medium font-mono">{booking._id}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-gray-600">Check-in</p>
                  <p className="font-medium">{format(booking.checkIn, "MMM dd, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-gray-600">Check-out</p>
                  <p className="font-medium">{format(booking.checkOut, "MMM dd, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-gray-600">Booked Date & Time</p>
                  <p className="font-medium">
                    {booking.bookingDate
                      ? format(new Date(booking.bookingDate), "MMM dd, yyyy - hh:mm a")
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Home className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-gray-600">Room Number</p>
                  <p className="font-medium">{booking.roomNumber || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p className="text-2xl font-bold">${booking.hotel.price}</p>
              <p className="text-sm text-gray-600">Total amount</p>
            </div>
            <div className="flex gap-2">
              {booking.isPast ? (
                <Button
                  onClick={() => {
                    const hotelId = booking.hotel._id || booking.hotel.id;
                    navigate(`/hotels/${hotelId}`);
                  }}
                >
                  Book Again
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={() =>
                    window.alert(
                      "This feature is not implemented yet. To cancel your booking, please call our customer support at 1-800-555-1234."
                    )
                  }
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
