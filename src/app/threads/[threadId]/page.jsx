// src/app/threads/[threadId]/page.tsx

import ThreadClient from "./ThreadClient";

export default function ThreadPage({ params }) {
  const { threadId } = params;

  return <ThreadClient threadId={threadId} />;
}
