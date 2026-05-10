"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
  product: Product;
  progress: MotionValue<number>;
}

interface OverlaySection {
  title: string;
  subtitle: string;
  range: [number, number, number, number];
}

function OverlayItem({ section, progress }: { section: OverlaySection; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, section.range, [0, 1, 1, 0]);
  const y = useTransform(progress, section.range, [36, 0, 0, -24]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center px-6 text-center" style={{ opacity, y }}>
      <div className="max-w-4xl">
        <h2 className="text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">{section.title}</h2>
        {section.subtitle ? <p className="mt-4 text-base font-medium text-white/80 md:text-xl">{section.subtitle}</p> : null}
      </div>
    </motion.div>
  );
}

export function ProductTextOverlays({ product, progress }: ProductTextOverlaysProps) {
  const sections: OverlaySection[] = [
    { ...product.section1, range: [0.0, 0.1, 0.22, 0.3] },
    { ...product.section2, range: [0.22, 0.32, 0.5, 0.62] },
    { ...product.section3, range: [0.5, 0.62, 0.78, 0.9] },
    { ...product.section4, range: [0.78, 0.88, 0.96, 1.0] },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {sections.map((section) => {
        return <OverlayItem key={section.title} section={section} progress={progress} />;
      })}
    </div>
  );
}
