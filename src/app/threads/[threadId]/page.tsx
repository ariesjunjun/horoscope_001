import ThreadClient from "./ThreadClient";

export default function ThreadPage({ params }: any) {
  return <ThreadClient threadId={params.threadId} />;
}
