import HotelCard from "@/components/HotelCard";
import { getAllHotels, getAllLocations } from "@/lib/api";
import { useState, useEffect } from "react";
import LocationTab from "./LocationTab";

function HotelListings() {
  const [hotels, setHotels] = useState([]);
  const [isHotelsLoading, setIsHotelsLoading] = useState(true);
  const [isHotelsError, setIsHotelsError] = useState(false);
  const [hotelsError, setHotelsError] = useState(null);

  const [locations, setLocations] = useState([]);
  const [isLocationsLoading, setIsLocationsLoading] = useState(true);
  const [isLocationsError, setIsLocationsError] = useState(false);
  const [locationsError, setLocationsError] = useState(null);

  const isLoading = isHotelsLoading || isLocationsLoading;
  const isError = isHotelsError || isLocationsError;
  const error = [hotelsError, locationsError];

  const allLocations = [{ _id: 0, name: "All" }].concat(locations);

  useEffect(() => {
    getAllHotels()
      .then((data) => {
        setHotels(data);
      })
      .catch((error) => {
        setIsHotelsError(true);
        setHotelsError(error);
      })
      .finally(() => {
        setIsHotelsLoading(false);
      });

    getAllLocations()
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        setIsLocationsError(true);
        setLocationsError(error);
      })
      .finally(() => {
        setIsLocationsLoading(false);
      });
  }, []);

  const [selectedLocation, setSelectedLocation] = useState(0);

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation._id);
  };

  const selectedLocationName = allLocations.find(
    (el) => selectedLocation === el._id
  ).name;

  const filteredHotels =
    selectedLocation === 0
      ? hotels
      : hotels.filter((hotel) => {
          return hotel.location.includes(selectedLocationName);
        });

  return (
    <section className="px-8 py-8 lg:py-8">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>

      {(() => {
        if (isLoading) {
          return <div>Loading...</div>;
        }
        if (isError) {
          return <div>Error loading data</div>;
        }
        return (
          <>
            <div className="flex items-center flex-wrap gap-x-4">
              {[{ _id: 0, name: "All" }].concat(locations).map((location) => {
                return (
                  <LocationTab
                    onClick={handleLocationSelect}
                    location={location}
                    selectedLocation={selectedLocation}
                    key={location._id}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
              {filteredHotels.map((hotel) => {
                return <HotelCard key={hotel._id} hotel={hotel} />;
              })}
            </div>
          </>
        );
      })()}
    </section>
  );
}

export default HotelListings;
