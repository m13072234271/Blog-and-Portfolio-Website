'use client';

import { createContext, useContext } from 'react';

export type ContentPage = 'home' | 'about' | 'blogs' | 'works';

export interface PageStackContextType {
  activeLayer: 'root' | 'content';
  activeContentPage: ContentPage;
  showChildren: boolean;
  navigateTo: (href: string) => void;
  goToRoot: () => void;
}

export const PageStackContext = createContext<PageStackContextType | null>(null);

export function usePageStack() {
  return useContext(PageStackContext);
}

export const PATH_TO_PAGE: Record<string, ContentPage> = {
  '/home': 'home',
  '/about': 'about',
  '/blogs': 'blogs',
  '/works': 'works',
};
