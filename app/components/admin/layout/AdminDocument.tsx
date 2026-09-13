"use client";

import { useEffect } from "react";

export default function AdminDocument() {
    useEffect(() => {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
        document.body.classList.remove("font-arabic");
    }, []);

    return null;
}
