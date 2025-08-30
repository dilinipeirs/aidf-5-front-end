import { useUser } from "@clerk/clerk-react";
import { useCreateHotelMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";

function CreateHotelPage() {
  const [createHotel, { isLoading }] = useCreateHotelMutation();

  const handleCreateHotel = async () => {
    try {
      await createHotel({
        name: "Dubai Skyline Resort",
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/123456789.jpg?k=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890&o=&hp=1",
        location: "Dubai, United Arab Emirates",
        price: "320",
        description:
          "Experience luxury in the heart of Dubai with breathtaking views of the city skyline and world-class amenities at your fingertips.",
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="px-4">
      <h1 className="text-2xl font-bold">Create Hotel</h1>
      <Button onClick={handleCreateHotel}>Create Hotel</Button>
    </main>
  );
}

export default CreateHotelPage;
