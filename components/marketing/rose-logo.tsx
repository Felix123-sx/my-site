type RoseLogoProps = {
  size?: number;
  showBackground?: boolean;
  className?: string;
};

export default function RoseLogo({
  size = 260,
  showBackground = false,
  className = "",
}: RoseLogoProps) {
  return (
    <div
      className={className}
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
        aria-label="Purple rose logo"
        role="img"
      >
        <defs>
          <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feColorMatrix
              in="blur1"
              type="matrix"
              values="
                1 0 0 0 0
                0 0.7 0 0 0
                0 0 1 0 0
                0 0 0 0.9 0
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

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
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

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
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

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M102 108
            C96 122, 100 139, 114 151
            C113 136, 117 119, 126 106
            C119 103, 110 103, 102 108
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M155 107
            C162 120, 160 139, 148 152
            C148 139, 144 120, 133 107
            C140 104, 148 103, 155 107
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M72 182
            C58 188, 49 200, 51 214
            C67 214, 81 204, 89 188
            C83 187, 77 185, 72 182
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M59 204
            C68 204, 76 198, 82 190
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M108 132
            C114 126, 122 123, 130 123
            C138 123, 146 127, 152 133
            C146 137, 140 140, 133 142
            C126 145, 119 145, 112 142
            C106 139, 101 136, 96 132
            C100 131, 104 131, 108 132
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M124 142
            C124 151, 123 160, 121 170
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M130 142
            C145 158, 152 178, 150 198
            C148 219, 138 238, 131 258
            C124 277, 123 296, 129 315
            C135 334, 136 353, 131 373
            C126 395, 118 416, 111 486
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M118 142
            C108 157, 101 175, 99 194
            C96 214, 101 234, 109 252
            C116 269, 117 286, 112 304
            C107 323, 103 344, 103 365
            C103 395, 106 427, 110 488
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M113 286
            C109 299, 107 312, 109 327
          "
        />

        <path
          fill="none"
          stroke="#d78cff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#purpleGlow)"
          d="
            M128 338
            C123 357, 117 378, 111 404
          "
        />
      </svg>
    </div>
  );
}
