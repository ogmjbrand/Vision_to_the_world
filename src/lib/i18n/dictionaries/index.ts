import type { LanguageCode } from "@/lib/i18n/languages";
import type { Dictionary } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/dictionaries/en";
import { es } from "@/lib/i18n/dictionaries/es";
import { fr } from "@/lib/i18n/dictionaries/fr";
import { pt } from "@/lib/i18n/dictionaries/pt";

export const dictionaries: Record<LanguageCode, Dictionary> = { en, es, fr, pt };
