import { useEffect, useRef } from "react";

// SEASONAL — Christmas snow, added 2026-11-10, REMOVE by 2027-01-02.
// Light canvas snowfall for the homepage hero ONLY. Sits above the hero
// background and below the headline/CTA content (z-20 vs content z-30), so
// flakes pass behind the letters. Clipped to the hero's bounds by the
// section's overflow-hidden. Pauses off-screen and when the tab is hidden;
// renders nothing under prefers-reduced-motion. Initializes in an effect
// (after first paint) — never delays or shifts the headline.
type Flake = {
  baseX: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
};

export function HeroSnow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // No snow at all under prefers-reduced-motion.
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    let lastTime = 0;

    const makeFlakes = (count: number) => {
      flakes = new Array(count);
      for (let i = 0; i < count; i++) {
        flakes[i] = {
          baseX: Math.random() * width,
          y: Math.random() * height,
          r: 0.5 + Math.random() * 1.0, // 1–3px diameter
          speed: 14 + Math.random() * 20, // slow fall, px/s
          opacity: 0.15 + Math.random() * 0.35, // capped at 0.5
          swayAmp: 5 + Math.random() * 9,
          swayFreq: 0.4 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
        };
      }
    };

    const fit = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // ~45 flakes desktop, ~22 at phone width — white reads strong on black.
      makeFlakes(w < 640 ? 22 : 45);
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#FFFFFF";
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speed * dt;
        if (f.y - f.r > height) {
          f.y = -f.r;
          f.baseX = Math.random() * width;
        }
        const x = f.baseX + Math.sin(t * f.swayFreq + f.phase) * f.swayAmp;
        ctx.globalAlpha = f.opacity;
        ctx.beginPath();
        ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => (inView && !document.hidden ? start() : stop());

    fit();
    // Start only after the headline has painted (double rAF).
    const boot = requestAnimationFrame(() => requestAnimationFrame(start));

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(parent);
    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => fit());
    ro.observe(parent);

    return () => {
      stop();
      cancelAnimationFrame(boot);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
