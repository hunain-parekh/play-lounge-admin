import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Category name is required").max(100, "Name must be less than 100 characters"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().optional(),
  icon: z.string().optional(),
  createdAt: z.string(),
});

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required").max(100, "Name must be less than 100 characters"),
  image: z
    .union([z.instanceof(File, { message: "Image is required" }), z.string().min(1).optional()])
    .refine((val) => val !== undefined && val !== null && val !== "", {
      message: "Image is required",
    }),
  icon: z.string({ required_error: "Icon is required" }).min(1, "Icon is required"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
