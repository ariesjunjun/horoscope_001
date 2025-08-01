// src/app/threads/[threadId]/page.tsx

export const runtime = "nodejs";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  return <div>Thread ID: {params.threadId}</div>;
}
