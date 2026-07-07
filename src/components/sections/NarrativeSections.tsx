import { useState, useRef, useEffect } from "react";
import cyborgVideo from "@/assets/videos/Cyborg.mp4";

export default function NarrativeSections() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoEnded(true);
      });
    }
  }, []);

  return (
    <div id="narrative-root" className="relative w-full h-screen overflow-hidden">
      <div id="sobre" className="absolute top-0 left-0" />
      <video
        ref={videoRef}
        src={cyborgVideo}
        className="ns-video w-full h-full object-cover"
        preload="auto"
        muted
        playsInline
        loop={false}
        autoPlay={true}
        onEnded={() => setVideoEnded(true)}
        onClick={() => setVideoEnded(true)}
        aria-label="Animação cibernética"
      />
      <div className="ns-image-overlay" aria-hidden="true" />

      {/* Skip animation button */}
      {!videoEnded && (
        <button
          onClick={() => setVideoEnded(true)}
          className="absolute top-10 right-[2vw] md:right-[4vw] z-40 font-michroma text-[9px] md:text-[10px] tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 border border-white/10 hover:border-white/30 px-3 py-1 rounded-sm cursor-pointer pointer-events-auto"
        >
          Pular
        </button>
      )}

      {/* About Me Content Overlay */}
      <div
        className={`absolute inset-0 z-30 flex items-end justify-start px-[2vw] md:px-[4vw] pb-4 md:pb-6 transition-all duration-1000 ease-out ${
          videoEnded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="max-w-3xl text-left">
          <p className="font-michroma text-[10px] md:text-sm tracking-[0.5em] uppercase mb-4 text-[#00ff88] animate-pulse">
            Sobre Mim
          </p>
          <h2 className="font-michroma text-2xl md:text-4xl lg:text-5xl mb-6 leading-tight text-white select-none">
            ENGENHEIRO <br /> <span className="text-white/50">FULL-CYCLE</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#00ff88]/40 mb-8 hidden lg:block"></div>
          
          <div className="space-y-6 text-gray-300 max-w-2xl text-[12px] md:text-base leading-relaxed font-sans">
            <p>
              Sou um <strong className="text-white">Engenheiro de Software graduado pela Faculdade Anhanguera</strong> focado na construção de sistemas corporativos escaláveis e de missão crítica.
            </p>
            <p>
              Desenvolvo soluções robustas no ecossistema <strong className="text-[#00ff88]">Java</strong> e <strong className="text-[#00ff88]">Spring Framework</strong>, complementadas por <strong className="text-[#00ff88]">TypeScript, Angular, React</strong> e <strong className="text-[#00ff88]">Node.js</strong>. Tenho forte vivência na implementação de <strong className="text-white">microsserviços</strong>, <strong className="text-white">Arquitetura Hexagonal</strong> e <strong className="text-white">Clean Architecture</strong>, utilizando <strong className="text-white">Design Patterns</strong> e conceitos <strong className="text-white">SOLID</strong> na manutenção, refatoração e criação de novas funcionalidades com foco em performance e escalabilidade. Também integro soluções de <strong className="text-white">IA Generativa</strong>, Bancos de Dados (<strong className="text-white">SQL e NoSQL</strong>) e orquestração com <strong className="text-white">Docker &amp; Linux</strong>.
            </p>
            <p>
              O que me diferencia é a minha <strong className="text-white">visão sistêmica</strong>: por ter iniciado minha carreira na área de infraestrutura de TI, compreendo a fundo o ciclo de vida completo do software — desde a primeira linha de código até a estabilidade da aplicação rodando em produção.
            </p>
            <p>
              Busco constantemente aliar as melhores práticas de engenharia de software para desenhar soluções de alta disponibilidade que gerem impacto real nos negócios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
