"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface ScrollDepth3DProps {
  children: ReactNode;
  className?: string;
  depth?: "near" | "mid" | "far";
  rotateX?: number;
  rotateY?: number;
}

export function ScrollDepth3D({
  children,
  className = "",
  depth = "mid",
  rotateX = 0,
  rotateY = 0,
}: ScrollDepth3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const depthConfig = {
    near: { z: 100, scale: [0.85, 1], y: [80, -80] },
    mid: { z: 0, scale: [0.92, 1], y: [60, -60] },
    far: { z: -100, scale: [0.95, 1], y: [40, -40] },
  };

  const config = depthConfig[depth];

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [config.scale[0], 1, config.scale[1]]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [config.y[0], 0, config.y[1]]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateXValue = useTransform(scrollYProgress, [0, 0.5, 1], [rotateX + 8, 0, rotateX - 8]);
  const rotateYValue = useTransform(scrollYProgress, [0, 0.5, 1], [rotateY - 5, 0, rotateY + 5]);

  return (
    <div ref={ref} className={`perspective-container ${className}`}>
      <motion.div
        style={{
          scale,
          y,
          opacity,
          rotateX: rotateXValue,
          rotateY: rotateYValue,
          transformStyle: "preserve-3d",
        }}
        className="transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxLayer({ children, className = "", speed = 0.5 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * 100, -speed * 100]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface Floating3DCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Floating3DCard({ children, className = "", delay = 0 }: Floating3DCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 10, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        rotateX: -3,
        rotateY: 3,
        translateZ: 20,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface Stagger3DContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger3DContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: Stagger3DContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger3DItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, rotateX: 15, scale: 0.92 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
