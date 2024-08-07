"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoginButton from "@/components/LoginButton";
import { PostData } from "@/Mocks/PostData";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { UploadMP3 } from "@/components/UploadMP3";
import Loading from "./Loading";

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

  const { data: posts}: any = useSWR("/api/posts", axios)
    

  
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
        {user && <UploadMP3 uid={user.uid}/>}
      </div>

      <div className="grid grid-cols-3 gap-7">
        {posts.data.map((item) => (
          <Card item={item} key={item.title} />
        ))}
      </div>
    </main>
  );
}
