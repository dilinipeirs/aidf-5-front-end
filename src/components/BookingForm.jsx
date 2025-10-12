import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
  })
  .refine((data) => {
    const today = new Date().toISOString().split("T")[0];
    const checkInDate = new Date(data.checkIn);
    const todayDate = new Date(today);
    
    // Check if check-in is today or later
    return checkInDate >= todayDate;
  }, {
    message: "Check-in date must be today or later",
    path: ["checkIn"],
  })
  .refine((data) => {
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    
    // Check if check-out is after check-in
    return checkOutDate > checkInDate;
  }, {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

export default function BookingForm({ onSubmit, isLoading, hotelId }) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: today,
      checkOut: tomorrow,
    },
  });

  // Watch both dates to create two-way constraints
  const checkInDate = form.watch("checkIn");
  const checkOutDate = form.watch("checkOut");
  
  // Calculate next day after check-in for check-out minimum
  const nextDay = checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0] : tomorrow;
  
  // Calculate day before check-out for check-in maximum
  const dayBeforeCheckOut = checkOutDate ? new Date(new Date(checkOutDate).getTime() - 24 * 60 * 60 * 1000).toISOString().split("T")[0] : null;

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
      hotelId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-in Date</FormLabel>
              <FormControl>
                <input
                  type="date"
                  className="border rounded-md px-3 py-2"
                  min={today}
                  max={dayBeforeCheckOut}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-out Date</FormLabel>
              <FormControl>
                <input
                  type="date"
                  className="border rounded-md px-3 py-2"
                  min={nextDay}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Booking..." : "Book Now"}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          Check-in must be today or later and before check-out. Check-out must be after check-in date.
        </p>
      </form>
    </Form>
  );
}


