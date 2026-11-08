// import { Suspense } from "react";
// import { connection } from "next/server";

// async function DynamicMarker() {
//   await connection();
//   return null;
// }

// export default function GoodPage() {
//   return (
//     <>
//       <Suspense fallback={null}>
//         <DynamicMarker />
//       </Suspense>
//       <div>Good Page</div>
//     </>
//   );
// }

// import {
//   QueryClient,
//   HydrationBoundary,
//   dehydrate,
// } from "@tanstack/react-query";
// import { Metadata } from "next";

// import { fetchGoodById } from "@/lib/api/clientApi";
// import GoodPageClient from "./GoodPage.client";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const good = await fetchGoodById(id);
//   return {
//     title: good.name,
//     description: good.prevDescription,
//     openGraph: {
//       title: good.name,
//       description: good.prevDescription,
//       url: `${process.env.SITE_URL}/goods/${id}`,
//       images: [
//         {
//           url: good.image,
//           width: 1200,
//           height: 630,
//           alt: good.name,
//         },
//       ],
//     },
//   };
// }

// const GoodPage = async ({ params }: Props) => {
//   const { id } = await params;

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["good", id],
//     queryFn: () => fetchGoodById(id),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <GoodPageClient />
//     </HydrationBoundary>
//   );
// };

// export default GoodPage;

// Тестовий код

import GoodPageClient from "./GoodPage.client";

const GoodPage = () => {
  return <GoodPageClient />;
};

export default GoodPage;
