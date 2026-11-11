import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PopularGoods from "@/components/PopularGoods/PopularGoods";
import { fetchGoods } from "@/lib/api/serverApi";
import Hero from "@/components/Hero/Hero";
// ..............................................
import Style from "@/components/Style/Style";
import PopularCategories from "@/components/PopularCategories/PopularCategories";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["PopularGoods", { page: 1, perPage: 12 }],
    queryFn: () => fetchGoods({ page: 1, perPage: 12 }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Hero />
        <Style />
        <PopularCategories />
        <PopularGoods />
        {/* <LastReviews/> */}
      </HydrationBoundary>
    </>
  );
}
