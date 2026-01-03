// *********************
// Role of the component: Modern hero component with gradient background and animations
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic (Modernized)
// Version: 2.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Modern hero component with animated gradient, glassmorphism, and smooth transitions
// *********************

'use client';

import Image from "next/image";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-[700px] w-full overflow-hidden animated-gradient max-lg:min-h-[900px] max-md:min-h-[750px]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full min-h-[700px] max-lg:grid-cols-1 max-lg:py-16 max-lg:gap-y-10">

        {/* Text Content */}
        <div className="flex flex-col gap-y-6 max-lg:order-last col-span-2 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full w-fit border border-white/30 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white text-sm font-medium">New Arrival</span>
          </div>

          <h1 className="text-7xl text-white font-bold mb-3 leading-tight max-xl:text-6xl max-md:text-5xl max-sm:text-4xl animate-fade-in-up stagger-1">
            THE PRODUCT OF
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
              THE FUTURE
            </span>
          </h1>

          <p className="text-white/90 text-lg leading-relaxed max-w-2xl max-sm:text-base animate-fade-in-up stagger-2">
            Experience cutting-edge technology with our latest collection of premium electronics.
            Designed for those who demand excellence and innovation in every detail.
          </p>

          <div className="flex gap-4 mt-4 max-lg:flex-col max-lg:gap-3 animate-fade-in-up stagger-3">
            <Link href="/shop">
              <button className="group relative px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl max-lg:text-lg max-sm:text-base">
                <span className="relative z-10">SHOP NOW</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>

            <Link href="/shop">
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl max-lg:text-lg max-sm:text-base">
                <span className="flex items-center gap-2">
                  EXPLORE MORE
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>


        </div>

        {/* Product Image */}
        <div className="relative z-10 animate-fade-in-up stagger-2">
          <div className="relative float">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>

            <Image
              src="/watch for banner.png"
              width={450}
              height={450}
              alt="smart watch"
              className="relative max-md:w-[350px] max-md:h-[350px] max-sm:h-[280px] max-sm:w-[280px] w-auto h-auto drop-shadow-2xl"
              priority
            />

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl animate-pulse">
              NEW
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
