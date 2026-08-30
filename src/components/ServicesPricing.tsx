const PRICE_MENU_IMAGE =
  'https://res.cloudinary.com/dh8xozmfq/image/upload/v1788071385/price_vh6mav.jpg';

export default function ServicesPricing() {
  return (
    <section id="services-pricing" aria-label="Services and pricing" className="bg-[#F6F6F5] py-20 md:py-28">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[620px] text-center">
          <span
            className="text-[10px] uppercase tracking-[0.38em] text-[#767676]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Bảng Giá · Full Menu
          </span>
          <h2
            className="mt-5 text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1C1C1C]"
          >
            <span className="block">Dịch Vụ &amp; Bảng Giá</span>
            <span className="mt-2 block font-display font-normal italic tracking-[-0.045em] text-[#767676]">
              Công khai, minh bạch
            </span>
          </h2>
          <p
            className="mx-auto mt-7 max-w-[500px] text-[14px] leading-[1.8] text-[#767676] md:text-[15px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Bảng giá dịch vụ đầy đủ tại No.1 Hair Room, Thủ Dầu Một, Bình Dương.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[820px] md:mt-20">
          <div className="overflow-hidden rounded-2xl border border-[#1C1C1C]/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <img
              src={PRICE_MENU_IMAGE}
              alt="Bảng giá dịch vụ No.1 Hair Room"
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
