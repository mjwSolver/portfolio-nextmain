"use client";

/**
 * Click a logo in the strip and it gets knocked out: a copy is tossed into
 * the air, spins, bounces off the bottom and sides of the screen, then drops
 * out. The original slot reappears with a little pop a few seconds later.
 *
 * Physics runs in one rAF loop per throw and writes transforms directly, so
 * React never re-renders while a logo is flying.
 */

const GRAVITY = 2600; // px/s²
const RESTITUTION = 0.5; // bounce energy kept
const FRICTION = 0.8; // horizontal speed kept per floor hit
const MAX_BOUNCES = 3;
const RESPAWN_MS = 3500;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function launch(el: HTMLElement) {
  if (el.dataset.falling) return;
  el.dataset.falling = "1";

  const rect = el.getBoundingClientRect();
  const clone = el.cloneNode(true) as HTMLElement;
  clone.setAttribute("aria-hidden", "true");
  clone.removeAttribute("data-logo");
  Object.assign(clone.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: "0",
    zIndex: "60",
    pointerEvents: "none",
    filter: "none",
    opacity: "1",
    color: "var(--color-ink)",
    willChange: "transform",
    transition: "none",
  });
  document.body.appendChild(clone);
  el.style.visibility = "hidden";

  // Initial toss: up and to a random side, with spin.
  let x = 0;
  let y = 0;
  let vx = rand(-320, 320);
  let vy = rand(-900, -650);
  let angle = 0;
  let spin = rand(-720, 720);
  let bounces = 0;
  let last = performance.now();

  const floor = () => window.innerHeight - rect.bottom;
  const leftWall = -rect.left;
  const rightWall = () => window.innerWidth - rect.right;

  const step = (now: number) => {
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;

    vy += GRAVITY * dt;
    x += vx * dt;
    y += vy * dt;
    angle += spin * dt;

    // Side walls keep it on screen while it bounces.
    if (x < leftWall) {
      x = leftWall;
      vx = Math.abs(vx) * RESTITUTION;
      spin *= -0.7;
    } else if (x > rightWall()) {
      x = rightWall();
      vx = -Math.abs(vx) * RESTITUTION;
      spin *= -0.7;
    }

    // Floor bounces, then let it fall through and out of view.
    if (bounces < MAX_BOUNCES && y > floor()) {
      y = floor();
      vy = -Math.abs(vy) * RESTITUTION;
      vx *= FRICTION;
      spin = spin * 0.6 + vx * 0.8;
      bounces += 1;
    }

    clone.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;

    if (y > floor() + rect.height + 200) {
      clone.remove();
      return;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);

  window.setTimeout(() => {
    el.style.visibility = "";
    delete el.dataset.falling;
    el.animate(
      [
        { transform: "scale(0.3)", opacity: 0 },
        { transform: "scale(1.12)", opacity: 1, offset: 0.7 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 520, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    );
  }, RESPAWN_MS);
}

export default function LogoPhysics({ children }: { children: React.ReactNode }) {
  const onClick = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-logo]");
    if (target) launch(target);
  };

  return <div onClick={onClick}>{children}</div>;
}
