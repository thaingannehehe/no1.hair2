import { forwardRef, useEffect, useState, useId } from 'react';
import gsap from 'gsap';

const HERO_VIDEO_DESKTOP =
  'https://res.cloudinary.com/dh8xozmfq/video/upload/v1788069035/Hero_ujf2cl.mp4';
const HERO_VIDEO_MOBILE =
  'https://res.cloudinary.com/dh8xozmfq/video/upload/v1788069035/Hero_ujf2cl.mp4';
const HERO_POSTER_MOBILE =
  'https://res.cloudinary.com/dh8xozmfq/video/upload/so_0,f_jpg,q_auto/v1788069035/Hero_ujf2cl.jpg';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

interface HeroProps {
  visible: boolean;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ visible }, ref) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
      : false,
  );
  const headingId = useId();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasEntered(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mql.matches);
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const contentVisible = visible && hasEntered;

  useEffect(() => {
    if (!contentVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.45',
        )
        .fromTo(
          '.hero-cta-row',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4',
        )
        .fromTo(
          '#hero-scroll',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3',
        );
    });

    return () => ctx.revert();
  }, [contentVisible]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-[#1C1C1C]"
    >
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={isMobile ? HERO_POSTER_MOBILE : undefined}
        src={isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP}
        aria-label="Không gian No.1 Hair Room"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }}
        aria-hidden="true"
      />

      <div className="hero-stack pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1
          id={headingId}
          className="hero-title select-none whitespace-nowrap text-white opacity-0"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(3.5rem, 6vw, 6rem)',
            letterSpacing: '-0.045em',
            lineHeight: 0.95,
            mixBlendMode: 'difference',
            WebkitTextStroke: '0.5px rgba(255,255,255,0.2)',
          }}
          aria-hidden={!contentVisible}
        >
          No.1
        </h1>

        <div className="hero-normal-content" aria-hidden={!contentVisible}>
          <p
            className="hero-subtitle mt-5 text-white opacity-0"
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(13px, 1.4vw, 16px)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Phục Vụ Chu Đáo
          </p>

          <div className="hero-cta-row pointer-events-auto mt-8 flex items-center gap-3 opacity-0 md:gap-4">
            <a
              href="https://zalo.me/0383451997"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-[#2A2A2A] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#F6F6F5] transition-colors duration-300 hover:bg-[#000000] active:scale-95 md:px-8 md:text-[12px] md:tracking-[0.15em]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Đặt Lịch Hẹn
            </a>
            <a
              href="#services-pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services-pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="whitespace-nowrap border border-white/60 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-white hover:bg-white/10 active:scale-95 md:px-8 md:text-[12px] md:tracking-[0.15em]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Dịch Vụ &amp; Giá
            </a>
          </div>
        </div>
      </div>

      <div
        id="hero-scroll"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 md:flex"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-white/40"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Cuộn Xuống
        </span>
        <div className="h-12 w-px overflow-hidden bg-white/20">
          <div className="scroll-line h-1/2 w-full bg-white" />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
