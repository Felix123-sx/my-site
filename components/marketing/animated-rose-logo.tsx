import React from "react";

export type AnimatedRoseLogoProps = {
  size?: number;
  className?: string;
  showBackground?: boolean;
  autoPlay?: boolean;
};

export default function AnimatedRoseLogo({
  size = 260,
  className = "",
  showBackground = false,
  autoPlay = true,
}: AnimatedRoseLogoProps) {
  const playClass = autoPlay ? "play" : "";

  return (
    <div
      className={`rose-logo-wrap ${playClass} ${className}`}
      style={{
        width: size,
        height: size * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: showBackground
          ? "radial-gradient(circle at center, rgba(110,30,160,0.08), transparent 45%), #07020b"
          : "transparent",
      }}
    >
      <svg
        viewBox="0 0 260 520"
        width="100%"
        height="100%"
        aria-label="Animated purple rose logo"
        role="img"
      >
        <defs>
          <filter id="purpleGlowAnimated" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur1" />
            <feColorMatrix
              in="blur1"
              type="matrix"
              values="
                1 0 0 0 0
                0 0.7 0 0 0
                0 0 1 0 0
                0 0 0 0.95 0
              "
              result="glow1"
            />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feColorMatrix
              in="blur2"
              type="matrix"
              values="
                1 0 0 0 0
                0 0.45 0 0 0
                0 0 1 0 0
                0 0 0 0.35 0
              "
              result="glow2"
            />
            <feMerge>
              <feMergeNode in="glow2" />
              <feMergeNode in="glow1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>
          {`
            .rose-line {
              fill: none;
              stroke: #d78cff;
              stroke-linecap: round;
              stroke-linejoin: round;
              filter: url(#purpleGlowAnimated);
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              opacity: 0.95;
            }

            .main {
              stroke-width: 7;
            }

            .thin {
              stroke-width: 4.5;
            }

            .rose-logo-wrap.play .draw-1 {
              animation:
                roseDraw 0.8s ease forwards 0.15s,
                rosePulse 2.4s ease-in-out infinite 2.4s;
            }

            .rose-logo-wrap.play .draw-2 {
              animation:
                roseDraw 0.9s ease forwards 0.75s,
                rosePulse 2.4s ease-in-out infinite 2.4s;
            }

            .rose-logo-wrap.play .draw-3 {
              animation:
                roseDraw 0.45s ease forwards 1.2s,
                rosePulse 2.4s ease-in-out infinite 2.4s;
            }

            .rose-logo-wrap.play .draw-4 {
              animation:
                roseDraw 1.2s ease forwards 1.45s,
                rosePulse 2.4s ease-in-out infinite 2.4s;
            }

            .rose-logo-wrap.play .draw-5 {
              animation:
                roseDraw 0.45s ease forwards 1.95s,
                rosePulse 2.4s ease-in-out infinite 2.4s;
            }

            .rose-logo-wrap.play .draw-6 {
              animation:
                roseDraw 0.5s ease forwards 2.05s,
                rosePulse 2.4s ease-in-out infinite 2.4s;
            }

            @keyframes roseDraw {
              0% {
                stroke-dashoffset: 1000;
                opacity: 0.75;
              }
              100% {
                stroke-dashoffset: 0;
                opacity: 1;
              }
            }

            @keyframes rosePulse {
              0%, 100% {
                opacity: 0.92;
              }
              50% {
                opacity: 1;
              }
            }
          `}
        </style>

        {/* 花心 */}
        <path
          className="rose-line thin draw-1"
          d="
            M126 56
            C118 50, 107 52, 103 61
            C110 57, 120 58, 126 64
            C133 60, 142 62, 145 70
            C139 66, 132 66, 126 69
            C121 66, 113 66, 108 72
            C109 64, 115 58, 126 56
          "
        />

        {/* 外花瓣 */}
        <path
          className="rose-line main draw-2"
          d="
            M90 92
            C96 76, 112 66, 130 68
            C146 66, 165 74, 176 92
            C169 90, 160 93, 151 101
            C144 108, 138 118, 132 127
            C121 115, 110 106, 99 100
            C95 98, 92 95, 90 92
          "
        />

        {/* 左内瓣 */}
        <path
          className="rose-line main draw-3"
          d="
            M102 108
            C96 122, 100 139, 114 151
            C113 136, 117 119, 126 106
            C119 103, 110 103, 102 108
          "
        />

        {/* 右内瓣 */}
        <path
          className="rose-line main draw-3"
          d="
            M155 107
            C162 120, 160 139, 148 152
            C148 139, 144 120, 133 107
            C140 104, 148 103, 155 107
          "
        />

        {/* 左小叶 */}
        <path
          className="rose-line main draw-4"
          d="
            M72 182
            C58 188, 49 200, 51 214
            C67 214, 81 204, 89 188
            C83 187, 77 185, 72 182
          "
        />

        {/* 左叶脉 */}
        <path
          className="rose-line thin draw-5"
          d="
            M59 204
            C68 204, 76 198, 82 190
          "
        />

        {/* 主体外轮廓（右边） */}
        <path
          className="rose-line main draw-4"
          d="
            M132 128
            C151 140, 178 157, 186 185
            C194 212, 177 237, 163 258
            C149 280, 146 302, 158 325
            C171 351, 173 380, 160 408
            C148 434, 126 455, 112 486
          "
        />

        {/* 主体内轮廓（左边） */}
        <path
          className="rose-line main draw-4"
          d="
            M129 129
            C116 141, 96 160, 90 184
            C83 210, 90 234, 105 255
            C118 274, 120 294, 112 317
            C103 344, 98 373, 101 407
            C103 435, 106 459, 110 488
          "
        />

        {/* 腰臀内线 */}
        <path
          className="rose-line thin draw-6"
          d="
            M113 281
            C104 292, 100 308, 104 326
          "
        />

        {/* 右腿内线 */}
        <path
          className="rose-line thin draw-6"
          d="
            M146 335
            C138 355, 127 375, 113 402
          "
        />

        {/* 花朵到底部连接线 */}
        <path
          className="rose-line thin draw-5"
          d="
            M131 128
            C126 145, 122 160, 120 176
          "
        />
      </svg>
    </div>
  );
}
