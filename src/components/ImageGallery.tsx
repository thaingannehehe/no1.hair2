import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067180/carousel_gallary_1_mnmvbl.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067181/carousel_gallary_2_ryjbvf.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067178/carousel_gallary_23_x81kpu.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067178/carousel_gallary_22_kr7hky.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067177/carousel_gallary_21_zxpmtx.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067177/carousel_gallary_20_r8vhox.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067176/carousel_gallary_19_efedox.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067175/carousel_gallary_18_r5dvn1.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067173/carousel_gallary_17_zur8vi.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067155/carousel_gallary_11_h0dhar.jpg',
];

const ImageGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    if (!section || !header || !track) return;

    const ctx = gsap.context(() => {
      // Heading + description
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

      // Gallery images — opacity only (no transform) so it never fights
      // with the marquee's own translateX CSS animation on the track.
      gsap.fromTo(
        track.children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lookbook" className="overflow-hidden bg-[#F6F6F5] pb-4 pt-16 sm:pb-6 sm:pt-20" aria-labelledby="lookbook-heading">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.38em] text-[#767676] sm:mb-8">
          Lookbook
        </p>

        <div ref={headerRef} className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <h2
            id="lookbook-heading"
            className="lg:col-span-7 max-w-[760px] text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1C1C1C]"
          >
            <span className="block">Diện mạo mới, tự tin hơn </span>
            <span className="mt-2 block font-display font-normal italic tracking-[-0.045em] text-[#767676]">
              Cùng No.1 Hair Room
            </span>
          </h2>

          <p className="lg:col-span-5 font-body pb-1 text-[15px] leading-[1.75] tracking-[-0.01em] text-[#767676]">
          Trải nghiệm diện mạo mới với No.1 Hair Room, nơi mỗi kiểu tóc được chăm chút theo cá tính, phong cách và đường nét riêng của bạn. Từ cắt, nhuộm đến tạo kiểu, chúng tôi giúp bạn tìm thấy mái tóc phù hợp và tự tin hơn mỗi ngày.
          </p>
        </div>
      </div>

      <div
        className="gallery-marquee-viewport mt-20 overflow-hidden sm:mt-28"
        style={{ height: 'clamp(260px, 44vw, 580px)' }}
      >
        <div ref={trackRef} className="gallery-marquee-track flex h-full w-max will-change-transform gap-3">
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, i) => (
            <div
              key={i}
              className="h-full shrink-0 overflow-hidden"
              style={{ width: 'clamp(200px, 33vw, 480px)' }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-full w-full select-none object-cover object-center"
                style={{ display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
