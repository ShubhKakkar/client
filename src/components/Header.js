"use client";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [checkPoint, setCheckPoint] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header");
      const scrollPosition = window.scrollY;

      if (scrollPosition > window.innerHeight - 80) {
        header.classList.add("bg-light");
        header.classList.remove("bg-transparent");
        setCheckPoint(true);
      } else {
        header.classList.remove("bg-light");
        header.classList.add("bg-transparent");
        setCheckPoint(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="main-header"
      className="flex items-center justify-between p-4 fixed w-full bg-transparent transition duration-300 ease-in-out z-40"
    >
      <button className="bg-light hover:bg-transparent hover:border-2 hover:border-light hover:text-light cursor-pointer border-2 border-orangeRed text-orangeRed px-4 py-1 rounded-full text-xl font-medium ease-in duration-200">
        Menu
      </button>
      {checkPoint && (
        <div className="text-3xl md:text-6xl text-orangeRed font-medium font-serif">
          refill
        </div>
      )}
      <button className="bg-light hover:bg-transparent hover:border-2 hover:border-light hover:text-light cursor-pointer border-2 border-orangeRed text-orangeRed px-4 py-1 rounded-full text-xl font-medium ease-in duration-200">
        Order
      </button>
    </header>
  );
};

export default Header;
