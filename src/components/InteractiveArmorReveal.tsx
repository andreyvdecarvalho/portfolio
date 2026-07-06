import { useRef, useState, type PointerEvent } from "react";
import img1 from "@/assets/andrey.png";
import img2 from "@/assets/andrey-ciborg.png";
import img3 from "@/assets/andrey-ciborg-completo.png";

interface Props {
  baseImage?: string;
  revealImage?: string;
  pressImage?: string;
  radius?: number;
  feather?: number;
}

export default function InteractiveArmorReveal({
  baseImage = img1,
  revealImage = img2,
  pressImage = img3,
  radius = 140,
  feather = 60,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const inner = radius - feather;
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `radial-gradient(circle ${active ? radius : 0}px at ${pos.x}% ${pos.y}%, black ${inner}px, transparent ${radius}px)`,
    maskImage: `radial-gradient(circle ${active ? radius : 0}px at ${pos.x}% ${pos.y}%, black ${inner}px, transparent ${radius}px)`,
    transition: "-webkit-mask-image 400ms ease-out, mask-image 400ms ease-out, opacity 300ms ease-out",
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center">
      {/* Instrução de uso */}
      <p className="absolute top-3 left-0 right-0 z-10 text-center text-xs md:text-sm text-neutral-500 pointer-events-none select-none">
        Passe o mouse para revelar. Clique e segure para ativar os LEDs.
      </p>

      <div
        ref={ref}
        className="relative w-[70vw] h-screen mx-auto overflow-hidden rounded-2xl bg-background select-none touch-none cursor-crosshair"
        style={{ aspectRatio: "unset" }}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => {
          setActive(false);
          setPressed(false);
        }}
        onPointerMove={handleMove}
        onPointerDown={(e) => {
          handleMove(e);
          setPressed(true);
        }}
        onPointerUp={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
      >
        <img
          src={baseImage}
          alt="Andrey"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "translate(0%, 0%) scale(1)", transformOrigin: "center top" }}
        />
        <img
          src={revealImage}
          alt="Andrey armor"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            ...maskStyle,
            transform: "translate(0%, 0%) scale(1)",
            transformOrigin: "center top",
            filter: "brightness(1.07) contrast(0.97)",
          }}
        />
        <img
          src={pressImage}
          alt="Andrey armor activated"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            opacity: pressed ? 1 : 0,
            transform: "translate(0%, 0.7%) scale(0.98)",
            transformOrigin: "center top",
            filter: "brightness(1.07) contrast(0.97)",
          }}
        />
      </div>

      {/* Scroll indicator — não interfere na lógica interna */}
      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-indicator-text">role para continuar</span>
        <div className="scroll-chevrons">
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
