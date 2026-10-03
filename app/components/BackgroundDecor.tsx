/**
 * Static ambient backdrop. Server component, no JS.
 * Replaces five infinitely-animating, heavily blurred motion layers that
 * kept the GPU busy on every frame.
 */
export default function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft colour fields */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(48rem 32rem at 12% -6%, rgba(14,165,233,0.14), transparent 70%)",
            "radial-gradient(40rem 28rem at 92% 8%, rgba(56,189,248,0.12), transparent 70%)",
            "radial-gradient(36rem 30rem at 70% 105%, rgba(20,184,166,0.08), transparent 70%)",
          ].join(","),
        }}
      />
      {/* faint engineering grid, fading out toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}
