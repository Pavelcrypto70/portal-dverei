"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as seedProducts, promos as seedPromos, type Product } from "@/content/site";
import {
  AUTH_KEY,
  PRODUCTS_KEY,
  PROMOS_KEY,
  adminAuth,
  type Promo,
} from "@/lib/admin-config";

type StoreCtx = {
  ready: boolean;
  isAuthed: boolean;
  products: Product[];
  promos: Promo[];
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertPromo: (promo: Promo) => void;
  deletePromo: (id: string) => void;
  resetCatalog: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function CatalogStoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [isAuthed, setAuthed] = useState(false);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [promos, setPromos] = useState<Promo[]>(seedPromos as Promo[]);

  useEffect(() => {
    setProducts(readJson(PRODUCTS_KEY, seedProducts));
    setPromos(readJson(PROMOS_KEY, seedPromos as Promo[]));
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
    setReady(true);
  }, []);

  const login = useCallback((user: string, pass: string) => {
    const ok = user.trim() === adminAuth.login && pass === adminAuth.password;
    if (ok) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }, []);

  const upsertProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const i = prev.findIndex((p) => p.id === product.id);
      const next =
        i >= 0 ? prev.map((p, idx) => (idx === i ? product : p)) : [...prev, product];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const upsertPromo = useCallback((promo: Promo) => {
    setPromos((prev) => {
      const i = prev.findIndex((p) => p.id === promo.id);
      const next = i >= 0 ? prev.map((p, idx) => (idx === i ? promo : p)) : [...prev, promo];
      localStorage.setItem(PROMOS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const deletePromo = useCallback((id: string) => {
    setPromos((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(PROMOS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetCatalog = useCallback(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seedProducts));
    localStorage.setItem(PROMOS_KEY, JSON.stringify(seedPromos));
    setProducts(seedProducts);
    setPromos(seedPromos as Promo[]);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      isAuthed,
      products,
      promos,
      login,
      logout,
      upsertProduct,
      deleteProduct,
      upsertPromo,
      deletePromo,
      resetCatalog,
    }),
    [
      ready,
      isAuthed,
      products,
      promos,
      login,
      logout,
      upsertProduct,
      deleteProduct,
      upsertPromo,
      deletePromo,
      resetCatalog,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCatalogStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCatalogStore outside provider");
  return v;
}

export function useLiveProducts() {
  const { ready, products } = useCatalogStore();
  return { ready, products: ready ? products : seedProducts };
}

export function useLivePromos() {
  const { ready, promos } = useCatalogStore();
  return { ready, promos: ready ? promos : (seedPromos as Promo[]) };
}
