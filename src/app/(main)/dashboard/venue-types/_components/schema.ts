import { z } from "zod";

export const venueTypeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  isActive: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const venueTypeFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  isActive: z.boolean().default(true),
});

export type VenueTypeFormValues = z.infer<typeof venueTypeFormSchema>;
