"use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// const images = ["/university.jpg", "/university1.jpg", "/university.jpg"];
// const smokeVideo = "/smoke-animation.mp4";

export default function HomePage() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % images.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    // <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-lg">
    //   <video
    //     src={smokeVideo}
    //     autoPlay
    //     loop
    //     muted
    //     playsInline
    //     className="absolute top-0 left-0 w-full h-full object-cover"
    //   />
    //   {images.map((src, index) => (
    //     <div
    //       key={index}
    //       className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
    //         index === currentIndex ? "opacity-100" : "opacity-0"
    //       }`}
    //     >
    //       <Image
    //         src={src}
    //         alt={`Slide ${index + 1}`}
    //         fill
    //         sizes="100vw"
    //         className="object-cover"
    //       />
    //     </div>
    //   ))}
    //   <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>
    //   <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-20">
    //     <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-4">
    //       SPPU University
    //     </h1>
    //     <p className="text-base md:text-2xl max-w-2xl drop-shadow-md">
    //       Empowering students and shaping the future through knowledge,
    //       innovation, and development.
    //     </p>
    //   </div>
    // </div>
    <></>
  );
}
