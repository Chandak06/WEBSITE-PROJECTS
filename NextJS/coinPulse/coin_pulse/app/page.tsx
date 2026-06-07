import { Suspense } from "react";
import CoinOverview from "./components/home/CoinOverview";
import { CoinOverviewFallback } from "./components/home/fallback";
const page = () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback/>}>
          <CoinOverview/>
        </Suspense>
      </section>
    </main>
  );
};

export default page;
