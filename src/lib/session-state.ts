const CATALOG_KEY = "portal:catalog-return";
const FORM_PREFIX = "portal:form:";

export function saveCatalogReturn(url: string) {
  try {
    sessionStorage.setItem(CATALOG_KEY, url);
  } catch {
    /* ignore */
  }
}

export function readCatalogReturn(fallback = "/catalog/interior"): string {
  try {
    return sessionStorage.getItem(CATALOG_KEY) || fallback;
  } catch {
    return fallback;
  }
}

export function saveFormDraft(formId: string, data: Record<string, string>) {
  try {
    sessionStorage.setItem(FORM_PREFIX + formId, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function readFormDraft(formId: string): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(FORM_PREFIX + formId);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function clearFormDraft(formId: string) {
  try {
    sessionStorage.removeItem(FORM_PREFIX + formId);
  } catch {
    /* ignore */
  }
}
