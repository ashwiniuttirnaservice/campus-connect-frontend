"use client";

import React from "react";

interface ShinyCardProps {
  children: React.ReactNode;
  className?: string;
}

const ShinyCard: React.FC<ShinyCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative shiny-card rounded-2xl p-6 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] ${className}`}
    >
      {children}

      <style jsx>{`
        .shiny-card {
          background: linear-gradient(135deg, #001233, #003399, #0044cc);
          position: relative;
        }
        .shiny-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.35) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: shine 5s infinite;
        }
        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }
      `}</style>
    </div>
  );
};

export default ShinyCard;
