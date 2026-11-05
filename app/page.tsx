import { redirect } from "next/navigation";

export default function Home() {
  redirect("/homePage");
  return null;
  return <p>Home</p>;
}
