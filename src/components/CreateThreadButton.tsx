"use client";

import Link from "next/link";

export function CreateThreadButton() {
  return (
<Link
  href="/threads/new"
  className="block bg-gradient-to-br from-[#545389] via-[#3b3a75] to-[#0f0e35] text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-text transition mb-4 mx-auto text-center"
>
  スレッドを作成する
</Link>
  );
}
