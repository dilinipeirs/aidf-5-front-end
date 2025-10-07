import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateHotelMutation } from "@/lib/api";
import { Textarea } from "./ui/textarea";

import { DevTool } from "@hookform/devtools";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  price: z.number().nonnegative({
    message: "Price is required",
  }),
});

export default function HotelCreateFrom() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [""],
      location: "",
      price: 0,
    },
  });

  const [createHotel, { isLoading }] = useCreateHotelMutation();

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await createHotel(values).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-1/4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Hotel Name" {...field} />
              </FormControl>
              <FormDescription>This is the name of the hotel.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Hotel description" {...field} />
              </FormControl>
              <FormDescription>
                A short description of the hotel.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((image, index) => (
                    <Input
                      key={index}
                      placeholder={`Image URL ${index + 1}`}
                      value={image}
                      onChange={(e) => {
                        const newImages = [...field.value];
                        newImages[index] = e.target.value;
                        field.onChange(newImages);
                      }}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      field.onChange([...field.value, ""]);
                    }}
                  >
                    Add Image
                  </Button>
                  {field.value.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newImages = field.value.slice(0, -1);
                        field.onChange(newImages);
                      }}
                    >
                      Remove Last Image
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormDescription>URLs to images of the hotel.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, Country" {...field} />
              </FormControl>
              <FormDescription>Where is the hotel located?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (isNaN(val)) {
                      field.onChange(0);
                    } else {
                      field.onChange(val);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Price per night in USD.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Hotel</Button>
        <DevTool control={form.control} />
      </form>
    </Form>
  );
}
