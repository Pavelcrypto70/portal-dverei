export type Promo = {
  id: string;
  title: string;
  text: string;
  badge: string;
};

export const adminAuth = {
  /** Демо-логин менеджера. На github.io это не шифрование — только «замок от случайных». */
  login: "manager",
  password: "portal2026",
};

export const AUTH_KEY = "portal:admin-auth";
export const PRODUCTS_KEY = "portal:products-v1";
export const PROMOS_KEY = "portal:promos-v1";
