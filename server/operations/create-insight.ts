import type { Insight, InsightCreateDTO } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  data: InsightCreateDTO;
};

export default (input: Input): Insight | undefined => {
  console.log(`Creating insight for passed data=${JSON.stringify(input.data)}`);

  const [row] = input.db
    .sql<
    insightsTable.Row
  >`INSERT INTO insights (brand, createdAt, text) VALUES (${input.data.brand}, ${
    new Date().toISOString()
  }, ${input.data.text}) RETURNING *`;

  if (row) {
    const result = { ...row, createdAt: new Date(row.createdAt) };
    console.log("Insight created:", result);
    return result;
  }

  throw new Error("Error during creating insight");
};
