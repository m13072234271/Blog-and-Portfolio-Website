"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

const FADE_MS = 2000;

interface BackgroundContextType {
  images: string[];
  index: number;
  interval: number;
  random: boolean;
  next: () => void;
  prev: () => void;
  setBgInterval: (ms: number) => void;
  toggleRandom: () => void;
  selectImage: (i: number) => void;
}

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export function useBackground() {
  return useContext(BackgroundContext);
}

export function BackgroundProvider({
  images,
  children,
}: {
  images: string[];
  children: React.ReactNode;
}) {
  const [imgA, setImgA] = useState(0);
  const [imgB, setImgB] = useState(images.length > 1 ? 1 : 0);
  const [showA, setShowA] = useState(true);
  const [index, setIndex] = useState(0);
  const [interval, setBgIntervalState] = useState(1800000);
  const [random, setRandomState] = useState(false);
  const [ready, setReady] = useState(false);
  const locked = useRef(false);
  const indexRef = useRef(0);
  const randomRef = useRef(false);
  const intervalRef = useRef(1800000);

  useEffect(() => { indexRef.current = index; }, [index]);

  const setBgInterval = useCallback((ms: number) => {
    intervalRef.current = ms;
    setBgIntervalState(ms);
  }, []);

  const toggleRandom = useCallback(() => {
    setRandomState((r) => {
      randomRef.current = !r;
      return !r;
    });
  }, []);

  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(r);
  }, []);

  const switchTo = useCallback((targetIdx: number) => {
    if (locked.current || images.length <= 1) return;
    locked.current = true;
    const from = showA ? imgA : imgB;
    if (targetIdx === from) { locked.current = false; return; }

    if (showA) setImgB(targetIdx);
    else setImgA(targetIdx);

    requestAnimationFrame(() => setShowA((s) => !s));
    setIndex(targetIdx);

    setTimeout(() => {
      locked.current = false;
    }, FADE_MS);
  }, [images, imgA, imgB, showA]);

  const next = useCallback(() => {
    const i = indexRef.current;
    if (randomRef.current) {
      let ni;
      do { ni = Math.floor(Math.random() * images.length); } while (ni === i && images.length > 1);
      switchTo(ni);
    } else {
      switchTo((i + 1) % images.length);
    }
  }, [images, switchTo]);

  const prev = useCallback(() => {
    const i = indexRef.current;
    switchTo((i - 1 + images.length) % images.length);
  }, [images, switchTo]);

  useEffect(() => {
    if (!ready || interval <= 0 || images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [ready, interval, next, images.length]);

  if (images.length === 0) {
    return <>{children}</>;
  }

  return (
    <BackgroundContext.Provider
      value={{ images, index, interval, random, next, prev, setBgInterval, toggleRandom, selectImage: (i) => switchTo(i) }}
    >
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(/backgrounds/${images[imgA]})`,
          opacity: showA ? 1 : 0,
          transition: ready ? `opacity ${FADE_MS}ms ease` : "none",
        }}
      />
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(/backgrounds/${images[imgB]})`,
          opacity: showA ? 0 : 1,
          transition: ready ? `opacity ${FADE_MS}ms ease` : "none",
        }}
      />
      {children}
    </BackgroundContext.Provider>
  );
}
