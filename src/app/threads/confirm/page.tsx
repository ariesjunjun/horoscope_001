import React, { Suspense } from "react";
import ThreadConfirmClient from "./ThreadConfirmClient";

export default function ThreadConfirmPage() {
  return (
    <Suspense fallback={<div className="text-center mt-8">読み込み中...</div>}>
      <ThreadConfirmClient />
    </Suspense>
  );
}
