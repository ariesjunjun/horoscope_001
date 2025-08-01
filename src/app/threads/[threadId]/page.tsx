// app/threads/[threadId]/page.tsx
import ThreadClient from "./ThreadClient";

export default async function ThreadPage({ params }: { params: { threadId: string } }) {
  return <ThreadClient threadId={params.threadId} />;
}
