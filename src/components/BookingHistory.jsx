import BookingCard from "./BookingCard"
import { useGetAllBookingsForUserQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function BookingHistory() {

  // Filter value mappings
  const statusOptions = {
    "all": "Any",
    "PAID": "Paid",
    "PENDING": "Pending", 
    "UNDEFINED": "Undefined"
  }

  const dateOptions = {
    "all": "All Time",
    "last-3-months": "Last 3 Months",
    "last-6-months": "Last 6 Months", 
    "this-year": "This Year"
  }

  // states related to filters
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const { user } = useUser();
  const navigate = useNavigate();


  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    isError: isBookingsError,
    error: bookingsError,
  } = useGetAllBookingsForUserQuery(user?.id, { skip: !user?.id });

  const filteredBookings = bookings.filter((booking) => {
    // Filter by status
    if (statusFilter !== "all" && booking.paymentStatus !== statusFilter) {
      return false
    }

    // Filter by date range
    if (dateFilter !== "all") {
      const bookingDate = new Date(booking.bookingDate)
      const now = new Date()
      const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3))
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

      if (dateFilter === "last-3-months" && bookingDate < threeMonthsAgo) {
        return false
      }
      if (dateFilter === "last-6-months" && bookingDate < sixMonthsAgo) {
        return false
      }
      if (dateFilter === "this-year") {
        const currentYear = new Date().getFullYear()
        if (bookingDate.getFullYear() !== currentYear) {
          return false
        }
      }
    }

    return true
  })

  const resetFilters = () => {
    setStatusFilter("all")
    setDateFilter("all")
  }

  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
        <p className="text-gray-600">View and manage your hotel reservations</p>
      </div>

      {/* Filter component */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
            {/* Payment Status Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Payment Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Booking Date Range</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(dateOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reset Button */}
          <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto mt-2 md:mt-6 bg-transparent">
            Reset Filters
          </Button>
        </div>

        {/* Active Filters Display */}
        {(statusFilter !== "all" || dateFilter !== "all") && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Active filters:</span>
              {statusFilter !== "all" && (
                <span className="bg-gray-100 px-2 py-1 rounded">Status: {statusOptions[statusFilter]}</span>
              )}
              {dateFilter !== "all" && (
                <span className="bg-gray-100 px-2 py-1 rounded">Date: {dateOptions[dateFilter]}</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
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
              src="https://www.nicepng.com/png/detail/366-3662305_free-png-white-paper-planplane-png-images-transparent.png"
              alt="No bookings"
              className="w-80 h-40 object-contain opacity-70 grayscale"
            />
            <p className="text-lg text-gray-700">You haven't done any bookings yet.</p>
            <p className="text-sm text-gray-500">Start exploring hotels and plan your next trip.</p>
            <Button onClick={() => navigate('/hotels')}>Search Your Next Destination</Button>
          </div>
        )}
        {!isBookingsLoading && !isBookingsError && filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No bookings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        )}
        {/* // && bookings.map((booking) => (
        //   <BookingCard key={booking.id} booking={booking} />
        // ))} */}
      </div>
    </div>
  )
}
