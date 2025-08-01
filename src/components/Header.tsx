"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

import Image from "next/image";

import StarryBackground from "./StarryBackground";

export function Header() {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      await supabase.auth.getUser();
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // 何もしない
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogoClick = () => {
    router.push("/?page=1");
  };

  return (
    <header className="bg-primary text-white pt-2">
      <StarryBackground height={80} />

      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 md:py-4 px-4 md:px-8">
        {/* ロゴ */}
        <h1
          className={`pt-2 pb-4 text-2xl flex items-center gap-2 cursor-pointer`}
          onClick={handleLogoClick}
        >
          <Image
            src="/stars-shine-svgrepo-com.svg"
            alt="planet icon"
            width={28} // w-7 = 1.75rem = 28px
            height={28} // h-7 = 1.75rem = 28px
            className="relative -top-[1px] invert brightness-0 translate-y-[1px]"
          />

          <span className="text-2xl hover:opacity-80 transition">
            ホロスコープ研究所
          </span>
        </h1>
      </div>

      {/* サブタイトル */}
      <div className="bg-white py-2">
        <div className="max-w-7xl mx-auto py-1 md:py-1 px-2 md:px-8">
          <p className="text-center text-xs text-primary font-semibold">
            占星術・占いについての雑談掲示板
          </p>
        </div>
      </div>
    </header>
  );
}
