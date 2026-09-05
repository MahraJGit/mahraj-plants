"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useRouter } from "next/navigation";
import {
    LOCALE_COOKIE,
    localeDirection,
    type Locale,
} from "./config";
import type { Dictionary } from "./get-dictionary";

type LocaleContextValue = {
    locale: Locale;
    messages: Dictionary;
    setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function setLocaleCookie(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

export function LocaleProvider({
    locale,
    messages,
    children,
}: {
    locale: Locale;
    messages: Dictionary;
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = localeDirection(locale);
    }, [locale]);

    const setLocale = useCallback(
        (next: Locale) => {
            if (next === locale) return;
            setLocaleCookie(next);
            document.documentElement.lang = next;
            document.documentElement.dir = localeDirection(next);
            router.refresh();
        },
        [locale, router],
    );

    const value = useMemo(
        () => ({ locale, messages, setLocale }),
        [locale, messages, setLocale],
    );

    return (
        <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error("useLocale must be used within LocaleProvider");
    }
    return context;
}
