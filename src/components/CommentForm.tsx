"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type CommentFormProps = {
  threadId: string;
  parentId?: string | null;
  onSubmitted?: () => void;
};

export default function CommentForm({
  threadId,
  parentId = null,
  onSubmitted,
}: CommentFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultAuthorName = "トクメーの占星術師";

  // ✅ 確認画面から戻った時の値を復元
  const [body, setBody] = useState(searchParams.get("body") || "");
  const [authorName, setAuthorName] = useState(searchParams.get("authorName") || "");

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!body.trim()) {
      alert("コメントの内容が記入されていません。");
      return;
    }

    if (!threadId) {
      alert("スレッドIDが不明です。");
      return;
    }

    const query = new URLSearchParams({
      threadId,
      ...(parentId ? { parentId } : {}),
      body,
      authorName: authorName.trim() || defaultAuthorName,
    });

    router.push(`/comments/confirm?${query.toString()}`);
  };

  return (
    <form onSubmit={handleConfirm} className="space-y-4 mt-6">
      {/* 名前（任意） */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          名前（未入力で匿名）
        </label>
        <input
          type="text"
          className="w-full border border-primary focus:border-primary focus:ring-1 focus:ring-primary p-3 rounded"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder={defaultAuthorName}
        />
      </div>

      {/* コメント本文 */}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="コメントを入力"
        rows={4}
        className="border border-primary p-2 rounded w-full text-gray-800"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-text transition"
        >
          確認画面へ進む
        </button>

        {parentId && onSubmitted && (
          <button
            type="button"
            onClick={onSubmitted}
            className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-text transition"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
