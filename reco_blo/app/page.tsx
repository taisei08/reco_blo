"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";
import { PostData } from "@/Mocks/PostData";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { UploadMP3 } from "@/components/UploadMP3";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const [showText, setShowText] = useState(false);
  const [user, setUser] = useState(null);
  const data = PostData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000); // 2.5秒後に表示

    return () => clearTimeout(timer); // クリーンアップタイマー
  }, []);

  if (!showText)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <Loading />
      </div>
    );

  console.log("user", user?.uid);

  return (
    <main className=" max-w-5xl mx-auto my-[250px]">
      <Header />
      <div className="flex justify-between items-end">
        <LoginButton user={user} setUser={setUser} />
        <UploadMP3 />
      </div>

      <div className="grid grid-cols-3 gap-7">
        {data.map((item) => (
          <Card item={item} key={item.name} />
        ))}
      </div>
    </main>
  );
}
