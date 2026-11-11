import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchGoodById } from "@/lib/api/serverApi";
import GoodPageClient from "./GoodPage.client";
import GoodReviewButton from "./GoodReviewButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const good = await fetchGoodById(id);

  return {
    title: good.name,
    description: good.prevDescription,
    openGraph: {
      title: good.name,
      description: good.prevDescription,
      url: `http://localhost:4000/goods/${id}`,
      images: [
        {
          url: good.image,
          width: 1200,
          height: 630,
          alt: good.name,
        },
      ],
    },
  };
}

export default async function GoodPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["good", id],
    queryFn: () => fetchGoodById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodPageClient />
      <GoodReviewButton productId={id} />
    </HydrationBoundary>
  );
}
