"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCatalogStore } from "@/components/CatalogStore";
import { adminAuth } from "@/lib/admin-config";

export default function AdminLoginPage() {
  const { isAuthed, ready, login } = useCatalogStore();
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && isAuthed) router.replace("/admin");
  }, [ready, isAuthed, router]);

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <form
        className="w-full max-w-sm border border-[var(--line)] bg-[var(--paper)] p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (login(user, pass)) {
            router.replace("/admin");
          } else {
            setError("Неверный логин или пароль");
          }
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--mute)]">
          Служебный вход
        </p>
        <h1 className="display mt-2 text-3xl font-bold">Менеджер</h1>
        <p className="mt-2 text-xs text-[var(--mute)]">
          Демо: <code className="text-[var(--ink)]">{adminAuth.login}</code> /{" "}
          <code className="text-[var(--ink)]">{adminAuth.password}</code>
        </p>
        <div className="mt-6 grid gap-3">
          <input
            autoComplete="username"
            placeholder="Логин"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border border-[var(--line)] bg-white px-4 py-3"
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Пароль"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="border border-[var(--line)] bg-white px-4 py-3"
          />
        </div>
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        <button type="submit" className="btn btn-solid mt-5 w-full">
          Войти
        </button>
        <Link href="/" className="mt-4 block text-center text-sm text-[var(--mute)] hover:text-[var(--ink)]">
          На сайт
        </Link>
      </form>
    </div>
  );
}
