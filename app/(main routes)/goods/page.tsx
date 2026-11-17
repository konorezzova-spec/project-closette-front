
import { redirect } from "next/navigation";

interface GoodsPageProps{
  searchParams: Promise<{ category?: string }>;
}

export default async function GoodsPage({ searchParams }: GoodsPageProps) {
  const { category } = await searchParams;
  redirect(`/goods/filter/${category || "all"}`);
  // return null;
}