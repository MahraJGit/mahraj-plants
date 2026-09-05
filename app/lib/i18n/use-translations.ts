"use client";

import { useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import type { Dictionary } from "./get-dictionary";

type MessageValue = string | string[] | { [key: string]: MessageValue };

function getByPath(source: MessageValue, path: string): MessageValue | undefined {
    return path.split(".").reduce<MessageValue | undefined>((current, key) => {
        if (current == null || typeof current === "string" || Array.isArray(current)) {
            return undefined;
        }
        return current[key];
    }, source);
}

export function useTranslations(namespace?: string) {
    const { locale, messages, setLocale } = useLocale();

    const resolve = useCallback(
        (key: string): MessageValue | undefined => {
            const path = namespace ? `${namespace}.${key}` : key;
            return getByPath(messages as unknown as MessageValue, path);
        },
        [messages, namespace],
    );

    const t = useCallback(
        (key: string, values?: Record<string, string | number>): string => {
            const raw = resolve(key);
            let text = typeof raw === "string" ? raw : key;

            if (values) {
                for (const [name, value] of Object.entries(values)) {
                    text = text.replaceAll(`{${name}}`, String(value));
                }
            }

            return text;
        },
        [resolve],
    );

    const tArray = useCallback(
        (key: string): string[] => {
            const raw = resolve(key);
            return Array.isArray(raw)
                ? raw.filter((item): item is string => typeof item === "string")
                : [];
        },
        [resolve],
    );

    const tObject = useCallback(
        <T,>(key: string): T | undefined => {
            const raw = resolve(key);
            if (raw == null || typeof raw === "string") {
                return undefined;
            }
            return raw as T;
        },
        [resolve],
    );

    return {
        t,
        tArray,
        tObject,
        locale,
        setLocale,
        messages: messages as Dictionary,
    };
}
