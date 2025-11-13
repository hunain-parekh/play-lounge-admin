import { z } from "zod";

import { venueTypeSchema } from "@/app/(main)/dashboard/venue-types/_components/schema";

export type VenueType = z.infer<typeof venueTypeSchema>;
