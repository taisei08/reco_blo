"use client";

import Image from "next/image";
import { FC, useRef, useState, useEffect } from "react";
import {
  FaArrowRight,
  FaComment,
  FaHeart,
  FaRegCirclePlay,
  FaRegCircleStop,
} from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";

import { AlartModal } from "@/components/AlartModal";
import { DetailModal } from "@/components/DetailModal";

type Props = {
  item: any;
};

const Loading = () => (
  <div className="w-full aspect-square rounded-xl p-3 border bg-gray-300 animate-pulse relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <FaPlayCircle size={70} />
    </div>
  </div>
);

export const Card: FC<Props> = ({ item }) => {
  const [isAlartOpen, setIsAlartOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => {
        audioElement.play();
      };
      audioElement.addEventListener("ended", handleEnded);
      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full rounded-xl p-3 border border-gray-400">
      {item ? (
        <div className="relative aspect-square w-full">
          <audio ref={audioRef} src={"sounds/sample_01.mp3"} />

          <Image
            src={item.url}
            alt="image"
            fill
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
          <button onClick={handlePlayPause}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {isPlaying ? (
                <FaRegCircleStop size={70} />
              ) : (
                <FaRegCirclePlay size={70} />
              )}
            </div>
          </button>
        </div>
      ) : (
        <Loading />
      )}
      <div className="">
        <div>
          <p>{item.name}</p>
          <div className="flex items-center gap-1">
            <FaHeart />
            <p className="text-black">{item.like}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {item?.tags?.map((tag: string, index: number) => (
            <button
              key={index}
              className="text-xs bg-gray-200 rounded-full px-2 py-1"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <AlartModal
        isOpen={isAlartOpen}
        setIsOpen={setIsAlartOpen}
        downloadUrl={item.audioUrl}
      />
      <div className="mt-2">
        <div className="flex justify-between">
          <button
            onClick={() => setIsAlartOpen(true)}
            className="py-2 px-4 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:-translate-y-1 transition-transform duration-300 ease-in-out block"
          >
            Download
          </button>
          <DetailModal isOpen={isReplyOpen} setIsOpen={setIsReplyOpen} />
          <div className="flex items-center gap-1 hover:text-gray-500">
            <button onClick={() => setIsReplyOpen(true)} className="block">
              コメントする
            </button>
            <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};
