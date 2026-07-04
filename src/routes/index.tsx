import { createFileRoute } from "@tanstack/react-router";
import InteractiveArmorReveal from "@/components/InteractiveArmorReveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4 py-12 gap-8">
      <header className="text-center max-w-2xl">
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
