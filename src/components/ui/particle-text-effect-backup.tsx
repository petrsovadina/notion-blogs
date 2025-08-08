"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  char: string;
  targetX: number;
  targetY: number;
  isReturning: boolean;
}

interface ParticleTextEffectProps {
  text: string;
  className?: string;
  particleColor?: string;
  fontSize?: number;
  animationSpeed?: number;
  particleCount?: number;
}

export default function ParticleTextEffect({
  text,
  className,
  particleColor = "currentColor",
  fontSize = 80,
  animationSpeed = 0.02,
  particleCount = 100
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const particles = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createTextParticles = () => {
      particles.current = [];
      
      // Create temporary canvas for text measurement
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.font = `bold ${fontSize}px Space Mono, monospace`;
      const metrics = tempCtx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = fontSize;

      tempCanvas.width = textWidth + 40;
      tempCanvas.height = textHeight + 40;
      
      tempCtx.font = `bold ${fontSize}px Space Mono, monospace`;
      tempCtx.fillStyle = "white";
      tempCtx.textAlign = "center";
      tempCtx.textBaseline = "middle";
      tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);

      // Sample pixels for particle positions
      for (let y = 0; y < tempCanvas.height; y += 4) {
        for (let x = 0; x < tempCanvas.width; x += 4) {
          const index = (y * tempCanvas.width + x) * 4;
          const alpha = data[index + 3];
          
          if (alpha > 128 && particles.current.length < particleCount) {
            const targetX = centerX + (x - tempCanvas.width / 2);
            const targetY = centerY + (y - tempCanvas.height / 2);
            
            particles.current.push({
              x: centerX + (Math.random() - 0.5) * 600,
              y: centerY + (Math.random() - 0.5) * 600,
              vx: 0,
              vy: 0,
              life: 0,
              maxLife: Math.random() * 100 + 100,
              char: text[Math.floor(Math.random() * text.length)],
              targetX,
              targetY,
              isReturning: false
            });
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      ctx.fillStyle = particleColor;
      ctx.font = "12px Space Mono, monospace";
      ctx.textAlign = "center";

      particles.current.forEach((particle, index) => {
        if (!particle.isReturning) {
          // Move towards target
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          
          particle.vx += dx * animationSpeed;
          particle.vy += dy * animationSpeed;
          
          particle.vx *= 0.8;
          particle.vy *= 0.8;
          
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          particle.life++;
          
          // Check if particle should start returning
          if (particle.life > particle.maxLife) {
            particle.isReturning = true;
          }
        } else {
          // Scatter effect
          particle.vx += (Math.random() - 0.5) * 0.5;
          particle.vy += (Math.random() - 0.5) * 0.5;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life++;
          
          // Remove particle when it's far enough
          if (particle.life > particle.maxLife + 60) {
            particles.current.splice(index, 1);
          }
        }
        
        // Calculate opacity based on life
        const opacity = particle.isReturning 
          ? Math.max(0, 1 - (particle.life - particle.maxLife) / 60)
          : Math.min(1, particle.life / 30);
        
        ctx.globalAlpha = opacity;
        ctx.fillText(particle.char, particle.x, particle.y);
      });
      
      ctx.globalAlpha = 1;
      
      if (particles.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    const startAnimation = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      createTextParticles();
      animate();
    };

    // Auto-start animation
    const timer = setTimeout(startAnimation, 500);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [text, fontSize, animationSpeed, particleCount, particleColor, isAnimating]);

  const handleRestart = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // Restart the animation
      particles.current = [];
      const createTextParticles = () => {
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;

        tempCtx.font = `bold ${fontSize}px Space Mono, monospace`;
        const metrics = tempCtx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = fontSize;

        tempCanvas.width = textWidth + 40;
        tempCanvas.height = textHeight + 40;
        
        tempCtx.font = `bold ${fontSize}px Space Mono, monospace`;
        tempCtx.fillStyle = "white";
        tempCtx.textAlign = "center";
        tempCtx.textBaseline = "middle";
        tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);

        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;

        const centerX = canvas.width / (2 * window.devicePixelRatio);
        const centerY = canvas.height / (2 * window.devicePixelRatio);

        for (let y = 0; y < tempCanvas.height; y += 4) {
          for (let x = 0; x < tempCanvas.width; x += 4) {
            const index = (y * tempCanvas.width + x) * 4;
            const alpha = data[index + 3];
            
            if (alpha > 128 && particles.current.length < particleCount) {
              const targetX = centerX + (x - tempCanvas.width / 2);
              const targetY = centerY + (y - tempCanvas.height / 2);
              
              particles.current.push({
                x: centerX + (Math.random() - 0.5) * 600,
                y: centerY + (Math.random() - 0.5) * 600,
                vx: 0,
                vy: 0,
                life: 0,
                maxLife: Math.random() * 100 + 100,
                char: text[Math.floor(Math.random() * text.length)],
                targetX,
                targetY,
                isReturning: false
              });
            }
          }
        }
      };

      createTextParticles();
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
        
        ctx.fillStyle = particleColor;
        ctx.font = "12px Space Mono, monospace";
        ctx.textAlign = "center";

        particles.current.forEach((particle, index) => {
          if (!particle.isReturning) {
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            
            particle.vx += dx * animationSpeed;
            particle.vy += dy * animationSpeed;
            
            particle.vx *= 0.8;
            particle.vy *= 0.8;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            particle.life++;
            
            if (particle.life > particle.maxLife) {
              particle.isReturning = true;
            }
          } else {
            particle.vx += (Math.random() - 0.5) * 0.5;
            particle.vy += (Math.random() - 0.5) * 0.5;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;
            
            if (particle.life > particle.maxLife + 60) {
              particles.current.splice(index, 1);
            }
          }
          
          const opacity = particle.isReturning 
            ? Math.max(0, 1 - (particle.life - particle.maxLife) / 60)
            : Math.min(1, particle.life / 30);
          
          ctx.globalAlpha = opacity;
          ctx.fillText(particle.char, particle.x, particle.y);
        });
        
        ctx.globalAlpha = 1;
        
        if (particles.current.length > 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      animate();
    }, 100);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ 
          height: `${fontSize * 1.5}px`,
          minHeight: '80px'
        }}
        onClick={handleRestart}
      />
    </div>
  );
}