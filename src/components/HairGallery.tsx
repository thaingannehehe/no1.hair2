import { useRef, useState } from 'react';

const GALLERY_IMAGES = [
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067134/carousel_gallary_3_wvnkff.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067135/carousel_gallary_5_qykswt.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067135/carousel_gallary_4_k2gtkg.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067135/carousel_gallary_6_msfuix.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067136/carousel_gallary_8_k4m4ky.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067136/carousel_gallary_9_eo0d66.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067136/carousel_gallary_10_ezanjc.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067140/carousel_gallary_7_lzfzyc.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067154/carousel_gallary_13_riasub.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067155/carousel_gallary_15_aaw1uh.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067155/carousel_gallary_11_h0dhar.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067155/carousel_gallary_14_zui06y.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067158/carousel_gallary_16_b5uhxz.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067158/carousel_gallary_12_qybk49.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067173/carousel_gallary_17_zur8vi.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067175/carousel_gallary_18_r5dvn1.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067176/carousel_gallary_19_efedox.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067177/carousel_gallary_20_r8vhox.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067177/carousel_gallary_21_zxpmtx.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067178/carousel_gallary_22_kr7hky.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067178/carousel_gallary_23_x81kpu.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067179/carousel_gallary_24_x8rhoy.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067180/carousel_gallary_1_mnmvbl.jpg',
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788067181/carousel_gallary_2_ryjbvf.jpg',
];

const INITIAL_VISIBLE = 12;

export default function HairGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleImages = showAll ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, INITIAL_VISIBLE);
  const remaining = GALLERY_IMAGES.length - INITIAL_VISIBLE;

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      aria-label="Hair gallery"
      className="bg-[#F6F6F5] pt-12 pb-16 md:pt-16 md:pb-24"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#767676]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Lookbook
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#1C1C1C] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Khoảnh Khắc Của Khách Hàng
          </h2>
          <p
            className="max-w-[480px] text-[14px] leading-[1.8] text-[#767676] md:text-[15px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Các kiểu tóc được thực hiện tại No.1 Hair Salon, từ những đường cắt tỉa tỉ mỉ, kiểu uốn tự nhiên đến những phối màu nhuộm đa chiều. Chúng tôi sẽ mang đến những kiểu tóc vượt cả mong đợi của bạn.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6"
        >
          {visibleImages.map((src, i) => (
            <div
              key={src}
              className="gallery-card group aspect-[3/4] overflow-hidden rounded-xl bg-[#EDEDEC] shadow-[0_2px_12px_rgba(42,34,28,0.06)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(42,34,28,0.12)]"
            >
              <img
                src={src}
                alt={`Kiểu tóc thực tế tại No.1 Hair Salon ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>

        {!showAll && remaining > 0 && (
          <div className="mt-10 flex justify-center md:mt-14">
            <button
              onClick={() => setShowAll(true)}
              className="whitespace-nowrap border border-[#1C1C1C]/25 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-[#1C1C1C] transition-colors duration-300 hover:border-[#1C1C1C]/60 hover:bg-[#1C1C1C]/[0.03] active:scale-95"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Xem Thêm ({remaining})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
