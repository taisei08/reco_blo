"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollDownSpeed = 20; // 下にスクロール時の速度閾値
  const scrollUpSpeed = 50; // 上にスクロール時の速度閾値

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;

    if (scrollDifference > scrollDownSpeed) {
      // 下にスクロール中で速度が閾値を超えた場合
      setShowHeader(false);
    } else if (scrollDifference < -scrollUpSpeed) {
      // 上にスクロール中で速度が閾値を超えた場合
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed z-50 top-5 left-1/2 -translate-x-1/2 rounded-lg w-[1000px] transition-transform duration-300 ease-in-out ${
        showHeader
          ? "transform translate-y-0"
          : "transform -translate-y-[calc(100%+2.5rem)]"
      } bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg`}
    >
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="text-white text-2xl font-bold">RECBLO</div>
        <div className="absolute -z-30">
          <Image
            src="/images/blue_block.png"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <nav className="flex space-x-4">
          <a href="#home" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#services" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
