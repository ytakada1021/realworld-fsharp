import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).catch(1),
  tab: z.enum(["your-feed", "global-feed", "tag"]).default("your-feed"),
  tag: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;
