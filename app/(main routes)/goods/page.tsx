
import { redirect } from "next/navigation";

export default function GoodsPage(){
  redirect("/goods/filter/all");
  return null;
}