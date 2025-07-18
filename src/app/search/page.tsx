import React, { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center mt-8">読み込み中...</div>}>
      <SearchClient />
    </Suspense>
  );
}
