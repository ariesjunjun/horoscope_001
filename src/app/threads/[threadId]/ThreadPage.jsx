// src/app/threads/[threadId]/ThreadPage.jsx

import { useEffect } from "react";

export default function ThreadPage({ threadId }) {
  useEffect(() => {
    console.log("Load comments only once for threadId", threadId);
  }, []);

  return <div>Thread ID: {threadId}</div>;
}
