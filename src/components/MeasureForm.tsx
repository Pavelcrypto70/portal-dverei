"use client";

import { useEffect, useRef, useState } from "react";
import { measurePage, salons } from "@/content/site";
import { BackLink } from "@/components/BackLink";
import { clearFormDraft, readFormDraft, saveFormDraft } from "@/lib/session-state";

const FORM_ID = "measure";

export function MeasureForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const ready = useRef(false);

  useEffect(() => {
    setDraft(readFormDraft(FORM_ID));
    ready.current = true;
  }, []);

  useEffect(() => {
    if (!ready.current || sent) return;
    saveFormDraft(FORM_ID, draft);
  }, [draft, sent]);

  const setField = (name: string, value: string) => {
    setDraft((d) => ({ ...d, [name]: value }));
  };

  if (sent) {
    return (
      <div className="border border-[var(--line)] bg-[var(--bg)] p-6">
        <p className="kicker">Принято</p>
        <h3 className="display mt-2 text-3xl font-bold">Ждите звонка</h3>
        <p className="mt-2 text-[var(--mute)]">{measurePage.sla}</p>
        <BackLink className="mt-5 inline-block text-sm font-semibold text-[var(--accent)]" label="← Вернуться в каталог" />
      </div>
    );
  }

  return (
    <form
      className={`border border-[var(--line)] bg-[var(--bg)] ${compact ? "p-5" : "p-6 md:p-8"}`}
      onSubmit={(e) => {
        e.preventDefault();
        clearFormDraft(FORM_ID);
        setSent(true);
      }}
    >
      {!compact ? (
        <>
          <p className="kicker">Замер</p>
          <h3 className="display mt-2 text-3xl font-bold">{measurePage.title}</h3>
          <p className="mt-2 text-sm text-[var(--mute)]">{measurePage.lead}</p>
        </>
      ) : null}
      <div className={`grid gap-3 ${compact ? "" : "mt-6 md:grid-cols-2"}`}>
        <input
          required
          name="name"
          placeholder="Ваше имя"
          value={draft.name ?? ""}
          onChange={(e) => setField("name", e.target.value)}
          className="border border-[var(--line)] bg-white px-4 py-3 outline-none ring-[var(--accent)] focus:ring-2"
        />
        <input
          required
          name="phone"
          placeholder="Телефон"
          value={draft.phone ?? ""}
          onChange={(e) => setField("phone", e.target.value)}
          className="border border-[var(--line)] bg-white px-4 py-3 outline-none ring-[var(--accent)] focus:ring-2"
        />
        <select
          name="salon"
          className="border border-[var(--line)] bg-white px-4 py-3 md:col-span-2"
          value={draft.salon ?? ""}
          onChange={(e) => setField("salon", e.target.value)}
        >
          <option value="" disabled>
            Удобный салон / район
          </option>
          {salons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          name="address"
          placeholder="Адрес объекта"
          value={draft.address ?? ""}
          onChange={(e) => setField("address", e.target.value)}
          className="border border-[var(--line)] bg-white px-4 py-3 md:col-span-2"
        />
        <select
          name="type"
          className="border border-[var(--line)] bg-white px-4 py-3"
          value={draft.type ?? "both"}
          onChange={(e) => setField("type", e.target.value)}
        >
          <option value="interior">Межкомнатные</option>
          <option value="entrance">Входные</option>
          <option value="flooring">Напольные покрытия</option>
          <option value="panels">Стеновые панели</option>
          <option value="both">Несколько направлений</option>
        </select>
        <input
          name="slot"
          placeholder="Желаемые дата и время"
          value={draft.slot ?? ""}
          onChange={(e) => setField("slot", e.target.value)}
          className="border border-[var(--line)] bg-white px-4 py-3"
        />
        <textarea
          name="comment"
          placeholder="Комментарий"
          value={draft.comment ?? ""}
          onChange={(e) => setField("comment", e.target.value)}
          className="min-h-24 border border-[var(--line)] bg-white px-4 py-3 md:col-span-2"
        />
      </div>
      <button type="submit" className="btn btn-accent mt-4 w-full md:w-auto">
        Заказать бесплатный замер
      </button>
      <p className="mt-3 text-xs text-[var(--mute)]">
        Согласие на обработку персональных данных. {measurePage.fieldsNote}
      </p>
    </form>
  );
}
