import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PopularGoods from "@/components/PopularGoods/PopularGoods";
import { fetchGoods } from "@/lib/api/serverApi";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["PopularGoods", { page: 1, perPage: 12 }],
    queryFn: () => fetchGoods({ page: 1, perPage: 12 }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <Hero />
<Style/>
<PopularCategories/> */}
        <PopularGoods />
        {/* <LastReviews/> */}
      </HydrationBoundary>
    </>
  );
}
