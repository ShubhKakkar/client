import React from 'react'
import Header from './Header';

const Hero = () => {
  return (
    <div className="absolute h-full w-full top-0 left-0 z-20">
      <Header />
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-[100px] text-light font-serif leading-none indent-2 absolute mt-12">
          local
        </h2>
        <h1 className="text-[520px] text-light font-serif leading-none indent-2">
          refill
        </h1>
      </div>
    </div>
  );
}

export default Hero