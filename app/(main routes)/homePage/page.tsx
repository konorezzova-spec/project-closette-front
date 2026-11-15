import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PopularGoods from "@/components/PopularGoods/PopularGoods";
import {
  fetchCategories,
  fetchGoods,
  fetchFeedbacks,
} from "@/lib/api/serverApi";
import Hero from "@/components/Hero/Hero";
import Style from "@/components/Style/Style";
import PopularCategories from "@/components/PopularCategories/PopularCategories";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import type { Feedback } from "@/types/feedback";
import Container from "@/components/Container/Container";

export default async function HomePage() {
  const queryClient = new QueryClient();

  let feedbacksData: Feedback[] = [];
  try {
    const response = await fetchFeedbacks();
    feedbacksData = response.data?.feedbacks ?? [];
  } catch (error) {
    console.error("Не вдалося завантажити останні відгуки", error);
  }

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["PopularGoods", { page: 1, perPage: 12 }],
      queryFn: () => fetchGoods({ page: 1, perPage: 12 }),
    }),

    queryClient.prefetchQuery({
      queryKey: ["popularCategories"],
      queryFn: () => fetchCategories(1, 3),
    }),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Hero />
        <Style />
        <PopularCategories />
        <PopularGoods />
        <Container>
        <ReviewsList
          reviews={feedbacksData}
          title="Останні відгуки"
          showButton={false}
          showProduct
          hideWhenEmpty
        />
        </Container>
      </HydrationBoundary>
    </>
  );
}
