import { guid } from "@/lib/guid";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Swiper } from "swiper";
import "swiper/swiper-bundle.css";

interface Slide {
  url: string;
  key: string;
}

const SwiperAutoScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swiper = useRef<Swiper | null>(null);
  const timeout = useRef<number | null>(null);

  const slides = useMemo<Slide[]>(
    () =>
      Array.from({ length: 12 }, () => ({
        url: "https://placehold.co/400x600",
        key: guid(),
      })),
    []
  );

  const initializeSwiper = useCallback((): Swiper | null => {
    if (!containerRef.current) return null;

    return new Swiper(containerRef.current, {
      loop: true,
      speed: 3000,
      slidesPerView: 5,
      spaceBetween: 4,
    });
  }, []);

  const startMarquee = useCallback(() => {
    if (!swiper.current) return;

    swiper.current.slideTo(swiper.current.slides.length, 3000);

    swiper.current.once("transitionEnd", () => {
      if (!swiper.current) return;
      swiper.current.slideTo(swiper.current.params.slidesPerView as number, 0, false);
      timeout.current = setTimeout(() => startMarquee(), 0);
    });
  }, []);

  const stopMarquee = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    swiper.current = initializeSwiper();
    startMarquee();

    return () => {
      stopMarquee();
      swiper.current?.destroy(true, true);
    };
  }, [initializeSwiper, startMarquee, stopMarquee]);

  return (
    <div ref={containerRef} className="swiper">
      <div className="swiper-wrapper">
        {slides.map((slide) => (
          <div key={slide.key} className="swiper-slide">
            <img src={slide.url} alt="slide" width="100%" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperAutoScroll;
