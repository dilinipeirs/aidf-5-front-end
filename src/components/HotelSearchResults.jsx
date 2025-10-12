import HotelCard from "@/components/HotelCard";
import { useGetHotelsBySearchQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { resetQuery } from "@/lib/features/searchSlice";
import { Button } from "./ui/button";
import { X } from "lucide-react";

function HotelListings() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  const handleClearResults = () => {
    dispatch(resetQuery());
  };

  const {
    data: hotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetHotelsBySearchQuery(query);

  const isLoading = isHotelsLoading;
  const isError = isHotelsError;
  const error = [hotelsError];

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hotels vibing with your experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the best hotels for your next trip that suites your taste.
          </p>
        </div>
        <Skeleton className="h-6 flex items-center flex-wrap gap-x-4" />
        <Skeleton className="h-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <div className="mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hotels vibing with your experience
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the best hotels for your next trip that suites your taste.
            </p>
            </div>
            <Button
              variant="outline"
              onClick={handleClearResults}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear Search
            </Button>
          </div>
        </div>
        <p className="text-red-500">Error loading data </p>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-8">
      <div className="mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hotels vibing with your experience
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the best hotels for your next trip that suites your taste.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearResults}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear Search
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {hotels.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </section>
  );
}

export default HotelListings;
