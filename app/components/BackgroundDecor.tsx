"use client";

import { motion } from "motion/react";

export default function BackgroundDecor() {
  return (
    <div 
      aria-hidden="true" 
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -1
      }}
    >
      {/* Dynamic Sweeping Ray of Light (Moving Up & Down) */}
      <motion.div
        animate={{
          y: ["-15vh", "60vh", "-15vh"],
          x: ["-5vw", "8vw", "-5vw"],
          rotate: [-22, -30, -22],
          opacity: [0.65, 0.95, 0.65],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: "-20vw",
          width: "140vw",
          height: "450px",
          background: "linear-gradient(135deg, transparent 0%, rgba(14, 165, 233, 0.16) 35%, rgba(56, 189, 248, 0.22) 50%, rgba(16, 185, 129, 0.12) 65%, transparent 100%)",
          filter: "blur(90px)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      />

      {/* Secondary Complementary Light Ribbon */}
      <motion.div
        animate={{
          y: ["50vh", "-10vh", "50vh"],
          x: ["5vw", "-10vw", "5vw"],
          rotate: [-35, -24, -35],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          right: "-20vw",
          width: "120vw",
          height: "380px",
          background: "linear-gradient(120deg, transparent 0%, rgba(56, 189, 248, 0.14) 40%, rgba(14, 165, 233, 0.18) 55%, transparent 100%)",
          filter: "blur(85px)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      />

      {/* Top Left Floating Ambient Mesh Glow */}
      <motion.div 
        animate={{
          x: [0, 40, -25, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(224, 242, 254, 0.05) 50%, transparent 70%)",
          filter: "blur(70px)",
          willChange: "transform",
        }}
      />

      {/* Top Right Accent Glow */}
      <motion.div 
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -35, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "15%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(186, 230, 253, 0.04) 50%, transparent 70%)",
          filter: "blur(75px)",
          willChange: "transform",
        }}
      />

      {/* Mid-page Emerald Data Node Glow */}
      <motion.div 
        animate={{
          scale: [0.95, 1.12, 0.95],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "55%",
          left: "-10%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 60%)",
          filter: "blur(85px)",
          willChange: "transform",
        }}
      />

      {/* Vector Grid Matrix Overlay */}
      <svg 
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.22,
          maskImage: "radial-gradient(circle at 50% 30%, black, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, black, transparent 85%)"
        }} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}

