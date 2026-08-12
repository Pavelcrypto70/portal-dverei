"use client";

import { useState } from "react";

export function OneClickForm({
  productName,
  autoFocus = false,
}: {
  productName: string;
  autoFocus?: boolean;
}) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="border border-[var(--line)] bg-[var(--bg)] p-5">
        <p className="font-semibold">Заявка отправлена</p>
        <p className="mt-1 text-sm text-[var(--mute)]">Уточним комплектацию по «{productName}».</p>
      </div>
    );
  }
  return (
    <form
      className="border border-[var(--line)] bg-[var(--bg)] p-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <p className="text-sm font-bold">Купить в 1 клик</p>
      <p className="mt-1 text-xs text-[var(--mute)]">{productName}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <input required name="name" placeholder="Имя" autoFocus={autoFocus} className="border border-[var(--line)] bg-white px-4 py-3" />
        <input required name="phone" placeholder="Телефон" className="border border-[var(--line)] bg-white px-4 py-3" />
      </div>
      <button type="submit" className="btn btn-solid mt-3">Отправить</button>
    </form>
  );
}
