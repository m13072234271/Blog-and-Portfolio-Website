"use client";

import { useEffect } from "react";

const ACTIVE = "Liang Junye's blog and portfolio website";
const AWAY = "Liang Junye";

export default function DynamicTitle() {
  useEffect(() => {
    const handle = () => {
      document.title = document.hidden ? AWAY : ACTIVE;
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  return null;
}
