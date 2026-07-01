"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, Repeat, Clock, X } from "lucide-react";
import { useBackground } from "@/contexts/background";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BackgroundMenu({ open, onClose }: Props) {
  const bg = useBackground();
  const menuRef = useRef<HTMLDivElement>(null);
  const [customMin, setCustomMin] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    } else {
      setShow(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (open && bg && bg.interval > 0) {
      setCustomMin(String(Math.floor(bg.interval / 60000)));
    }
  }, [open, bg]);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const trigger = document.querySelector('[data-bg-trigger]');
        if (trigger && trigger.contains(e.target as Node)) return;
        onClose();
      }
    }
    function onWheel() {
      onClose();
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("wheel", onWheel);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("wheel", onWheel);
    };
  }, [open, onClose]);

  if (!bg || (!visible && !open)) return null;

  return (
    <div
      ref={menuRef}
      data-floating-panel
      className={`fixed z-50 left-1/2 -translate-x-1/2 rounded-2xl backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ${
        show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2 pointer-events-none"
      }`}
      style={{ top: 124, width: 480 }}
    >
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-white/85">壁纸设置</span>
          <button onClick={onClose} className="p-1.5 -mr-1 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <div>
          <div className="text-sm text-white/40 mb-3">选择壁纸</div>
          <div className="grid grid-cols-3 gap-3">
            {bg.images.map((img, i) => (
              <button
                key={img}
                onClick={() => bg.selectImage(i)}
                className={`rounded-xl bg-cover bg-center border-2 transition-all hover:scale-[1.03] ${
                  i === bg.index ? "border-white/60" : "border-transparent hover:border-white/20"
                }`}
                style={{
                  backgroundImage: `url(/backgrounds/${img})`,
                  height: 100,
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/40 inline-flex items-center gap-1.5">
              {bg.random ? <Shuffle size={14} /> : <Repeat size={14} />}
              顺序
            </span>
            <div className="flex rounded-md bg-white/5 p-0.5">
              <button
                onClick={() => !bg.random || bg.toggleRandom()}
                className={`text-sm px-4 py-1.5 rounded transition-all ${
                  !bg.random ? "bg-white/20 text-white" : "text-white/40 hover:text-white/60"
                }`}
              >
                顺序
              </button>
              <button
                onClick={() => bg.random || bg.toggleRandom()}
                className={`text-sm px-4 py-1.5 rounded transition-all ${
                  bg.random ? "bg-white/20 text-white" : "text-white/40 hover:text-white/60"
                }`}
              >
                随机
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/40 inline-flex items-center gap-1.5">
              <Clock size={14} />
              间隔
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                onBlur={() => {
                  const mins = parseInt(customMin);
                  if (!isNaN(mins) && mins > 0) {
                    bg.setBgInterval(mins * 60000);
                  } else {
                    bg.setBgInterval(1800000);
                    setCustomMin("30");
                  }
                }}
                placeholder="30"
                className="w-16 text-sm bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-white/70 text-center outline-none focus:border-white/20 placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-sm text-white/35">分钟</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={bg.prev}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/75 text-sm transition-all"
          >
            <ChevronLeft size={16} />
            上一张
          </button>
          <button
            onClick={bg.next}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/75 text-sm transition-all"
          >
            下一张
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
