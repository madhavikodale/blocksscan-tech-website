"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  connections: number[];
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Initialize nodes
    const nodeCount = Math.min(25, Math.floor((width * height) / 15000));
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];
    
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      connections: [],
    }));

    // Pre-calculate connections
    nodesRef.current.forEach((node, i) => {
      const connections: number[] = [];
      nodesRef.current.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 150) connections.push(j);
        }
      });
      node.connections = connections.slice(0, 3);
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const particles = particlesRef.current;

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += node.pulseSpeed;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(10, Math.min(width - 10, node.x));
        node.y = Math.max(10, Math.min(height - 10, node.y));
      });

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((connIndex) => {
          const other = nodes[connIndex];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          const opacity = Math.max(0, 1 - dist / 150) * 0.3;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });

      // Spawn particles randomly
      if (Math.random() < 0.05 && particles.length < 15) {
        const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
        const toNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (fromNode !== toNode) {
          particles.push({
            x: fromNode.x,
            y: fromNode.y,
            targetX: toNode.x,
            targetY: toNode.y,
            progress: 0,
            speed: Math.random() * 0.02 + 0.01,
            color: fromNode.color,
            size: Math.random() * 2 + 1,
          });
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const x = p.x + (p.targetX - p.x) * p.progress;
        const y = p.y + (p.targetY - p.y) * p.progress;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1 - p.progress;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        const radius = node.radius * pulse;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color + "15";
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
