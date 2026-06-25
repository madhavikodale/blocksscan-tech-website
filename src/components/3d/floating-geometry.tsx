"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FloatingShapeProps {
  className?: string;
  delay?: number;
  duration?: number;
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  shape?: "circle" | "square" | "hexagon" | "diamond" | "blob";
}

function FloatingShape({
  className = "",
  delay = 0,
  duration = 12,
  size = 120,
  color = "#5b8def",
  opacity = 0.08,
  blur = 60,
  shape = "circle",
}: FloatingShapeProps) {
  const shapeStyles: Record<string, React.CSSProperties> = {
    circle: { borderRadius: "50%" },
    square: { borderRadius: "24%" },
    hexagon: { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" },
    diamond: { borderRadius: "16%", transform: "rotate(45deg)" },
    blob: { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
        ...shapeStyles[shape],
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

interface FloatingGeometryProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

export function FloatingGeometry({ variant = "section", className = "" }: FloatingGeometryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  const configs = {
    hero: [
      { size: 300, color: "#5b8def", opacity: 0.1, blur: 80, x: "10%", y: "20%", delay: 0 },
      { size: 200, color: "#8b7fd4", opacity: 0.08, blur: 60, x: "80%", y: "60%", delay: 2 },
      { size: 150, color: "#67c9e2", opacity: 0.06, blur: 50, x: "60%", y: "10%", delay: 4 },
      { size: 250, color: "#5b8def", opacity: 0.05, blur: 70, x: "30%", y: "80%", delay: 1 },
      { size: 100, color: "#8b7fd4", opacity: 0.1, blur: 40, x: "85%", y: "15%", delay: 3 },
    ],
    section: [
      { size: 180, color: "#5b8def", opacity: 0.06, blur: 50, x: "5%", y: "30%", delay: 0 },
      { size: 140, color: "#8b7fd4", opacity: 0.05, blur: 45, x: "90%", y: "70%", delay: 2 },
      { size: 100, color: "#67c9e2", opacity: 0.04, blur: 35, x: "70%", y: "20%", delay: 4 },
    ],
    subtle: [
      { size: 120, color: "#5b8def", opacity: 0.04, blur: 40, x: "15%", y: "40%", delay: 0 },
      { size: 100, color: "#8b7fd4", opacity: 0.03, blur: 35, x: "85%", y: "60%", delay: 3 },
    ],
  };

  const shapes = configs[variant];

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            y: i % 2 === 0 ? y1 : i % 3 === 0 ? y3 : y2,
            rotate: i % 2 === 0 ? rotate1 : rotate2,
          }}
        >
          <FloatingShape
            size={shape.size}
            color={shape.color}
            opacity={shape.opacity}
            blur={shape.blur}
            delay={shape.delay}
            duration={10 + i * 2}
            shape={(["circle", "blob", "hexagon", "square", "diamond"] as const)[i % 5]}
          />
        </motion.div>
      ))}

      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-[15%] right-[10%]"
        style={{ y: y2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-16 h-16 border border-[var(--glass-border)] rounded-lg opacity-20"
          style={{ transform: "rotate(45deg)" }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[8%]"
        style={{ y: y1 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-12 h-12 border border-[var(--primary)] rounded-full opacity-10" />
      </motion.div>

      <motion.div
        className="absolute top-[60%] left-[15%]"
        style={{ y: y3 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-8 bg-[var(--primary)] rounded-sm opacity-5" style={{ transform: "rotate(15deg)" }} />
      </motion.div>

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--glass-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/* Floating blockchain nodes for hero section */
export function FloatingBlockchainNodes({ className = "" }: { className?: string }) {
  const nodes = [
    { x: "15%", y: "25%", size: 6, delay: 0, duration: 8 },
    { x: "85%", y: "35%", size: 4, delay: 1, duration: 10 },
    { x: "70%", y: "75%", size: 8, delay: 2, duration: 7 },
    { x: "25%", y: "65%", size: 5, delay: 0.5, duration: 9 },
    { x: "50%", y: "15%", size: 3, delay: 1.5, duration: 11 },
    { x: "90%", y: "60%", size: 7, delay: 3, duration: 8 },
    { x: "10%", y: "80%", size: 4, delay: 2.5, duration: 10 },
    { x: "45%", y: "85%", size: 6, delay: 1, duration: 9 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -5, 8, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: node.size,
              height: node.size,
              background: "var(--primary)",
              boxShadow: `0 0 ${node.size * 3}px var(--glow-blue)`,
            }}
          />
        </motion.div>
      ))}

      {/* Connection lines between nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]">
        <line x1="15%" y1="25%" x2="50%" y2="15%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="50%" y1="15%" x2="85%" y2="35%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="85%" y1="35%" x2="70%" y2="75%" stroke="var(--accent)" strokeWidth="0.5" />
        <line x1="70%" y1="75%" x2="45%" y2="85%" stroke="var(--accent)" strokeWidth="0.5" />
        <line x1="45%" y1="85%" x2="25%" y2="65%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="25%" y1="65%" x2="10%" y2="80%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="90%" y1="60%" x2="70%" y2="75%" stroke="var(--accent)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
