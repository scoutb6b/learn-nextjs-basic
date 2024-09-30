"use client";

import { supabase } from "@/utils/supabase";
import { useState } from "react";

const SignUpPage = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: mail,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });
    if (error) {
      alert("登録失敗");
    } else {
      setMail("");
      setPassword("");
      alert("認証メールを送信しました");
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-20">
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
