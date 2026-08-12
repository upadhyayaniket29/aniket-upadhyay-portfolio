"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

useTexture.preload("/cinematic.jpg");

function Character25D() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture("/cinematic.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  
  const geometry = useMemo(() => {
    // Subdivided plane expanding across the full screen viewport
    const width = 22;
    const height = 13.5;
    const geo = new THREE.PlaneGeometry(width, height, 128, 128);
    
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
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial 
          map={texture} 
          roughness={0.4} 
          metalness={0.05}
          emissive={new THREE.Color("#080605")} 
          emissiveIntensity={0.15} 
          side={THREE.DoubleSide}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (!lightRef.current) return;
    const x = (state.pointer.x * state.viewport.width) / 2;
    const y = (state.pointer.y * state.viewport.height) / 2;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.05);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.05);
  });

  return (
    <pointLight 
      ref={lightRef} 
      color="#ffffff" 
      intensity={0.3} 
      distance={14} 
      position={[0, 0, 5]} 
    />
  );
}

function CinematicLighting() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle lighting reaction to mouse
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.x * 2;
    const targetY = state.pointer.y * 2;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} color="#ffffff" />
      
      {/* Very Soft White Key Light */}
      <directionalLight 
        position={[2, 5, 8]} 
        intensity={0.8} 
        color="#ffffff" 
        castShadow
        shadow-bias={-0.0001}
      />
      
      {/* Warm Orange Rim Light */}
      <spotLight 
        position={[6, 3, -4]} 
        intensity={35} 
        color="#eb6e00" 
        angle={Math.PI / 3} 
        penumbra={1} 
        castShadow 
      />

      {/* Cool Blue Monitor Fill */}
      <pointLight 
        position={[-3, 1, 4]} 
        intensity={10} 
        color="#1e3a8a" 
        distance={20}
      />
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  const initPos = useRef(new THREE.Vector3(0, 0, 12));
  
  useFrame((state) => {
    // Extremely subtle mouse parallax: 2-4px translation (0.1 to 0.2 units in 3D), 0.5-1 deg rotation
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    // Translation (max 0.2 units = ~4px visually)
    const targetX = mouseX * 0.2;
    const targetY = mouseY * 0.2;
    
    // Rotation (max 1 degree = ~0.017 rad)
    const targetRotY = -mouseX * 0.015;
    const targetRotX = mouseY * 0.015;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, initPos.current.x + targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, initPos.current.y + targetY, 0.02);
    
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotY, 0.02);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX, 0.02);
  });
  
  return null;
}

function SceneControls() {
  const { scene, camera } = useThree();
  
  useEffect(() => {
    scene.fog = new THREE.FogExp2("#090909", 0.025);
  }, [scene]);

  useFrame(() => {
    const scrollY = (window as any).__lenisScrollY ?? window.scrollY;
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll <= 0) return;
    
    const progress = Math.min(1, Math.max(0, scrollY / totalScroll));
    const targetZ = 12.0 - (progress * 2);
    const targetY = progress * 0.5;
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, 0.025 + (progress * 0.04), 0.05);
    }
  });

  return null;
}

export default function CinematicCanvasEnv() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#080605]">
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        style={{ pointerEvents: "none" }}
        gl={{ antialias: false, powerPreference: "high-performance", stencil: false, depth: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12.0]} fov={50} />
        <CameraController />
        
        <SceneControls />
        <CinematicLighting />

        <React.Suspense fallback={null}>
          <Character25D />
        </React.Suspense>

        <Sparkles 
          count={60} 
          scale={28} 
          size={2.5} 
          speed={0.03} 
          opacity={0.15} 
          color="#eb6e00" 
        />
        <Sparkles 
          count={80} 
          scale={30} 
          size={1.2} 
          speed={0.015} 
          opacity={0.1} 
          color="#ffffff" 
        />
        <React.Suspense fallback={null}>
          {/* @ts-ignore - Prop may not be typed in this version of r3f/postprocessing */}
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.8} mipmapBlur />
            <Noise opacity={0.03} />
            <Vignette eskil={false} offset={0.15} darkness={1.2} />
          </EffectComposer>
        </React.Suspense>
      </Canvas>
    </div>
  );
}
