"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type HeroMedia = { video: string; poster: string };

const PAGE_MEDIA: Record<string, HeroMedia> = {
  "/": { video: "/getsgpr-hero-loop.mp4", poster: "/getsgpr-hero-poster.webp" },
  "/permanent-resident-sg": { video: "/hero-pr.mp4", poster: "/hero-pr.webp" },
  "/singapore-citizen": { video: "/hero-citizenship.mp4", poster: "/hero-citizenship.webp" },
  "/ltvp": { video: "/hero-ltvp.mp4", poster: "/hero-ltvp.webp" },
  "/pr-appeal": { video: "/hero-appeal.mp4", poster: "/hero-appeal.webp" },
  "/sgpr-lite-diy-tier": { video: "/hero-lite.mp4", poster: "/hero-lite.webp" },
  "/sgpr-partnered-do-with-you": { video: "/hero-partnered.mp4", poster: "/hero-partnered.webp" },
  "/sgpr-premium-concierge": { video: "/hero-concierge.mp4", poster: "/hero-concierge.webp" },
};

export function HeroBackgroundVideo() {
  const pathname = usePathname();
  const [canPlay, setCanPlay] = useState(false);
  const media = PAGE_MEDIA[pathname];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanPlay(!motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  if (!media) return null;

  return (
    <>
      <div className="hero-poster" style={{ backgroundImage: `url(${media.poster})` }} aria-hidden="true" />
      {canPlay && (
        <video
          key={media.video}
          className="hero-video"
          src={media.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
    </>
  );
}
