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
      className={`rose-logo-image-wrap ${className}`.trim()}
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
      <img alt="Rose logo" className="rose-logo-image" src="/rose-reference.png" />
    </div>
  );
}
