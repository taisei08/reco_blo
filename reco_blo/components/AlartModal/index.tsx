"use client";

import { FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { config, useTransition, animated } from "react-spring";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const AlartModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const transitionsLoginModal = useTransition(isOpen, {
    from: { transform: "translate(-50%, -50%) scale(0.95)" },
    enter: { transform: "translate(-50%, -50%) scale(1.05)" },
    leave: { transform: "translate(-50%, -50%) scale(0.95)" },
    config: config.stiff,
  });

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
                className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-20 max-h-[85vh] w-[86vw] max-w-[360px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white px-6 py-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] md:w-[90vw]"
              >
                <Dialog.Title className="bg-white text-center text-lg font-semibold text-gray-800">
                  Alart
                </Dialog.Title>
                <p>aaa</p>
                <Dialog.Description className="mt-8"></Dialog.Description>
                <Dialog.Close asChild>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 border bg-red-500 text-white rounded-full"
                    >
                      承諾します
                    </button>
                  </div>
                </Dialog.Close>
              </animated.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null
      )}
    </Dialog.Root>
  );
};
