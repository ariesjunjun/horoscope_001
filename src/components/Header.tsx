"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";


import StarryBackground from "./StarryBackground";
import { UoqMunThenKhung } from "next/font/google";

const uoq = UoqMunThenKhung({
  subsets: ["latin"],  // 使う言語に応じて
  weight: "400",                   // あれば指定。なければ省略可
});


export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
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
          className={`pt-2 pb-4 text-2xl flex items-center gap-2 cursor-pointer ${uoq.className}`}
          onClick={handleLogoClick}
        >
          <img
            src="/stars-shine-svgrepo-com.svg"
            alt="planet icon"
            className="w-7 h-7 relative -top-[1px] invert brightness-0 translate-y-[1px] "
          />

          <span className="hover:opacity-80 transition">
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
