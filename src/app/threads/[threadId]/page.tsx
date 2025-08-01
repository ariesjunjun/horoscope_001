/* eslint-disable @typescript-eslint/no-explicit-any */

import ThreadClient from "./ThreadClient";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  return <ThreadClient threadId={params.threadId} />;
}
