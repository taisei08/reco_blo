"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { AlartModal } from "@/components/AlartModal";
import { DetailModal } from "@/components/DetailModal";

type Props = {
  item: any;
};

const Loading = () => (
  <div className="w-full aspect-square rounded-xl p-3 border bg-gray-300 animate-pulse"></div>
);

export const Card: FC<Props> = ({ item }) => {
  const [isAlartOpen, setIsAlartOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  return (
    <div className="w-full rounded-xl p-3 border border-gray-400">
      {!item ? (
        <div className="relative aspect-square w-14">
          <Image src="/image.jpg" alt="image" fill />
        </div>
      ) : (
        <Loading />
      )}

      <p>{item.name}</p>
      <div className="flex items-center">
        <FaHeart />
        <p className="text-black">{item.like}</p>
      </div>
      <AlartModal isOpen={isAlartOpen} setIsOpen={setIsAlartOpen} />
      <button
        onClick={() => setIsAlartOpen(true)}
        className="py-2 px-4 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:translate-y-1"
      >
        Download
      </button>
      <DetailModal isOpen={isReplyOpen} setIsOpen={setIsReplyOpen} />
      <button onClick={() => setIsReplyOpen(true)}>返信する</button>
    </div>
  );
};
