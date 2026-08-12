"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { quiz } from "@/content/site";

type QuizCtx = {
  openQuiz: () => void;
  closeQuiz: () => void;
};

const Ctx = createContext<QuizCtx | null>(null);

export function useQuiz() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useQuiz outside provider");
  return v;
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  const openQuiz = useCallback(() => {
    setOpen(true);
    setStep(0);
    setDone(false);
  }, []);
  const closeQuiz = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const key = "portal-quiz-seen-v2";
    if (localStorage.getItem(key)) return;
    const t = setTimeout(() => {
      setOpen(true);
      localStorage.setItem(key, String(Date.now()));
    }, 18000);
    return () => clearTimeout(t);
  }, []);

  const value = useMemo(() => ({ openQuiz, closeQuiz }), [openQuiz, closeQuiz]);
  const current = quiz.steps[step];
  const progress = done ? 100 : Math.round((step / quiz.steps.length) * 100);

  return (
    <Ctx.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 p-3 sm:items-center">
          <div role="dialog" aria-modal className="relative w-full max-w-lg overflow-hidden bg-[var(--paper)]">
            <div className="h-1 bg-black/5">
              <div className="h-full bg-[var(--accent)] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <button
              type="button"
              className="absolute right-3 top-3 text-sm font-semibold text-[var(--mute)]"
              onClick={closeQuiz}
            >
              Закрыть
            </button>
            <div className="p-6 pt-10 md:p-8">
              {!done ? (
                <>
                  <p className="kicker">Подбор</p>
                  <h3 className="display mt-2 text-3xl font-bold">{quiz.title}</h3>
                  <p className="mt-2 text-sm text-[var(--mute)]">{quiz.subtitle}</p>
                  <p className="mt-8 text-xl font-semibold">{current.question}</p>
                  <div className="mt-4 grid gap-2">
                    {current.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="border border-[var(--line)] px-4 py-3 text-left text-sm hover:border-[var(--accent)] hover:bg-[rgba(15,118,110,0.06)]"
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [current.id]: opt }));
                          if (step + 1 >= quiz.steps.length) setDone(true);
                          else setStep((s) => s + 1);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="kicker">Готово</p>
                  <h3 className="display mt-2 text-3xl font-bold">{quiz.successTitle}</h3>
                  <p className="mt-2 text-sm text-[var(--mute)]">{quiz.successText}</p>
                  <form
                    className="mt-5 grid gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.info("quiz lead", { name, phone, answers });
                      closeQuiz();
                    }}
                  >
                    <input required placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} className="border border-[var(--line)] px-4 py-3" />
                    <input required placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className="border border-[var(--line)] px-4 py-3" />
                    <button type="submit" className="btn btn-accent">
                      Получить подборку
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Ctx.Provider>
  );
}
