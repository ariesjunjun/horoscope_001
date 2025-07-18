import Link from "next/link";
import StarryBackground from "./StarryBackground";

export function Footer() {
  return (
    <footer className="relative bg-primary text-white text-center text-xs md:text-sm py-6 mt-10 overflow-hidden">
      {/* ← relative と overflow-hidden を追加 */}
      <StarryBackground height={96} />
      <div className="max-w-4xl mx-auto space-y-2 px-4 relative z-10">
        <div className="font-semibold">
          © 2025 ホロスコープ研究所 All rights reserved.
        </div>
        <div className="text-white/80">占星術・占いについての掲示板</div>

        <div className="flex justify-center flex-wrap gap-4 pt-2">
          <Link
            href="/privacy"
            className="hover:underline hover:text-white/90 transition"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/about"
            className="hover:underline hover:text-white/90 transition"
          >
            サイトについて
          </Link>
        </div>
      </div>
    </footer>
  );
}
