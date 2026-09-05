import type { Locale } from "./config";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

const dictionaries = {
    en,
    ar,
} as const;

export type Dictionary = typeof en;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    return dictionaries[locale] ?? dictionaries.en;
}

export function getDictionarySync(locale: Locale): Dictionary {
    return dictionaries[locale] ?? dictionaries.en;
}
