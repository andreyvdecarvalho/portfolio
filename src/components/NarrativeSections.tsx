import cyborgVideo from "@/assets/Cyborg.mp4";

export default function NarrativeSections() {
  return (
    <div id="narrative-root" className="relative w-full h-screen overflow-hidden">
      <video
        src={cyborgVideo}
        className="ns-video w-full h-full object-cover"
        preload="auto"
        muted
        playsInline
        loop={false}
        autoPlay={true}
        aria-label="Animação cibernética"
      />
      <div className="ns-image-overlay" aria-hidden="true" />
    </div>
  );
}
