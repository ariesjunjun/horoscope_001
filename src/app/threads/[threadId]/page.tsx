import React, { Suspense } from "react";
import ThreadClient from "./ThreadClient";

export default function ThreadPage({ params }: { params: { threadId: string } }) {
  return (
    <Suspense fallback={<div className="text-center mt-8">読み込み中...</div>}>
      <ThreadClient threadId={params.threadId} />
    </Suspense>
  );
}
