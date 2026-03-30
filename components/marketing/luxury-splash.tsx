"use client";

import { useEffect, useState } from "react";
import AnimatedRoseLogo from "@/components/marketing/animated-rose-logo";

type Particle = {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
};

export function LuxurySplash() {
  const [isMoving, setIsMoving] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 26 }, (_, index) => ({
      id: index,
      left: `${32 + Math.random() * 36}%`,
      top: `${22 + Math.random() * 42}%`,
      duration: `${2.2 + Math.random() * 1.5}s`,
      delay: `${Math.random() * 1.4}s`,
    }));
    setParticles(generatedParticles);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const moveTimer = window.setTimeout(() => setIsMoving(true), 3200);
    const hideTimer = window.setTimeout(() => {
      setIsHidden(true);
      document.body.style.overflow = previousOverflow;
    }, 4200);

    return () => {
      window.clearTimeout(moveTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className={isHidden ? "splash hide" : "splash"} aria-hidden="true">
      <div className="splash-backdrop" />
      <div className="mist one" />
      <div className="mist two" />
      <div className="particles">
        {particles.map((particle) => (
          <span
            className="particle"
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="splash-center">
        <div className={isMoving ? "logo-stage centered fade-away" : "logo-stage centered"}>
          <AnimatedRoseLogo size={228} />
        </div>

        <div className="splash-copy">
          <span className="splash-kicker">peekplay</span>
          <h1>Private pleasure, thoughtfully presented.</h1>
          <p>Adult essentials curated with discreet delivery, softer language, and a more luxurious first impression.</p>
        </div>

        <div className={isMoving ? "loading-group fade" : "loading-group"}>
          <div className="loading-text">ENTERING</div>
          <div className="loading-line">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
