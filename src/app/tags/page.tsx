// src/app/tags/page.tsx
import { createClient } from "@/lib/supabase/client";

export const runtime = "nodejs";

export default async function TagsPage() {
  const supabase = createClient(); // ✅ Supabaseクライアント生成

  const { data, error } = await supabase.from("tags").select("name");

  if (error) {
    console.error(error);
    return <p>タグの取得に失敗しました。</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">全タグ一覧</h1>
      <ul className="grid grid-cols-2 gap-2">
        {data?.map((tag: { name: string }) => (
          <li key={tag.name}>
            <a
              href={`/search?tag=${encodeURIComponent(tag.name)}`}
              className="text-sm text-gray-700 hover:text-pink-600"
            >
              #{tag.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
