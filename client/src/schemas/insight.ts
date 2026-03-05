import { z } from "zod";
import type { InsightDTO } from "../../../server/models/insight.ts";

export const Insight = z.object({
  id: z.number().int().min(0),
  brandId: z.number().int().min(0),
  date: z.date(),
  text: z.string(),
});

export type Insight = z.infer<typeof Insight>;

export function convertDtoToInsight(data: InsightDTO): Insight {
  return Insight.parse({
    id: data.id,
    brandId: data.brand,
    date: new Date(data.createdAt),
    text: data.text,
  });
}
