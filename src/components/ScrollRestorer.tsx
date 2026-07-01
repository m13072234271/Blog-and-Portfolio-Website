"use client";

import { useEffect } from "react";
import { restoreScrollPos } from "@/lib/scroll";

export default function ScrollRestorer() {
  useEffect(() => { restoreScrollPos(); }, []);
  return null;
}
