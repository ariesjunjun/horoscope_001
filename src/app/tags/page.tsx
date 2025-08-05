import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'nodejs';
export const dynamic = "force-dynamic";

export default async function TagsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.rpc("get_distinct_tags");

  if (error) {
    console.error(error);
    return <p>タグの取得に失敗しました。</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">全タグ一覧</h1>
      <ul className="grid grid-cols-2 gap-2">
        {data?.map((t: string) => (
          <li key={t}>
            <a
              href={`/search?tag=${encodeURIComponent(t)}`}
              className="text-sm text-gray-700 hover:text-pink-600"
            >
              #{t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
