"use client";

import Link from "next/link";
import { useRouteGuard } from "../_hooks/useRouteGuard";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useRouteGuard();
  return (
    <div className="flex">
      <div className="flex flex-col w-1/5 bg-slate-300 h-screen">
        <Link href={"/admin/posts"} className="py-4 px-2 hover:bg-slate-400">
          記事一覧
        </Link>
        <Link
          href={"/admin/categories"}
          className="py-4 px-2 hover:bg-slate-400"
        >
          カテゴリ一覧
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
