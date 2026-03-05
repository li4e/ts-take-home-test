import { createContext, useCallback, useContext } from "react";
import { convertDtoToInsight, type Insight } from "../schemas/insight.ts";
import type { InsightDTO } from "../../../server/models/insight.ts";

type InsightStore = {
  state: Insight[];
  setState: React.Dispatch<
    React.SetStateAction<{
      id: number;
      brandId: number;
      date: Date;
      text: string;
    }[]>
  >;
};

export const InsightStoreContext = createContext<InsightStore | null>(null);

function useStore(): InsightStore {
  const storeContext = useContext(InsightStoreContext);
  if (!storeContext) throw new Error("Insights store is null");
  return storeContext;
}

export function useCreateInsight() {
  const store = useStore();
  return useCallback(async (brand: number, text: string): Promise<Insight> => {
    const data = await fetch(`/api/insights`, {
      method: "PUT",
      body: JSON.stringify({
        brand,
        text,
      }),
    }).then((res) => res.json()) as InsightDTO;
    const insight = convertDtoToInsight(data);

    store.setState((curState) => [...curState, insight]);

    return insight;
  }, []);
}

export function useDeleteInsight() {
  const store = useStore();
  return useCallback(async (id: number) => {
    await fetch(`/api/insights/${id}`, {
      method: "DELETE",
    });
    store.setState((curState) => curState.filter((item) => item.id !== id));
  }, []);
}

export function useGetInsights(store: InsightStore) {
  return useCallback(async () => {
    const data = await fetch(`/api/insights`).then((res) =>
      res.json()
    ) as InsightDTO[];
    const insights = data.map((item) => convertDtoToInsight(item));
    store.setState(insights);
    return insights;
  }, []);
}
