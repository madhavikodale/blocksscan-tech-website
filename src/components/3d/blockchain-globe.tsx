"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function BlockchainGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const connectionsRef = useRef<THREE.Group>(null);

  // Generate blockchain nodes on sphere surface
  const nodes = useMemo(() => {
    const nodeCount = 80;
    const result = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 2.2;
      result.push({
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ] as [number, number, number],
        size: Math.random() * 0.04 + 0.02,
        color: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : "#06b6d4",
      });
    }
    return result;
  }, []);

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
          Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
          Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
        );
        if (dist < 1.2 && Math.random() > 0.7) {
          lines.push({
            start: nodes[i].position,
            end: nodes[j].position,
            opacity: Math.random() * 0.3 + 0.1,
          });
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (connectionsRef.current) {
      connectionsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#11132a"
          emissive="#1e2060"
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.01, 32, 32]} />
        <meshBasicMaterial
          color="#5b8def"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Nodes */}
      <group ref={nodesRef}>
        {nodes.map((node, i) => (
          <mesh key={i} position={node.position}>
            <sphereGeometry args={[node.size, 8, 8]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Connections */}
      <group ref={connectionsRef}>
        {connections.map((conn, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  ...conn.start,
                  ...conn.end,
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#3b82f6"
              transparent
              opacity={conn.opacity}
            />
          </line>
        ))}
      </group>

      {/* Outer glow rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.01, 8, 100]} />
        <meshBasicMaterial color="#5b8def" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.008, 8, 100]} />
        <meshBasicMaterial color="#8b7fd4" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function BlockchainGlobeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#5b8def" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b7fd4" />
        <BlockchainGlobe />
        <FloatingParticles />
        <Stars radius={10} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
