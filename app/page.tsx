"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductBottleScroll } from "@/components/ProductBottleScroll";
import { products } from "@/data/products";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = useMemo(() => products[currentIndex], [currentIndex]);
  const nextIndex = (currentIndex + 1) % products.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.body.style.setProperty("--product-gradient", product.gradient);
  }, [currentIndex, product.gradient]);

  const goLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <button
        aria-label="Previous flavor"
        onClick={goLeft}
        className="fixed left-3 top-1/2 z-40 -translate-y-1/2 rounded-full border border-white/20 bg-black/25 px-4 py-3 text-2xl backdrop-blur-lg transition hover:scale-105 hover:bg-black/45 md:left-6"
      >
        ←
      </button>

      <button
        aria-label="Next flavor"
        onClick={goRight}
        className="fixed right-3 top-1/2 z-40 -translate-y-1/2 rounded-full border border-white/20 bg-black/25 px-4 py-3 text-2xl backdrop-blur-lg transition hover:scale-105 hover:bg-black/45 md:right-6"
      >
        →
      </button>

      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/35 p-2 backdrop-blur-xl">
        {products.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              currentIndex === index ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {item.id}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative"
        >
          <ProductBottleScroll product={product} />

          <section className="mx-auto max-w-7xl px-6 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="grid gap-8 rounded-3xl border border-white/15 bg-black/20 p-8 backdrop-blur-xl md:grid-cols-2 md:p-12"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/70">Flavor Story</p>
                <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{product.detailsSection.title}</h2>
                <p className="mt-4 text-white/80">{product.detailsSection.description}</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">Visual Details</p>
                <div className="mt-3 overflow-hidden rounded-xl border border-white/20 bg-black/30">
                  <img
                    src={`${product.folderPath}/ezgif-frame-001.jpg`}
                    alt={product.detailsSection.imageAlt}
                    className="h-72 w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-white/70">{product.freshnessSection.title}</p>
                <p className="mt-2 text-white/80">{product.freshnessSection.description}</p>
              </div>
            </motion.div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl border border-white/20 bg-black/30 p-8 md:p-12"
            >
              <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-white/70">Buy Now</p>
                  <h2 className="mt-3 text-4xl font-black md:text-5xl">
                    {product.name}
                    <span className="ml-3 align-middle text-lg font-medium text-white/70">{product.subName}</span>
                  </h2>
                  <p className="mt-4 max-w-2xl text-white/80">{product.description}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {product.buyNowSection.processingParams.map((param) => (
                      <span key={param} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90">
                        {param}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/[0.04] p-6">
                  <p className="text-5xl font-black">{product.buyNowSection.price}</p>
                  <p className="mt-1 text-sm text-white/70">{product.buyNowSection.unit}</p>
                  <button className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-orange-300">
                    Add to Cart
                  </button>
                  <p className="mt-5 text-sm text-white/75">{product.buyNowSection.deliveryPromise}</p>
                  <p className="mt-3 text-sm text-white/65">{product.buyNowSection.returnPolicy}</p>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="px-6 pb-24">
            <button
              onClick={() => setCurrentIndex(nextIndex)}
              className="mx-auto block w-full max-w-5xl -skew-x-12 rounded-3xl border border-white/20 bg-gradient-to-r from-white/20 to-black/40 px-8 py-8 text-left text-white backdrop-blur-lg transition hover:scale-[1.01] hover:border-orange-200/50"
            >
              <div className="skew-x-12">
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">Continue Journey</p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-3xl font-black md:text-4xl">Next Flavor: {products[nextIndex].name}</h3>
                  <span className="text-3xl">→</span>
                </div>
              </div>
            </button>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
