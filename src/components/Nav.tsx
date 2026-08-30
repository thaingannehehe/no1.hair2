import { forwardRef, useEffect, useState, type RefObject } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const links = [
  { label: 'LOOKBOOK', href: '#lookbook' },
  { label: 'VIDEO', href: '#video' },
  { label: 'DỊCH VỤ', href: '#services-pricing' },
  { label: 'STYLIST', href: '#stylist' },
  { label: 'LIÊN HỆ', href: '#lien-he' },
  { label: 'CÂU HỎI', href: '#faq' },
];

interface NavProps {
  heroRef: RefObject<HTMLElement | null>;
  visible: boolean;
}

const Nav = forwardRef<HTMLElement, NavProps>(({ heroRef, visible }, ref) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insideHero, setInsideHero] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInsideHero(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroRef]);

  const setNavRef = (node: HTMLElement | null) => {
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (!visible) return;
    const navEl = ref && typeof ref !== 'function' ? ref.current : null;
    if (!navEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navEl,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 },
      );
    });
    return () => ctx.revert();
  }, [visible, ref]);

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={setNavRef}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        className={`fixed left-0 top-0 z-[100] flex w-full items-center justify-between px-5 py-6 transition-opacity duration-700 md:px-16 ${visible ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!visible}
      >
        <div
          className={`absolute inset-0 -z-10 border-b border-white/10 bg-[#1C1C1C]/80 backdrop-blur-xl transition-opacity duration-500 ${insideHero ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />

        <div className="relative">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block transition-opacity hover:opacity-80"
          >
            <img
              src="https://res.cloudinary.com/dh8xozmfq/image/upload/v1788069999/logo_r595d3.jpg"
              alt="No.1 Hair Room"
              className="h-10 w-auto object-contain md:h-12"
            />
          </a>
        </div>

        <div className="relative hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="rounded px-3 py-2 text-[12px] font-medium uppercase tracking-[0.05em] text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="relative flex items-center gap-3 sm:gap-4">
          <a
            href="tel:0383451997"
            className="whitespace-nowrap text-[11px] font-medium tracking-[0.05em] text-white/80 transition-colors duration-300 hover:text-white sm:text-[13px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            0383 451 997
          </a>
          <a
            href="https://zalo.me/0383451997"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap bg-white px-6 py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-[#1C1C1C] transition-colors duration-300 hover:bg-white/90 active:scale-95 lg:inline-block"
          >
            ĐẶT LỊCH
          </a>

          <button
            className="relative text-white lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 bg-[#1C1C1C] pt-24">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[12px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:0383451997"
            className="text-[14px] tracking-[0.1em] text-white/80 transition-colors hover:text-white"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            0383 451 997
          </a>
          <a
            href="https://zalo.me/0383451997"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="bg-white px-8 py-4 text-[12px] font-medium uppercase tracking-[0.15em] text-[#1C1C1C] transition-colors duration-300 hover:bg-white/90"
          >
            ĐẶT LỊCH
          </a>
        </div>
      )}
    </>
  );
});

Nav.displayName = 'Nav';

export default Nav;
