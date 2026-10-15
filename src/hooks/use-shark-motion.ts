import { useEffect, useRef } from "react";

/** Scope scroll effects to the landing page and leave its layout untouched. */
export function useSharkMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    const configure = () => {
      dispose();
      if (preference.matches) return;

      const reveals = Array.from(root.querySelectorAll<HTMLElement>(
        ".shark-hero-content > *, #directions > div:first-child, .shark-direction, #trainers > *, #gallery > *, #reviews > *, #schedule > *, #prices > *, #club .shark-container > div, #club > div > div, .shark-faq, #contacts .shark-container > *",
      ));
      const layers = Array.from(root.querySelectorAll<HTMLElement>(
        ".shark-hero-content, .shark-hero-image, .shark-direction-image",
      ));
      reveals.forEach(element => {
        element.classList.add("shark-reveal");
        const index = element.classList.contains("shark-direction")
          ? Array.from(element.parentElement?.children ?? []).indexOf(element) : 0;
        element.style.setProperty("--reveal-delay", `${index * 100}ms`);
      });
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      reveals.forEach(element => observer.observe(element));

      const header = root.querySelector<HTMLElement>(".shark-site-header");
      let reference = window.scrollY;
      let headerHidden = false;
      const syncHeader = (y: number) => {
        if (!header) return;
        const delta = y - reference;
        if (y < 40) { headerHidden = false; reference = y; }
        else if (delta > 14) { headerHidden = true; reference = y; }
        else if (delta < -14) { headerHidden = false; reference = y; }
        header.classList.toggle("shark-header-hidden", headerHidden);
      };

      let frame = 0;
      const update = () => {
        frame = 0;
        syncHeader(window.scrollY);
        const mobile = window.innerWidth < 768;
        layers.forEach(element => {
          const anchor = element.closest("section, article");
          if (!anchor) return;
          const rect = anchor.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
          const hero = element.classList.contains("shark-hero-content") || element.classList.contains("shark-hero-image");
          const distance = hero ? -rect.top : window.innerHeight / 2 - (rect.top + rect.height / 2);
          const speed = element.classList.contains("shark-hero-content") ? 0.12 : 0.07;
          const limit = hero ? 45 : 18;
          const offset = Math.max(-limit, Math.min(limit, distance * speed * (mobile ? 0.5 : 1)));
          element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
          element.classList.add("shark-parallax");
        });
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      const focus = (event: FocusEvent) => {
        if (!(event.target instanceof HTMLElement)) return;
        const reveal = event.target.closest(".shark-reveal");
        reveal?.classList.add("is-revealed");
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      root.addEventListener("focusin", focus);
      update();

      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        root.removeEventListener("focusin", focus);
        header?.classList.remove("shark-header-hidden");
        reveals.forEach(element => {
          element.classList.remove("shark-reveal", "is-revealed");
          element.style.removeProperty("--reveal-delay");
        });
        layers.forEach(element => {
          element.classList.remove("shark-parallax");
          element.style.removeProperty("--parallax-y");
        });
      };
    };
    configure();
    preference.addEventListener("change", configure);
    return () => { dispose(); preference.removeEventListener("change", configure); };
  }, []);

  return ref;
}