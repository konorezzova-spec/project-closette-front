import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchGoodById } from "@/lib/api/serverApi";
import { Metadata } from "next";
import GoodPageClient from "./GoodPage.client";

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
      url: `https://project-closette-front.vercel.app/goods/${id}`,
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

const GoodPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["good", id],
    queryFn: () => fetchGoodById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoodPageClient />
    </HydrationBoundary>
  );
};

export default GoodPage;
