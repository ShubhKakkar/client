import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <button className="bg-light hover:bg-transparent hover:border-2 hover:border-light hover:text-light cursor-pointer ease-in duration-200 border-2 border-orangeRed text-orangeRed px-4 py-1 rounded-full text-xl font-medium">
        Menu
      </button>
      <button className="bg-light hover:bg-transparent hover:border-2 hover:border-light hover:text-light cursor-pointer ease-in duration-200 border-2 border-orangeRed text-orangeRed px-4 py-1 rounded-full text-xl font-medium">
        Order
      </button>
    </header>
  );
};

export default Header;
