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
// 25vh means very little scrolling is needed per section (approx 1-2 wheel ticks)
const SCROLL_PER_SECTION_VH = 25;
const TOTAL_HEIGHT_VH = (sections.length * SCROLL_PER_SECTION_VH) + 100;

export default function NarrativeSections() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const activeSectionRef = useRef(-1);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const rect = scrollArea.getBoundingClientRect();
      const scrolled = -rect.top;
      const sectionHeightPx = (SCROLL_PER_SECTION_VH / 100) * window.innerHeight;
      const totalScrollPx = sectionHeightPx * sections.length;
      const lastIdx = sections.length - 1;

      // Determine active section index
      let newActiveIndex = -1;
      sections.forEach((_, index) => {
        const start = index * sectionHeightPx;
        const end = (index + 1) * sectionHeightPx;
        if (index === lastIdx ? scrolled >= start : scrolled >= start && scrolled < end) {
          newActiveIndex = index;
        }
      });

      // Handle Video Playback Trigger
      if (videoRef.current && videoRef.current.readyState >= 1 && newActiveIndex !== -1) {
        const duration = videoRef.current.duration;
        const segmentLen = duration / sections.length;

        if (newActiveIndex !== activeSectionRef.current) {
          const prevIndex = activeSectionRef.current;
          activeSectionRef.current = newActiveIndex;

          const targetStart = newActiveIndex * segmentLen;
          const targetEnd = (newActiveIndex + 1) * segmentLen;
          
          targetTimeRef.current = targetEnd;

          // If scrolled backwards or skipped forward, jump directly to the section start
          if (newActiveIndex < prevIndex || newActiveIndex > prevIndex + 1) {
            videoRef.current.currentTime = targetStart;
          }
          
          // Play the video until it reaches targetEnd
          videoRef.current.play().catch(() => {});
        }
      }

      // Update Text Panels and Nav
      sections.forEach((_, index) => {
        const start = index * sectionHeightPx;
        const end = (index + 1) * sectionHeightPx;
        const isActive = index === newActiveIndex;

        const panel = panelsRef.current[index];
        const progress = progressRef.current[index];

        if (panel) panel.classList.toggle("ns-active", isActive);

        const dot = dotsRef.current[index];
        if (dot) dot.classList.toggle("ns-active", isActive);

        if (progress) {
          if (isActive) {
            const sectionProgress = Math.min(
              1,
              Math.max(0, (scrolled - start) / sectionHeightPx),
            );
            progress.style.transform = `scaleX(${sectionProgress})`;
          } else if (index < newActiveIndex) {
            progress.style.transform = `scaleX(1)`;
          } else {
            progress.style.transform = `scaleX(0)`;
          }
        }
      });
    };

    // Force video engine to wake up (crucial for iOS and some desktop browsers)
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        videoRef.current?.pause();
      }).catch(() => {});
      videoRef.current.addEventListener('loadedmetadata', handleScroll);
    }
    
    // Play loop that monitors when to pause
    const renderLoop = () => {
      const video = videoRef.current;
      if (!video) {
        rafRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      if (!video.paused) {
        // Stop playing if we reached the target time for this section
        if (video.currentTime >= targetTimeRef.current) {
          video.pause();
          video.currentTime = targetTimeRef.current; // exact stop
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
