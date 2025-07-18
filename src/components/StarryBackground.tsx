"use client";
import { useEffect, useRef } from "react";

type Props = {
  height: number;
};

export default function StarryBackground({ height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let h = (canvas.height = height);

    // 白と淡い黄色
    const colors = ["255,255,255", "255,255,200"];

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * h,
      radius: Math.random() * 2,
      alpha: Math.random() * 0.8 + 0.2, // 初期透明度0.2〜1
      speed: Math.random() * 0.015 + 0.005, // 点滅速度0.005〜0.02
      color: colors[Math.floor(Math.random() * colors.length)],
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    function animate() {
      ctx.clearRect(0, 0, width, h);
      stars.forEach((star) => {
        // 点滅の変化
        star.alpha += star.speed * star.direction;
        if (star.alpha <= 0.2) {
          star.alpha = 0.2;
          star.direction = 1;
        }
        if (star.alpha >= 1.0) {
          star.alpha = 1.0;
          star.direction = -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color},${star.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      h = canvas.height = height;
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${height}px`,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
