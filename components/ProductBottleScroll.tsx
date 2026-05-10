"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { Product } from "@/data/products";
import { ProductTextOverlays } from "@/components/ProductTextOverlays";

interface ProductBottleScrollProps {
  product: Product;
}

const TOTAL_FRAMES = 120;

export function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const loadedRef = useRef(0);
  const isReadyRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const image = framesRef.current[index];
      if (!image || !image.complete || image.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      if (!clientWidth || !clientHeight) return;

      if (canvas.width !== Math.floor(clientWidth * dpr) || canvas.height !== Math.floor(clientHeight * dpr)) {
        canvas.width = Math.floor(clientWidth * dpr);
        canvas.height = Math.floor(clientHeight * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, clientWidth, clientHeight);

      const scale = Math.min(clientWidth / image.naturalWidth, clientHeight / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const dx = (clientWidth - drawWidth) / 2;
      const dy = (clientHeight - drawHeight) / 2;
      ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
    };

    const requestDraw = (index: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(index);
      });
    };

    isReadyRef.current = false;
    loadedRef.current = 0;
    framesRef.current = [];

    for (let i = 1; i <= TOTAL_FRAMES; i += 1) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      const candidates = [
        `${product.folderPath}/${i}.webp`,
        `${product.folderPath}/${i}.jpg`,
        `${product.folderPath}/ezgif-frame-${padded}.jpg`,
      ];
      let candidateIndex = 0;

      const tryLoad = () => {
        img.src = candidates[candidateIndex];
      };

      img.onerror = () => {
        candidateIndex += 1;
        if (candidateIndex < candidates.length) {
          tryLoad();
        }
      };
      img.decoding = "async";
      img.loading = "eager";
      img.onload = () => {
        loadedRef.current += 1;
        if (!isReadyRef.current) {
          isReadyRef.current = true;
          requestDraw(0);
        } else if (i - 1 === currentFrameRef.current) {
          requestDraw(currentFrameRef.current);
        }
      };
      tryLoad();
      framesRef.current.push(img);
    }

    const unsubscribe = scrollYProgress.on("change", (value) => {
      const nextFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(value * (TOTAL_FRAMES - 1))));
      currentFrameRef.current = nextFrame;
      if (isReadyRef.current) requestDraw(nextFrame);
    });

    const onResize = () => {
      if (!isReadyRef.current) return;
      requestDraw(currentFrameRef.current);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [product.folderPath, scrollYProgress]);

  return (
    <section ref={wrapperRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />
        <ProductTextOverlays product={product} progress={scrollYProgress} />
      </div>
    </section>
  );
}
