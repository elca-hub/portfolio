"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/icon-ver3.png",
  "/images/icon-ver4.jpeg",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const moveTime = 2000;
  const stopTime = 5000;

  useEffect(() => {
    let isMounted = true;

    const startAnimation = () => {
      if (!isMounted) return;

      // 左から右への移動アニメーション開始
      setIsAnimating(true);

      // 3秒後に画像を切り替え
      timeoutRef.current = setTimeout(() => {
        if (!isMounted) return;
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, stopTime);
    };

    // 初回は2秒待ってから開始
    timeoutRef.current = setTimeout(() => {
      if (isMounted) {
        startAnimation();
      }
    }, moveTime);

    // 5秒ごとに繰り返し（2秒静止 + 3秒移動）
    intervalRef.current = setInterval(() => {
      if (isMounted) {
        // 2秒待ってからアニメーション開始
        timeoutRef.current = setTimeout(() => {
          if (isMounted) {
            startAnimation();
          }
        }, moveTime);
      }
    }, stopTime + moveTime);

    return () => {
      isMounted = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center w-screen gap-[4rem]">
        <div className="w-1/2 h-screen relative overflow-hidden">
          {/* 現在の画像 */}
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={
              isAnimating
                ? {
                  x: "100%",
                  opacity: [1, 0.5, 0],
                  scale: [1, 0.95, 0.9],
                }
                : {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                }
            }
            transition={{
              duration: 3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <img
              src={images[currentImageIndex]}
              alt="icon"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* 次の画像 */}
          {isAnimating && (
            <motion.div
              key={`next-${(currentImageIndex + 1) % images.length}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ x: "-100%", opacity: 0, scale: 1.1 }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <img
                src={images[(currentImageIndex + 1) % images.length]}
                alt="icon"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>
        <div>
          <h1 className="text-[4rem] font-bold">elca's portfolio</h1>
          <h2 className="text-[2rem] text-gray-500">elcaのポートフォリオサイト</h2>
        </div>
      </div>
    </div>
  );
}
