import { useRef, useEffect } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL = 'https://maps.app.goo.gl/iypbiV6HTBQaUhaU8';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13957.453650651456!2d106.66126616055105!3d10.987655065132243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1004091b767%3A0x475261f05ad2ef66!2zTk8uMSBIQUlSIFNBTE9OIC0gVEjhu6YgROG6plUgTeG7mFQ!5e0!3m2!1sen!2s!4v1788070296357!5m2!1sen!2s';

const CONTACT_INFO = [
  {
    label: 'Địa chỉ',
    icon: MapPin,
    content: (
      <>
        418 Đại Lộ Bình Dương
        <br />
        Phú Lợi, Tp Thủ Dầu Một
      </>
    ),
  },
  {
    label: 'Điện thoại',
    icon: Phone,
    content: (
      <a
        href="tel:0383451997"
        className="text-[#1C1C1C] transition-colors hover:text-[#2A2A2A]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        0383 451 997
      </a>
    ),
  },
  {
    label: 'Giờ mở cửa',
    icon: Clock,
    content: '8:00 AM – 8:00 PM',
  },
];

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactRowRef = useRef<HTMLDivElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const contactRow = contactRowRef.current;
    const mapWrap = mapWrapRef.current;
    if (!section || !header || !contactRow || !mapWrap) return;

    const ctx = gsap.context(() => {
      // Badge label + heading
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        },
      );

      // Contact info items (address / phone / hours)
      gsap.fromTo(
        contactRow.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: contactRow, start: 'top 85%', once: true },
        },
      );

      // Map embed
      gsap.fromTo(
        mapWrap,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: mapWrap, start: 'top 88%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      aria-label="No.1 Hair Room location"
      className="bg-[#F6F6F5] py-16 md:py-24"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#767676]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Địa điểm
          </span>
          <h2
            className="text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1C1C1C]"
          >
            <span className="block">Hãy đến No.1 Hair Room</span>
            <span className="mt-2 block font-display font-normal italic tracking-[-0.045em] text-[#767676]">
              Tại Thủ Dầu Một, Bình Dương
            </span>
          </h2>
        </div>

        {/* Contact information row */}
        <div ref={contactRowRef} className="grid grid-cols-1 gap-10 border-y border-[#1C1C1C]/10 py-10 sm:grid-cols-3 md:gap-8">
          {CONTACT_INFO.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.label} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Icon className="shrink-0 text-[#2A2A2A]" size={18} />
                  <span
                    className="text-[10px] uppercase tracking-[0.28em] text-[#767676]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {info.label}
                  </span>
                </div>
                <p
                  className="text-[16px] leading-[1.7] text-[#1C1C1C] md:text-[17px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {info.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Full-width Google Maps embed */}
        <div ref={mapWrapRef} className="mt-10 md:mt-14">
          <div className="group/map relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(52,40,45,0.06)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(52,40,45,0.12)]">
            <div className="aspect-[16/9] w-full md:aspect-[21/9]">
              <iframe
                src={MAP_EMBED_SRC}
                title="Bản đồ vị trí No.1 Hair Room tại Thủ Dầu Một, Bình Dương"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full"
              />
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-[#1C1C1C] shadow-md backdrop-blur-sm transition-colors hover:bg-white md:right-6 md:top-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mở Google Maps
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
