"use client";
import { SubmitHandler, useForm } from "react-hook-form";

interface SubmitData {
  name: string;
  email: string;
  content: string;
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubmitData>();

  const submit: SubmitHandler<SubmitData> = async (data) => {
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      window.alert("送信しました");
      reset();
    } catch (error) {
      window.alert("送信に失敗しました");
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mx-auto w-2/3 py-10">
          <h1 className="text-2xl font-bold">お問い合わせフォーム</h1>
          <div className="mt-8 flex items-center">
            <label htmlFor="name" className="w-1/3 text-xl font-semibold">
              名前
            </label>
            <div className="w-3/4">
              <input
                type="text"
                id="name"
                className="border border-gray-400 rounded-lg py-2 pl-2 w-full"
                {...register("name", {
                  required: "名前は必須です。",
                  maxLength: { value: 30, message: "30文字以内で入力願います" },
                })}
                disabled={isSubmitting}
              />
              <p className="text-red-500 ">{errors.name?.message}</p>
            </div>
          </div>
          <div className="mt-8 flex items-center">
            <label htmlFor="mail" className="w-1/3 text-xl font-semibold">
              メールアドレス
            </label>
            <div className="w-3/4">
              <input
                type="email"
                id="mail"
                className="border border-gray-400 rounded-lg py-2 pl-2 w-full"
                {...register("email", {
                  required: "メールアドレスは必須です。",
                })}
                disabled={isSubmitting}
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
          </div>
          <div className="mt-8 flex items-center">
            <label htmlFor="content" className="w-1/3 text-xl font-semibold">
              本文
            </label>
            <div className="w-3/4">
              <textarea
                rows={8}
                id="content"
                className="border border-gray-400 rounded-lg py-1 pl-2 w-full"
                {...register("content", {
                  required: "本文は必須です。",
                  maxLength: {
                    value: 500,
                    message: "500文字以内で入力願います",
                  },
                })}
                disabled={isSubmitting}
              ></textarea>
              <p className="text-red-500">{errors.content?.message}</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <button
              type="submit"
              className="border px-8 py-2 rounded-lg bg-slate-600 text-white font-semibold "
              disabled={isSubmitting}
            >
              送信
            </button>
            <button
              type="reset"
              className="border px-6 py-2 rounded-lg bg-slate-200 font-semibold "
              disabled={isSubmitting}
            >
              クリア
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
