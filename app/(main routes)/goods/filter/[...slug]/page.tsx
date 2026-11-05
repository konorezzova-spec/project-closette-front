import { Suspense } from "react";
import { connection } from "next/server";

async function DynamicMarker() {
  await connection();
  return null;
}

export default function GoodPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <div>Good Page</div>
    </>
  );
}
