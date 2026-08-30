import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA_VIDEO = 'https://res.cloudinary.com/dh8xozmfq/video/upload/v1788069035/Carousel_1_bhpyi3.mp4';
const CTA_POSTER =
  'https://res.cloudinary.com/dh8xozmfq/video/upload/so_0,f_jpg,q_auto/v1788069035/Carousel_1_bhpyi3.jpg';

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Same pattern as VideoCard.tsx: instead of keeping the <video> permanently
  // mounted and toggling .play()/.pause() via ref (which caused the white/blank
  // video bug on Safari / Zalo in-app WebView on iOS), we only mount the
  // <video autoPlay .../> element while the section is in view. Mounting it
  // starts playback natively, unmounting stops it — no manual play()/pause().
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !left || !wrapper) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        },
      );
      gsap.fromTo(
        wrapper,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setMounted(entry.isIntersecting);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Booking call to action"
      className="bg-[#F6F6F5] py-12 md:py-20"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:min-h-[88vh] md:grid-cols-2">
          {/* LEFT — Typography + CTA */}
          <div
            ref={leftRef}
            className="flex flex-col items-center justify-center py-16 text-center md:py-24"
          >
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#767676]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ĐẶT LỊCH HẸN
            </span>
            <h2
  className="mt-8 text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1C1C1C]"
>
  <span className="block">MÁI TÓC MỚI.</span>
  <span className="block">DIỆN MẠO MỚI.</span>

 <span className="mt-3 block font-display text-[clamp(0.7rem,1.2vw,1.2rem)] font-normal italic leading-[1.2] tracking-[-0.035em] text-[#767676]">
  <span className="block">Đã đến lúc</span>
  <span className="block">dành thời gian cho bạn.</span>
</span>
</h2>

<div className="mt-10">
              <a
                href="https://zalo.me/0383451997"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block whitespace-nowrap bg-[#2A2A2A] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#000000] active:scale-95 md:px-10 md:py-5 md:text-[12px] md:tracking-[0.15em]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ĐẶT LỊCH HẸN
              </a>
            </div>
          </div>

          {/* RIGHT — Cinematic video */}
          <div ref={wrapperRef} className="relative min-h-[55vh] md:min-h-full">
            {mounted ? (
              <video
                src={CTA_VIDEO}
                poster={CTA_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                disablePictureInPicture
                aria-label="Salon cinematic video"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              <img
                src={CTA_POSTER}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
