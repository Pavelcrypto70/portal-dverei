"use client";

import { useState } from "react";
import { measurePage, salons } from "@/content/site";

export function MeasureForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-[var(--line)] bg-[var(--bg)] p-6">
        <p className="kicker">Принято</p>
        <h3 className="display mt-2 text-3xl font-bold">Ждите звонка</h3>
        <p className="mt-2 text-[var(--mute)]">{measurePage.sla}</p>
      </div>
    );
  }

  return (
    <form
      className={`border border-[var(--line)] bg-[var(--bg)] ${compact ? "p-5" : "p-6 md:p-8"}`}
      onSubmit={(e) => {
        e.preventDefault();
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
        <input required name="name" placeholder="Ваше имя" className="border border-[var(--line)] bg-white px-4 py-3 outline-none ring-[var(--accent)] focus:ring-2" />
        <input required name="phone" placeholder="Телефон" className="border border-[var(--line)] bg-white px-4 py-3 outline-none ring-[var(--accent)] focus:ring-2" />
        <select name="salon" className="border border-[var(--line)] bg-white px-4 py-3 md:col-span-2" defaultValue="">
          <option value="" disabled>
            Удобный салон / район
          </option>
          {salons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input name="address" placeholder="Адрес объекта" className="border border-[var(--line)] bg-white px-4 py-3 md:col-span-2" />
        <select name="type" className="border border-[var(--line)] bg-white px-4 py-3" defaultValue="both">
          <option value="interior">Межкомнатные</option>
          <option value="entrance">Входные</option>
          <option value="both">И то и другое</option>
        </select>
        <input name="slot" placeholder="Желаемые дата и время" className="border border-[var(--line)] bg-white px-4 py-3" />
        <textarea
          name="comment"
          placeholder="Комментарий"
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
