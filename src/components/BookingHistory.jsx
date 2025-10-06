import BookingCard from "./BookingCard"
import { useGetAllBookingsForUserQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function BookingHistory() {

  const { user } = useUser();
  const navigate = useNavigate();

  // console.log(user);

  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    isError: isBookingsError,
    error: bookingsError,
  } = useGetAllBookingsForUserQuery(user?.id, { skip: !user?.id });

  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
        <p className="text-gray-600">View and manage your hotel reservations</p>
      </div>
      <div className="space-y-4">
      {/* {bookings.map((booking) => ( */}
      {/* {isBookingsLoading && <div>Loading...</div>} */}
        {isBookingsLoading && (
          <div className="grid grid-cols-1 gap-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        )}
        {isBookingsError && <div className="text-red-600">{bookingsError?.data?.message || "Failed to load bookings"}</div>}
        {!isBookingsLoading && !isBookingsError && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <img
              src="https://cdn.vectorstock.com/i/preview-1x/72/11/airplane-travel-concept-with-map-pins-gps-points-vector-22997211.jpg"
              alt="No bookings"
              className="w-80 h-40 object-contain opacity-70 grayscale"
            />
            <p className="text-lg text-gray-700">You haven't done any bookings yet.</p>
            <p className="text-sm text-gray-500">Start exploring hotels and plan your next trip.</p>
            <Button onClick={() => navigate('/hotels')}>Search Your Next Destination</Button>
          </div>
        )}
        {!isBookingsLoading && !isBookingsError && bookings.map((booking) => (
          // console.log(booking),
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  )
}
