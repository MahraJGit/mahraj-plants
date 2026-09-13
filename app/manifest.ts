import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/app/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME,
        short_name: "Mahraj",
        description: SITE_TAGLINE,
        start_url: "/",
        display: "standalone",
        background_color: "#EAF0DA",
        theme_color: "#0A250E",
        lang: "en",
        icons: [
            {
                src: "/favicon.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
