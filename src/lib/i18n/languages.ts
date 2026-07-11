export const languages = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

export function isLanguageCode(value: string): value is LanguageCode {
  return languages.some((l) => l.code === value);
}

export function getLanguageDir(code: LanguageCode): "ltr" | "rtl" {
  return languages.find((l) => l.code === code)?.dir ?? "ltr";
}
