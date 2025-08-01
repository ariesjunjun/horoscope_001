"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { tagList } from "@/components/TagList";
import Image from "next/image";

export default function NewThreadClient() {
  const [defaultAuthorName, setDefaultAuthorName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const router = useRouter();
  const tagOptions = tagList.map((tag) => tag.name);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const titleFromParams = searchParams.get("title");
    const bodyFromParams = searchParams.get("body");
    const authorNameFromParams = searchParams.get("authorName");
    const anonymousParam = searchParams.get("anonymous");
    const tagsParam = searchParams.get("tags");

    if (titleFromParams) setTitle(titleFromParams);
    if (bodyFromParams) setBody(bodyFromParams);
    if (authorNameFromParams) setAuthorName(authorNameFromParams);
    if (anonymousParam === "1") setAnonymous(true);
    if (tagsParam) setSelectedTags(tagsParam.split(","));
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

if (error) {
  console.error("セッション取得エラー:", error);
  return;
}
      if (!session?.user) {
        console.error("ユーザーセッションが見つかりません");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();

      if (profileError) {
        console.error("プロフィール取得エラー:", profileError.message);
        return;
      }

      const name = profile?.username || "";
      setDefaultAuthorName(name);
      setAuthorName((cur) => (cur ? cur : name));
    };

    fetchUserName();
  }, []);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);

    let imageUrl = "";
    if (imageFile) {
      const fileExt = imageFile.name.includes(".") ? imageFile.name.split(".").pop() : "png";
      const fileName = `${Date.now()}.${fileExt}`;
      const bucketName = "thread-image";

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("画像アップロード失敗:", uploadError.message);
        alert("画像のアップロードに失敗しました。");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (!publicUrlData?.publicUrl) {
        alert("画像URLの取得に失敗しました。");
        setLoading(false);
        return;
      }

      imageUrl = publicUrlData.publicUrl;
    }

    const postAuthorName =
      anonymous || !authorName.trim()
        ? "トクメーの占星術師"
        : authorName.trim();

    const params = new URLSearchParams({
      title: title.trim(),
      body,
      authorName: postAuthorName,
      anonymous: anonymous ? "1" : "0",
    });

    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    if (imageUrl) {
      params.set("imageUrl", imageUrl);
    }

    router.push(`/threads/confirm?${params.toString()}`);
    // setLoading(false); // ← 不要、画面遷移するため
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        新規スレッド作成
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* タイトル */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
          <input
            type="text"
            className="w-full border border-[#c2d2c5] focus:border-[#1e3932] focus:ring-1 focus:ring-[#1e3932] p-3 rounded transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* 本文 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">本文</label>
          <textarea
            className="w-full border border-[#c2d2c5] focus:border-[#1e3932] focus:ring-1 focus:ring-[#1e3932] p-3 rounded transition"
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {/* 名前 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            名前（省略で匿名）
          </label>
          <input
            type="text"
            disabled={anonymous}
            className="w-full border border-[#c2d2c5] focus:border-[#1e3932] focus:ring-1 focus:ring-[#1e3932] p-3 rounded transition disabled:bg-gray-100"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="トクメーの占星術師"
          />
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => {
                setAnonymous(e.target.checked);
                setAuthorName(e.target.checked ? "" : defaultAuthorName);
              }}
            />
            <span className="text-sm text-gray-700">匿名で投稿する</span>
          </div>
        </div>

        {/* タグ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            タグ（複数選択可）
          </label>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-full border ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-white border-[#1e3932]"
                    : "border-[#c2d2c5] text-gray-700 hover:bg-gray-100"
                } transition text-sm`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 画像 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            画像（任意）
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setImageFile(file || null);
            }}
            className="w-full"
          />
          {imageFile && (
  <div className="mt-2">
    <Image
      src={URL.createObjectURL(imageFile)}
      alt="プレビュー"
      width={200}
      height={200}
      className="max-h-48 border rounded"
    />
  </div>
)}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded hover:bg-text transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "確認中..." : "確認へ進む"}
        </button>
      </form>
    </div>
  );
}
