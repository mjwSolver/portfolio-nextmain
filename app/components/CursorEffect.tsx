"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: -400, y: -400 });
  const [trail, setTrail] = useState({ x: -400, y: -400 });
  
  // Using a ref for the mouse position to avoid state-update lag for the lerp
  const mousePos = useRef({ x: -400, y: -400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Lerp animation for the trail
    let animationFrameId: number;
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (mousePos.current.x - prev.x) * 0.1,
        y: prev.y + (mousePos.current.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Primary Glow (Fast) */}
      <div 
        className="cursor-glow primary-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Trailing Glow (Slower) */}
      <div 
        className="cursor-glow trail-glow"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      />
    </>
  );
}
