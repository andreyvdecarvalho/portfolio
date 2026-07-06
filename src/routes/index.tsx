import { createFileRoute } from "@tanstack/react-router";
import InteractiveArmorReveal from "@/components/InteractiveArmorReveal";
import NarrativeSections from "@/components/NarrativeSections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="w-screen bg-background">
      <InteractiveArmorReveal />
      <NarrativeSections />
    </main>
  );
}
