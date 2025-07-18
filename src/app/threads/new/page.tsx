// app/threads/new/page.tsx
import dynamic from "next/dynamic";

const NewThreadClient = dynamic(() => import("./NewThreadClient"), {
  ssr: false,
});

export default function NewThreadPage() {
  return <NewThreadClient />;
}
