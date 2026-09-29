import type { NextConfig } from "next";

function blogImageHost(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const imageHost = blogImageHost();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: imageHost
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: imageHost,
            pathname: "/storage/v1/object/public/blog-images/**",
          },
        ],
      }
    : undefined,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
