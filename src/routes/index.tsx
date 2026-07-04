import { createFileRoute } from "@tanstack/react-router";
import InteractiveArmorReveal from "@/components/InteractiveArmorReveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="h-screen w-screen bg-neutral-50 flex items-center justify-center overflow-hidden">
      <header className="absolute top-3 left-0 right-0 z-10 text-center px-4">
        <p className="text-xs md:text-sm text-neutral-600">
          Passe o mouse para revelar. Clique e segure para ativar os LEDs.
        </p>
      </header>
      <InteractiveArmorReveal />
    </main>
  );
}
