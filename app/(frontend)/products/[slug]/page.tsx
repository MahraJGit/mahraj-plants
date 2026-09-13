import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import ProductDetails from "@/app/components/sections/product/ProductDetails";
import ProductHero from "@/app/components/sections/product/ProductHero";
import RelatedProducts from "@/app/components/sections/product/RelatedProducts";
import JsonLd from "@/app/components/seo/JsonLd";
import { getCategoryById } from "@/app/lib/categories";
import {
    getAllProductSlugs,
    getProductBySlug,
    getRelatedProducts,
} from "@/app/lib/products";
import { localizeProduct } from "@/app/lib/i18n/catalog";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    graphJsonLd,
    organizationJsonLd,
    productJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    if (!product) {
        return {
            title: dictionary.productPage.notFoundTitle,
            robots: { index: false },
        };
    }

    const localized = localizeProduct(product, locale);

    return buildPageMetadata({
        title: dictionary.productPage.metaTitle.replace(
            "{product}",
            localized.title,
        ),
        description: localized.description,
        path: `/products/${slug}`,
        locale,
        image: localized.image,
        imageAlt: localized.title,
    });
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const category = getCategoryById(product.category_id);

    if (!category) {
        notFound();
    }

    const related = getRelatedProducts(product);
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const localized = localizeProduct(product, locale);
    const categoryCopy =
        dictionary.categoriesPage.bySlug[
            category.slug as keyof typeof dictionary.categoriesPage.bySlug
        ];
    const categoryLabel = categoryCopy?.label ?? category.label;
    const title = dictionary.productPage.metaTitle.replace(
        "{product}",
        localized.title,
    );

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title,
                        description: localized.description,
                        path: `/products/${slug}`,
                    }),
                    productJsonLd(localized, categoryLabel),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        {
                            name: categoryLabel,
                            path: `/categories/${category.slug}`,
                        },
                        { name: localized.title, path: `/products/${slug}` },
                    ]),
                )}
            />
            <ProductHero />
            <ProductDetails product={product} category={category} />
            <RelatedProducts
                products={related}
                categoryLabel={categoryLabel}
            />
            <SiteCTA />
        </>
    );
}
