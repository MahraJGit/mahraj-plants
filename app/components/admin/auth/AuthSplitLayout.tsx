import Image from "next/image";
import Link from "next/link";

type AuthSplitLayoutProps = {
    eyebrow: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export default function AuthSplitLayout({
    eyebrow,
    title,
    subtitle,
    children,
}: AuthSplitLayoutProps) {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <section className="relative hidden overflow-hidden lg:block">
                <Image
                    src="/images/home/hero-bg-2.jpg"
                    alt=""
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-primary/70" />
                <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
                    <Link href="/" className="inline-flex w-fit">
                        <Image
                            src="/mahraj-landscaping-logo.png"
                            alt="Mahraj Landscaping"
                            width={180}
                            height={48}
                            className="h-12 w-auto"
                        />
                    </Link>
                    <div>
                        <Image
                            src="/icons/singleLeaf.svg"
                            alt=""
                            width={14}
                            height={21}
                            className="h-6 w-auto"
                        />
                        <p className="mt-5 font-script text-4xl text-secondary">
                            Grow with care
                        </p>
                        <h2 className="mt-3 max-w-md text-4xl font-bold leading-tight text-white xl:text-5xl">
                            Manage the stories behind every green space.
                        </h2>
                    </div>
                </div>
            </section>

            <section className="flex items-center bg-cream px-4 py-10 sm:px-8">
                <div className="mx-auto w-full max-w-md">
                    <Link href="/" className="mb-8 inline-flex lg:hidden">
                        <Image
                            src="/mahraj-landscaping-logo.png"
                            alt="Mahraj Landscaping"
                            width={150}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <p className="font-script text-3xl text-secondary">{eyebrow}</p>
                    <h1 className="mt-2 text-[32px] font-bold tracking-[-2%] text-primary">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-primary/60">
                        {subtitle}
                    </p>
                    <div className="mt-8">{children}</div>
                </div>
            </section>
        </div>
    );
}
