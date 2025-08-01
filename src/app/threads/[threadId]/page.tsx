import ThreadClient from "./ThreadClient";

type Params = { threadId: string } | Promise<{ threadId: string }>;

export default function ThreadPage({ params }: { params: Params }) {
  if ("then" in params) {
    // params が Promise なら
    // まだ解決していないのでとりあえず null を返すか何か
    return null;
  }
  return <ThreadClient threadId={params.threadId} />;
}
