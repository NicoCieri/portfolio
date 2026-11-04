const COLORS = ["#4858f5", "#ff75bf", "#dfff7a", "#7450b8", "#24184c", "#fff9ed"];
const PARTICLE_COUNT = 52;
const DURATION_MS = 1400;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
  alpha: number;
};

export function burstLogoConfetti(originX: number, originY: number): Promise<void> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve();
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "60",
    } satisfies Partial<CSSStyleDeclaration>);
    document.body.appendChild(canvas);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4.5 + Math.random() * 9;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        w: 4 + Math.random() * 6,
        h: 3 + Math.random() * 5,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.45,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        alpha: 1,
      };
    });

    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const t = Math.min(1, elapsed / DURATION_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.vy += 0.28;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.alpha = 1 - easeInQuad(t);

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      cancelAnimationFrame(frame);
      canvas.remove();
      resolve();
    };

    frame = requestAnimationFrame(tick);
  });
}

function easeInQuad(t: number) {
  return t * t;
}
