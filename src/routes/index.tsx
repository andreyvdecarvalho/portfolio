import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import InteractiveArmorReveal from "@/components/sections/InteractiveArmorReveal";
import NarrativeSections from "@/components/sections/NarrativeSections";
import SkillsSection from "@/components/sections/SkillsSection";

export const Route = createFileRoute("/")({
  component: Index,
});

type Section = "inicio" | "sobre" | "habilidades";

function Index() {
  const [activeSection, setActiveSection] = useState<Section>("inicio");

  return (
    <main className="relative w-screen h-screen bg-[#0a0b0d] overflow-hidden">
      {/* Global Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 py-5 px-6 flex justify-center items-center" data-purpose="top-navigation">
        <ul className="flex gap-6 md:gap-12 items-center">
          <li>
            <button
              onClick={() => setActiveSection("inicio")}
              className={`nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white bg-transparent border-none cursor-pointer p-0 outline-none transition-opacity duration-300 ${
                activeSection === "inicio" ? "active opacity-100" : "opacity-85"
              }`}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("sobre")}
              className={`nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white bg-transparent border-none cursor-pointer p-0 outline-none transition-opacity duration-300 ${
                activeSection === "sobre" ? "active opacity-100" : "opacity-85"
              }`}
            >
              Sobre
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("habilidades")}
              className={`nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white bg-transparent border-none cursor-pointer p-0 outline-none transition-opacity duration-300 ${
                activeSection === "habilidades" ? "active opacity-100" : "opacity-85"
              }`}
            >
              Habilidades
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("habilidades")}
              className={`nav-link font-michroma text-[10px] md:text-xs uppercase tracking-[0.3em] text-white bg-transparent border-none cursor-pointer p-0 outline-none transition-opacity duration-300 ${
                activeSection === "habilidades" ? "active opacity-100" : "opacity-85"
              }`}
            >
              Contato
            </button>
          </li>
        </ul>
      </nav>

      {/* Sections Wrapper with Absolute Positioning and Fade Transitions */}
      <div className="relative w-full h-full">
        {/* Section 1: Inicio */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            activeSection === "inicio" ? "opacity-100 z-10 pointer-events-auto scale-100" : "opacity-0 z-0 pointer-events-none scale-95"
          }`}
        >
          <InteractiveArmorReveal onNavigate={setActiveSection} />
        </div>

        {/* Section 2: Sobre */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            activeSection === "sobre" ? "opacity-100 z-10 pointer-events-auto scale-100" : "opacity-0 z-0 pointer-events-none scale-95"
          }`}
        >
          <NarrativeSections />
        </div>

        {/* Section 3: Habilidades */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            activeSection === "habilidades" ? "opacity-100 z-10 pointer-events-auto scale-100" : "opacity-0 z-0 pointer-events-none scale-95"
          }`}
        >
          <SkillsSection />
        </div>
      </div>
    </main>
  );
}
