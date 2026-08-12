"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

useTexture.preload("/cinematic.jpg");

function Character25D() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture("/cinematic.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  
  const geometry = useMemo(() => {
    const width = 22;
    const height = 13.5;
    const geo = new THREE.PlaneGeometry(width, height, 64, 64);
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      const pz = -(px * px + py * py) * 0.0015;
      pos.setZ(i, pz);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const breathe = Math.sin(t * 1.5) * 0.002;
    groupRef.current.scale.set(1 + breathe, 1 + breathe, 1);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial 
          map={texture} 
          side={THREE.DoubleSide}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  const initPos = useRef(new THREE.Vector3(0, 0, 12));
  
  useFrame((state) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    const targetX = mouseX * 0.15;
    const targetY = mouseY * 0.15;
    
    const targetRotY = -mouseX * 0.01;
    const targetRotX = mouseY * 0.01;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, initPos.current.x + targetX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, initPos.current.y + targetY, 0.03);
    
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotY, 0.03);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX, 0.03);
  });
  
  return null;
}

class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn("WebGL Error caught gracefully:", error);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function CinematicCanvasInner() {
  const [hasContextLost, setHasContextLost] = useState(false);

  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn("WebGL Context Lost - falling back smoothly");
      setHasContextLost(true);
    };
    window.addEventListener("webglcontextlost", handleContextLost);
    return () => window.removeEventListener("webglcontextlost", handleContextLost);
  }, []);

  if (hasContextLost) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#080605]">
      <Canvas 
        shadows={false}
        dpr={[1, 1.25]} 
        style={{ pointerEvents: "none" }}
        gl={{ antialias: true, powerPreference: "default", alpha: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setHasContextLost(true);
          });
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12.0]} fov={50} />
        <CameraController />
        
        <ambientLight intensity={0.8} />

        <React.Suspense fallback={null}>
          <Character25D />
        </React.Suspense>

        <Sparkles 
          count={35} 
          scale={24} 
          size={2} 
          speed={0.02} 
          opacity={0.15} 
          color="#ff7700" 
        />
      </Canvas>
    </div>
  );
}

export default function CinematicCanvasEnv() {
  return (
    <WebGLErrorBoundary>
      <CinematicCanvasInner />
    </WebGLErrorBoundary>
  );
}
