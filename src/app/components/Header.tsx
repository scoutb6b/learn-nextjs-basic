"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";

const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const { session, isLoading } = useSupabaseSession();

  return (
    <header className="bg-slate-700 p-4 text-xl font-semibold text-white flex justify-between">
      <Link href="/">Blog</Link>
      {!isLoading && (
        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <Link href="/admin/posts">管理画面</Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact">お問い合わせ</Link>
              <Link href="/login">ログイン</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
