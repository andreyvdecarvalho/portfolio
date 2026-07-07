import { createFileRoute } from "@tanstack/react-router";
import InteractiveArmorReveal from "@/components/sections/InteractiveArmorReveal";
import NarrativeSections from "@/components/sections/NarrativeSections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="w-screen bg-[#aaa39c]">
      <InteractiveArmorReveal />
      <NarrativeSections />
    </main>
  );
}
