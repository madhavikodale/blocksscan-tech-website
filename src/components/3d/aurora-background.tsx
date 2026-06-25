"use client";

import { useRef, useEffect } from "react";

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = [
      { r: 91, g: 141, b: 239 },   // blue
      { r: 139, g: 127, b: 212 },  // purple
      { r: 103, g: 201, b: 226 },  // cyan
      { r: 91, g: 141, b: 239 },   // blue
    ];

    const blobs = colors.map((color, i) => ({
      x: 0.3 + (i * 0.25) % 1,
      y: 0.3 + (i * 0.2) % 0.5,
      vx: 0.0003 + Math.random() * 0.0002,
      vy: 0.0002 + Math.random() * 0.0001,
      radius: 0.3 + Math.random() * 0.2,
      color,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      time += 0.008;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Dark base
      ctx.fillStyle = "#0c0e14";
      ctx.fillRect(0, 0, width, height);

      // Draw aurora blobs
      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x > 1.2) blob.x = -0.2;
        if (blob.x < -0.2) blob.x = 1.2;
        if (blob.y > 1.2) blob.y = -0.2;
        if (blob.y < -0.2) blob.y = 1.2;

        const wobble = Math.sin(time + blob.phase) * 0.05;
        const x = (blob.x + wobble) * width;
        const y = blob.y * height;
        const radius = blob.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.25)`);
        gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.1)`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add subtle noise grain
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 3;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ opacity: 1 }}
    />
  );
}
