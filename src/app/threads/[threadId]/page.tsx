import ThreadClient from "./ThreadClient";

export default async function ThreadPage({ params }: { params: { threadId: string } }) {
  // ここでデータ取得などもできる（必要なら）
  return <ThreadClient threadId={params.threadId} />;
}
