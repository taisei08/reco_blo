"use client";

import { FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { config, useTransition, animated } from "react-spring";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { Post } from "@/components/Post";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Loading = () => (
  <div className="w-[300px] mx-auto aspect-square rounded-xl p-3 border bg-gray-300 animate-pulse"></div>
);

export const DetailModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const transitionsLoginModal = useTransition(isOpen, {
    from: { transform: "translate(-50%, 100%)" },
    enter: { transform: "translate(-50%, -50%)" },
    leave: { transform: "translate(-50%, 100%)" },
    config: config.stiff,
  });

  const data = ["aaa", "bbb", "ccc", "ddd"];

  const samplePost = {
    id: 1,
    title: "Sample Post",
    content: "This is a sample post.",
    comments: [
      { id: 1, text: "Great post!" },
      { id: 2, text: "Thanks for sharing!" },
    ],
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild></Dialog.Trigger>
      {transitionsLoginModal((styles: any, item: any) =>
        (item as any) ? (
          <Dialog.Portal>
            <Dialog.Overlay
              className="fixed inset-0 bg-black opacity-30 z-20"
              onClick={() => setIsOpen(false)}
            />
            <Dialog.Content>
              <animated.div
                style={{
                  transform: styles.transform,
                }}
                className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-20 w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white px-6 py-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
              >
                <Dialog.Title className="bg-white text-center text-lg font-semibold text-gray-800"></Dialog.Title>

                <Dialog.Description className="mt-8">
                  <div>
                    {!item ? (
                      <div className="relative aspect-square w-14">
                        <Image src="/image.jpg" alt="image" fill />
                      </div>
                    ) : (
                      <Loading />
                    )}

                    <p>{item.name}</p>

                    <Post post={samplePost} />
                  </div>
                </Dialog.Description>
                <Dialog.Close asChild></Dialog.Close>
              </animated.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null
      )}
    </Dialog.Root>
  );
};
