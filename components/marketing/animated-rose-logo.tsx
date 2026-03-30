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
  return (
    <div
      className={`animated-rose-image-wrap ${autoPlay ? "play" : ""} ${className}`.trim()}
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
      <img alt="Glowing rose logo" className="animated-rose-image" src="/rose-reference.png" />
    </div>
  );
}
