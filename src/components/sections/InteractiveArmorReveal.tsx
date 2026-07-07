import { useRef, useState, type PointerEvent } from "react";
import img1 from "@/assets/images/andrey.png";
import img2 from "@/assets/images/andrey-ciborg.png";
import img3 from "@/assets/images/andrey-ciborg-completo.png";

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
  radius = 160,
  feather = 110,
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
    <section id="inicio" className="relative h-screen w-full flex items-center justify-center bg-[#aaa39c] overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 py-10 px-6 flex justify-center items-center" data-purpose="top-navigation">
        <ul className="flex gap-6 md:gap-12 items-center">
          <li>
            <a className="nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white opacity-60 hover:opacity-100" href="#inicio">
              Inicio
            </a>
          </li>
          <li>
            <a className="nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white opacity-60 hover:opacity-100" href="#sobre">
              Sobre
            </a>
          </li>
          <li>
            <a className="nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white opacity-60 hover:opacity-100" href="#habilidades">
              Habilidades
            </a>
          </li>
          <li>
            <a className="nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white opacity-60 hover:opacity-100" href="#contato">
              Contato
            </a>
          </li>
        </ul>
      </nav>

      {/* Floating HUD Instruction on Right */}
      <div className="absolute top-28 right-[6vw] md:right-[10vw] z-30 pointer-events-none flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
        <span className="font-michroma text-[8px] tracking-widest uppercase text-white/60">
          [ PASSE O MOUSE E CLIQUE PARA REVELAR ]
        </span>
      </div>

      {/* Left-aligned Hero Content Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-start px-[6vw] md:px-[10vw]">
        <div className="max-w-2xl text-left pointer-events-auto mt-20 md:mt-0">
          <p className="font-michroma text-[9px] md:text-xs tracking-[0.5em] uppercase mb-4 text-[#00ff88] animate-pulse">
            Software &amp; Web Developer
          </p>
          <h1 className="font-michroma text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white select-none">
            ENGENHEIRO <br /> <span className="text-white/50">DE SOFTWARE</span>
          </h1>
          <div className="h-[1px] w-24 bg-[#00ff88]/40 mb-8 hidden lg:block"></div>
          <p className="text-gray-300 max-w-md text-[11px] md:text-sm leading-relaxed mb-10 font-sans">
            Arquitetando e construindo soluções web modernas, sistemas de alta performance e interfaces interativas inovadoras.
          </p>
          <a
            className="inline-block border border-white/20 px-8 py-3 font-michroma text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 rounded-sm text-white"
            href="#sobre"
          >
            Explorar
          </a>
        </div>
      </div>

      {/* Sombra em degradê do preto (#0a0b0d) em ambas as laterais para a cor atual (#aaa39c) */}
      <div
        className="absolute inset-y-0 left-0 w-[45vw] pointer-events-none bg-gradient-to-r from-[#0a0b0d] via-[#0a0b0d]/70 to-transparent z-20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-[25vw] pointer-events-none bg-gradient-to-l from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent z-20"
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="relative w-[70vw] h-screen mx-auto overflow-hidden rounded-2xl bg-[#aaa39c] select-none touch-none cursor-crosshair transition-transform duration-200 ease-out"
        style={{ 
          aspectRatio: "unset",
          transform: pressed ? "translate(0%, 0.7%) scale(0.98)" : "translate(0%, 0%) scale(1)",
          transformOrigin: "center top"
        }}
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
          }}
        />
        <img
          src={pressImage}
          alt="Andrey armor activated"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            opacity: pressed ? 1 : 0,
            transform: "translate(0%, 0%) scale(1)",
            transformOrigin: "center top",
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-55 z-30 pointer-events-none">
        <span className="font-michroma text-[8px] uppercase tracking-[0.3em] text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00ff88] animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
