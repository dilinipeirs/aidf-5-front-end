import { Button } from "@/components/ui/button";
import { getAllHotels } from "@/lib/api";
import { useState, useEffect } from "react";

import HotelListings from "../components/HotelListings";
import Hero from "../components/Hero";

function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [isHotelsLoading, setIsHotelsLoading] = useState(true);
  const [isHotelsError, setIsHotelsError] = useState(false);
  const [hotelsError, setHotelsError] = useState(null);

  useEffect(() => {
    getAllHotels()
      .then((data) => {
        setHotels(data);
      })
      .catch((error) => {
        setIsHotelsError(true);
        setHotelsError([error]);
      })
      .finally(() => {
        setIsHotelsLoading(false);
      });
  }, []);

  return (
    <main>
      <div className="relative min-h-[85vh]">
        <Hero />
      </div>
      <Button
        onClick={() => {
          getAllHotels();
        }}
      >
        GET HOTELS
      </Button>
      <HotelListings />
    </main>
  );
}

export default HomePage;
