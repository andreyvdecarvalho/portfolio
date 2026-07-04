import { createFileRoute } from "@tanstack/react-router";
import InteractiveArmorReveal from "@/components/InteractiveArmorReveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="h-screen w-screen bg-neutral-50 flex items-center justify-center overflow-hidden">
      <header className="absolute top-8 left-0 right-0 z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
          Revele a armadura
        </h1>
        <p className="mt-3 text-neutral-600">
          Passe o mouse para revelar. Clique e segure para ativar os LEDs.
        </p>
      </header>
      <InteractiveArmorReveal />
    </main>
  );
}
