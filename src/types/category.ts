import { z } from "zod";

import { categorySchema } from "@/app/(main)/dashboard/categories/_components/schema";

export type Category = z.infer<typeof categorySchema>;
