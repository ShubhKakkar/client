"use client";
import React, { useEffect } from 'react'
import Header from './Header';
import {gsap, Power3} from "gsap";
import { ScrollTrigger } from 'gsap/all';

const Hero = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  },[]);
  useEffect(() => {
    gsap.to("#hero", {
      scale: 0.1,
      transformOrigin: "bottom center",
      scrollTrigger: {
        scrub: 1.5,
        trigger: "#hero",
        start: "top top",
        end: "bottom end",
      },
    });
  },[]);
  return (
    <div className="absolute h-full w-full top-0 left-0 z-20">
      <Header />
      <div className="absolute bottom-[30%] md:bottom-0 mx-auto left-[50%] translate-x-[-50%]" id="hero">
        <h2 className="text-[50px] md:text-[100px] text-light font-serif md:leading-none indent-2 absolute md:mt-12">
          local
        </h2>
        <h1 className="text-[150px] md:text-[520px] text-light font-serif md:leading-none indent-2">
          refill
        </h1>
      </div>
    </div>
  );
}

export default Hero