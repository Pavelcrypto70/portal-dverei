"use client";

import { useEffect, useId, useState } from "react";

type Props = {
  minBound: number;
  maxBound: number;
  /** URL format: `min-max`, `min+`, or empty */
  value: string | undefined;
  onChange: (next: string | undefined) => void;
};

function parseRange(value: string | undefined, minBound: number, maxBound: number) {
  if (!value || value === "all") return { from: minBound, to: maxBound };
  if (value.endsWith("+")) {
    const n = Number(value.slice(0, -1));
    return { from: Number.isFinite(n) ? n : minBound, to: maxBound };
  }
  const [a, b] = value.split("-").map(Number);
  return {
    from: Number.isFinite(a) ? a : minBound,
    to: Number.isFinite(b) ? b : maxBound,
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function toUrl(from: number, to: number, minBound: number, maxBound: number) {
  if (from <= minBound && to >= maxBound) return undefined;
  return `${from}-${to}`;
}

export function PriceRangeFilter({ minBound, maxBound, value, onChange }: Props) {
  const id = useId();
  const safeMin = Math.min(minBound, maxBound);
  const safeMax = Math.max(minBound, maxBound);
  const parsed = parseRange(value, safeMin, safeMax);

  const [from, setFrom] = useState(parsed.from);
  const [to, setTo] = useState(parsed.to);
  const [fromText, setFromText] = useState(String(parsed.from));
  const [toText, setToText] = useState(String(parsed.to));

  useEffect(() => {
    const next = parseRange(value, safeMin, safeMax);
    setFrom(next.from);
    setTo(next.to);
    setFromText(String(next.from));
    setToText(String(next.to));
  }, [value, safeMin, safeMax]);

  const commit = (nextFrom: number, nextTo: number) => {
    let a = clamp(Math.round(nextFrom), safeMin, safeMax);
    let b = clamp(Math.round(nextTo), safeMin, safeMax);
    if (a > b) [a, b] = [b, a];
    setFrom(a);
    setTo(b);
    setFromText(String(a));
    setToText(String(b));
    onChange(toUrl(a, b, safeMin, safeMax));
  };

  const span = Math.max(safeMax - safeMin, 1);
  const leftPct = ((from - safeMin) / span) * 100;
  const rightPct = ((to - safeMin) / span) * 100;

  return (
    <div className="mt-2 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <label className="grid gap-1 text-[11px] text-[var(--mute)]" htmlFor={`${id}-from`}>
          От
          <input
            id={`${id}-from`}
            type="number"
            inputMode="numeric"
            min={safeMin}
            max={safeMax}
            className="w-full border border-[var(--line)] bg-[var(--paper)] px-2 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
            onBlur={() => {
              const n = Number(fromText.replace(/\s/g, ""));
              commit(Number.isFinite(n) ? n : from, to);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
        </label>
        <label className="grid gap-1 text-[11px] text-[var(--mute)]" htmlFor={`${id}-to`}>
          До
          <input
            id={`${id}-to`}
            type="number"
            inputMode="numeric"
            min={safeMin}
            max={safeMax}
            className="w-full border border-[var(--line)] bg-[var(--paper)] px-2 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
            value={toText}
            onChange={(e) => setToText(e.target.value)}
            onBlur={() => {
              const n = Number(toText.replace(/\s/g, ""));
              commit(from, Number.isFinite(n) ? n : to);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
        </label>
      </div>

      <div
        className="price-range relative h-8"
        onPointerUp={() => commit(from, to)}
        onTouchEnd={() => commit(from, to)}
      >
        <div className="price-range-rail" />
        <div
          className="price-range-fill"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        <input
          aria-label="Цена от"
          type="range"
          min={safeMin}
          max={safeMax}
          step={100}
          value={from}
          onChange={(e) => {
            const n = Number(e.target.value);
            const next = Math.min(n, to);
            setFrom(next);
            setFromText(String(next));
          }}
          className="price-range-thumb"
          style={{ zIndex: from > safeMin + span * 0.5 ? 4 : 2 }}
        />
        <input
          aria-label="Цена до"
          type="range"
          min={safeMin}
          max={safeMax}
          step={100}
          value={to}
          onChange={(e) => {
            const n = Number(e.target.value);
            const next = Math.max(n, from);
            setTo(next);
            setToText(String(next));
          }}
          className="price-range-thumb"
          style={{ zIndex: to < safeMin + span * 0.5 ? 4 : 3 }}
        />
      </div>

      <p className="text-[11px] text-[var(--mute)]">
        {from.toLocaleString("ru-RU")} – {to.toLocaleString("ru-RU")} ₽
      </p>
    </div>
  );
}
