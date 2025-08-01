// app/threads/[threadId]/page.tsx
import ThreadClient from "./ThreadClient";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string | string[] };
}) {
  // threadIdが配列の場合に文字列化（通常はstringであるはずなので安全にキャストしてOK）
  const threadId =
    typeof params.threadId === "string"
      ? params.threadId
      : params.threadId.join("/");

  return <ThreadClient threadId={threadId} />;
}
