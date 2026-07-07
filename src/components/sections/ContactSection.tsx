export default function ContactSection() {
  return (
    <section id="contato" className="relative h-screen w-full flex items-center justify-center bg-[#aaa39c] overflow-hidden">
      {/* Sombra em degradê do preto (#0a0b0d) em ambas as laterais para a cor atual (#aaa39c) */}
      <div
        className="absolute inset-y-0 left-0 w-[45vw] pointer-events-none bg-gradient-to-r from-[#0a0b0d] via-[#0a0b0d]/70 to-transparent z-20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-[25vw] pointer-events-none bg-gradient-to-l from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent z-20"
        aria-hidden="true"
      />
    </section>
  );
}
