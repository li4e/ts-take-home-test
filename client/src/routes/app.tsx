import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";
import { InsightStoreContext, useGetInsights } from "../model/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const insightsStore = { state: insights, setState: setInsights };
  const getInsights = useGetInsights(insightsStore);

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <InsightStoreContext.Provider value={insightsStore}>
      <main className={styles.main}>
        <Header />
        <Insights className={styles.insights} insights={insights} />
      </main>
    </InsightStoreContext.Provider>
  );
};
