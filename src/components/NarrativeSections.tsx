import { useEffect, useRef } from "react";
import cyborgVideo from "@/assets/Cyborg.mp4";

interface SectionData {
  id: number;
  label: string;
  title: string;
  subtitle: string;
}

const sections: SectionData[] = [
  {
    id: 1,
    label: "UNIDADE 001",
    title: "Silhueta na Névoa",
    subtitle: "Primeiro contato. O perfil emerge das sombras.",
  },
  {
    id: 2,
    label: "UNIDADE 002",
    title: "Aproximação",
    subtitle: "A câmera gira. O visor começa a pulsar.",
  },
  {
    id: 3,
    label: "UNIDADE 003",
    title: "Interface Ativa",
    subtitle: "O HUD carrega. Dados em tempo real.",
  },
  {
    id: 4,
    label: "UNIDADE 004",
    title: "Contato Visual",
    subtitle: "Frontal total. A armadura se revela por completo.",
  },
];

// Each section gets this many vh of scroll distance
const SCROLL_PER_SECTION_VH = 110;
const TOTAL_HEIGHT_VH = sections.length * SCROLL_PER_SECTION_VH;

export default function NarrativeSections() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  
  // Use a ref to store the target time for lerping to avoid triggering re-renders
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    // Animations proceed regardless of OS preferences for this specific section

    const handleScroll = () => {
      const rect = scrollArea.getBoundingClientRect();
      const scrolled = -rect.top;
      const sectionHeightPx = (SCROLL_PER_SECTION_VH / 100) * window.innerHeight;
      const totalScrollPx = sectionHeightPx * sections.length;
      const lastIdx = sections.length - 1;

      console.log(`handleScroll fired, scrolled=${scrolled}, readyState=${videoRef.current?.readyState}`);

      // Update Video Target Time
      if (videoRef.current && videoRef.current.readyState >= 1) { // HAVE_METADATA or more
        const duration = videoRef.current.duration;
        if (duration) {
          // Calculate global progress within the scroll area
          const maxScroll = totalScrollPx - window.innerHeight;
          const globalProgress = Math.max(0, Math.min(1, scrolled / maxScroll));
          // Video time mapped to global progress
          targetTimeRef.current = globalProgress * duration;
          console.log(`SCROLL: prog=${globalProgress.toFixed(2)}, target=${targetTimeRef.current.toFixed(2)}`);
        }
      }

      // Update Text Panels and Nav
      sections.forEach((_, index) => {
        const start = index * sectionHeightPx;
        const end = (index + 1) * sectionHeightPx;

        const isActive =
          index === lastIdx ? scrolled >= start : scrolled >= start && scrolled < end;

        const panel = panelsRef.current[index];
        const progress = progressRef.current[index];

        if (panel) panel.classList.toggle("ns-active", isActive);

        const dot = dotsRef.current[index];
        if (dot) dot.classList.toggle("ns-active", isActive);

        if (progress && isActive) {
          const sectionProgress = Math.min(
            1,
            Math.max(0, (scrolled - start) / sectionHeightPx),
          );
          progress.style.width = `${sectionProgress * 100}%`;
        }
      });
    };

    // Force video engine to wake up (crucial for iOS and some desktop browsers)
    // Otherwise setting currentTime is silently ignored!
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        videoRef.current?.pause();
      }).catch(() => {
        // Ignore autoplay policy errors, the attempt itself usually unlocks seeking
      });
      // Also ensure handleScroll is called once metadata is ready
      videoRef.current.addEventListener('loadedmetadata', handleScroll);
    }

    let lastSeek = 0;
    
    // Smooth scrub loop
    const renderLoop = (time: number) => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }

      const target = targetTimeRef.current;
      // Mathematical Lerp (Linear Interpolation) to glide the time smoothly
      smoothedTimeRef.current += (target - smoothedTimeRef.current) * 0.08;

      if (videoRef.current) {
        const video = videoRef.current;
        const current = video.currentTime;
        
        const diff = smoothedTimeRef.current - current;
        // Throttle updates to ~30fps (33ms) to prevent H264 decoder lockups
        // while maintaining the buttery smooth visual glide
        if (Math.abs(diff) > 0.02 && (time - lastSeek > 33)) {
          video.currentTime = smoothedTimeRef.current;
          lastSeek = time;
        }
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div id="narrative-root" className="relative">
      <div className="narrative-gradient-transition" aria-hidden="true" />

      <div
        ref={scrollAreaRef}
        className="ns-scroll-area"
        style={{ height: `${TOTAL_HEIGHT_VH}vh` }}
      >
        <div ref={stickyRef} className="ns-sticky">
          {/* ── RIGHT: Video Scrubber ─────────────────────────── */}
          <div className="ns-video-wrapper">
            <video
              ref={videoRef}
              src={cyborgVideo}
              className="ns-video"
              preload="auto"
              muted
              playsInline
              loop={false}
              autoPlay={false}
              aria-label="Animação cibernética controlada pelo scroll"
            />
            <div className="ns-image-overlay" aria-hidden="true" />
          </div>

          {/* ── LEFT: stacked text panels ─────────────────────── */}
          <div className="ns-panels-wrapper">
            {sections.map((sec, i) => (
              <div
                key={sec.id}
                ref={(el) => {
                  if (el) panelsRef.current[i] = el;
                }}
                className="ns-panel"
              >
                <div className="ns-counter">
                  <span className="ns-counter-active">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ns-counter-sep">/</span>
                  <span className="ns-counter-total">{String(sections.length).padStart(2, "0")}</span>
                </div>

                <span className="ns-label">{sec.label}</span>
                <h2 className="ns-title">{sec.title}</h2>
                <p className="ns-subtitle">{sec.subtitle}</p>

                <div className="ns-progress-bar">
                  <div
                    ref={(el) => {
                      if (el) progressRef.current[i] = el;
                    }}
                    className="ns-progress-fill"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Section dots navigation ───────────────────────── */}
          <nav className="ns-dots" aria-label="Seções">
            {sections.map((sec, i) => (
              <div
                key={sec.id}
                ref={(el) => {
                  if (el) dotsRef.current[i] = el;
                }}
                className="ns-dot"
                data-index={i}
                title={sec.title}
                aria-label={sec.label}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
