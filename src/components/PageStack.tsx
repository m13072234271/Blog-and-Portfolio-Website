'use client';

import { useState, useRef, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import { SITE } from '@/config/site';
import { PageStackContext, type ContentPage, PATH_TO_PAGE } from '@/contexts/page-stack';

const DURATION = 600;
const EASING = 'cubic-bezier(0.32, 0.72, 0, 1)';
const DETAIL_RE = /^\/(blogs|works)\/.+/;

function derivePage(path: string): ContentPage {
  return PATH_TO_PAGE[path]
    || (path.startsWith('/blogs') ? 'blogs' : path.startsWith('/works') ? 'works' : 'home');
}

function deriveContent(path: string) {
  return { page: derivePage(path), url: path, showChildren: DETAIL_RE.test(path) };
}

interface PageStackProps {
  pages: Record<ContentPage, ReactNode>;
  children?: ReactNode;
  initialLayer?: 'root' | 'content';
}

export default function PageStack({
  pages,
  children,
  initialLayer = 'root',
}: PageStackProps) {
  const pathname = usePathname();
  const [layer, setLayer] = useState<'root' | 'content'>(initialLayer);
  const initPath = initialLayer === 'root' && pathname === '/' ? '/home' : (pathname || '/home');
  const [content, setContent] = useState(() => deriveContent(initPath));
  const [ready, setReady] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLElement>(null);
  const animating = useRef(false);
  const lyr = useRef(layer);
  const cnt = useRef(content);

  useEffect(() => {
    lyr.current = layer;
    cnt.current = content;
  }, [layer, content]);

  const goLayer = useCallback((target: 'root' | 'content') => {
    if (animating.current) return;
    if (target === lyr.current) return;
    animating.current = true;
    setLayer(target);
    window.history.replaceState(null, '', target === 'root' ? '/' : cnt.current.url);
  }, []);

  const goPage = useCallback((href: string) => {
    if (animating.current) return;
    if (href === '/' && lyr.current === 'root') return;
    if (lyr.current === 'content' && cnt.current.url === href) return;
    animating.current = true;
    if (href === '/') {
      setLayer('root');
      window.history.pushState(null, '', '/');
      return;
    }
    const next = deriveContent(href);
    setContent(next);
    setLayer('content');
    window.history.pushState(null, '', href);
  }, []);

  useEffect(() => {
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const done = () => { animating.current = false; };
    el.addEventListener('transitionend', done);
    return () => el.removeEventListener('transitionend', done);
  }, []);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (animating.current) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-floating-panel]")) return;
      if (lyr.current === 'root' && e.deltaY > 0) { e.preventDefault(); goLayer('content'); }
      else if (lyr.current === 'content' && e.deltaY < 0 && (contentAreaRef.current?.scrollTop ?? 0) <= 0 && !cnt.current.showChildren) {
        e.preventDefault(); goLayer('root');
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goLayer]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    let startY = 0;
    let active = false;

    const onStart = (e: TouchEvent) => { if (!animating.current) { startY = e.touches[0].clientY; active = true; } };
    const onMove = (e: TouchEvent) => {
      if (!active || animating.current) return;
      const dy = e.touches[0].clientY - startY;
      if (lyr.current === 'root' && dy < -50) { e.preventDefault(); active = false; goLayer('content'); }
      else if (lyr.current === 'content' && dy > 50 && (contentAreaRef.current?.scrollTop ?? 0) <= 0 && !cnt.current.showChildren) {
        e.preventDefault(); active = false; goLayer('root');
      }
    };
    const onEnd = () => { active = false; };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd);
    return () => { el.removeEventListener('touchstart', onStart); el.removeEventListener('touchmove', onMove); el.removeEventListener('touchend', onEnd); };
  }, [goLayer]);

  useEffect(() => {
    const onPop = () => {
      if (animating.current) return;
      animating.current = true;
      const p = window.location.pathname;
      if (p === '/') { setLayer('root'); } else { setContent(deriveContent(p)); setLayer('content'); }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (animating.current) return;
    const p = pathname || '/';
    if (p === '/' && initialLayer === 'root') return;
    const next = deriveContent(initialLayer === 'root' && p === '/' ? '/home' : p);
    setContent(prev => prev.page === next.page && prev.showChildren === next.showChildren ? prev : next);
  }, [pathname, initialLayer]);

  const navigateTo = useCallback((href: string) => goPage(href), [goPage]);
  const goRoot = useCallback(() => goLayer('root'), [goLayer]);

  const ctx = useMemo(() => ({
    activeLayer: layer,
    activeContentPage: content.page,
    showChildren: content.showChildren,
    navigateTo,
    goToRoot: goRoot,
  }), [layer, content.page, content.showChildren, navigateTo, goRoot]);

  const translateY = layer === 'root' ? 0 : -100;

  return (
    <PageStackContext.Provider value={ctx}>
      <div ref={outerRef} className="fixed inset-0 overflow-hidden">
        <div ref={innerRef} className="will-change-transform" style={{
          transform: `translateY(${translateY}vh)`,
          transition: ready ? `transform ${DURATION}ms ${EASING}` : 'none',
        }}>
          <div className="h-screen relative">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3">
              <p className="text-4xl text-white/80 font-medium tracking-wide">{SITE.intro}</p>
              <h1 className="text-5xl font-bold text-white tracking-tight">{SITE.welcome}</h1>
            </div>
          </div>
          <div className="h-screen flex p-6 gap-6">
            <Sidebar />
            <ContentArea ref={contentAreaRef}>
              {content.showChildren ? children : pages[content.page]}
            </ContentArea>
          </div>
        </div>
      </div>
    </PageStackContext.Provider>
  );
}
