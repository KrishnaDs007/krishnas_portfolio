"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";

const AUTO_ROTATE_INTERVAL = 4000;

const getCardsPerView = () => {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(1);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const handlePrevious = useCallback(() => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handleDotClick = (index: number) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = window.setInterval(() => {
      handleNext();
    }, AUTO_ROTATE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [handleNext, isAutoRotating]);

  if (testimonials.length === 0) {
    return null;
  }

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsPerView,
  );

  return (
    <section
      id="testimonials"
      className="min-h-screen flex items-center py-20 bg-accent/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
              Client Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What People <span className="text-primary">Say</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Feedback from founders and technical leads I&apos;ve collaborated
              with
            </p>
          </div>

          <div className="relative">
            {testimonials.length > cardsPerView && (
              <>
                <button
                  onClick={handlePrevious}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 xl:-translate-x-16 p-3 bg-card hover:bg-primary hover:text-primary-foreground rounded-full shadow-lg transition-all z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 xl:translate-x-16 p-3 bg-card hover:bg-primary hover:text-primary-foreground rounded-full shadow-lg transition-all z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ),
                    )}
                  </div>

                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    {testimonial.testimonial}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} @ {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {testimonials.length > cardsPerView && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-border hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
