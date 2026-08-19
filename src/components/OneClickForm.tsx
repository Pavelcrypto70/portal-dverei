"use client";

import { useEffect, useRef, useState } from "react";
import { BackLink } from "@/components/BackLink";
import { clearFormDraft, readFormDraft, saveFormDraft } from "@/lib/session-state";

export function OneClickForm({
  productName,
  formId = "one-click",
  autoFocus = false,
}: {
  productName: string;
  formId?: string;
  autoFocus?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const ready = useRef(false);

  useEffect(() => {
    setDraft(readFormDraft(formId));
    ready.current = true;
  }, [formId]);

  useEffect(() => {
    if (!ready.current || sent) return;
    saveFormDraft(formId, draft);
  }, [draft, formId, sent]);

  if (sent) {
    return (
      <div className="border border-[var(--line)] bg-[var(--bg)] p-5">
        <p className="font-semibold">Заявка отправлена</p>
        <p className="mt-1 text-sm text-[var(--mute)]">Уточним комплектацию по «{productName}».</p>
        <BackLink className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <form
      className="border border-[var(--line)] bg-[var(--bg)] p-5"
      onSubmit={(e) => {
        e.preventDefault();
        clearFormDraft(formId);
        setSent(true);
      }}
    >
      <p className="text-sm font-bold">Купить в 1 клик</p>
      <p className="mt-1 text-xs text-[var(--mute)]">{productName}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <input
          required
          name="name"
          placeholder="Имя"
          autoFocus={autoFocus}
          value={draft.name ?? ""}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          className="border border-[var(--line)] bg-white px-4 py-3"
        />
        <input
          required
          name="phone"
          placeholder="Телефон"
          value={draft.phone ?? ""}
          onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
          className="border border-[var(--line)] bg-white px-4 py-3"
        />
      </div>
      <button type="submit" className="btn btn-solid mt-3">
        Отправить
      </button>
    </form>
  );
}
