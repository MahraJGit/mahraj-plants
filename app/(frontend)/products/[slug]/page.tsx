import { notFound } from "next/navigation";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import ProductDetails from "@/app/components/sections/product/ProductDetails";
import ProductHero from "@/app/components/sections/product/ProductHero";
import RelatedProducts from "@/app/components/sections/product/RelatedProducts";
import { getCategoryById } from "@/app/lib/categories";
import {
    getAllProductSlugs,
    getProductBySlug,
    getRelatedProducts,
} from "@/app/lib/products";
import { localizeProduct } from "@/app/lib/i18n/catalog";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    if (!product) {
        return { title: dictionary.productPage.notFoundTitle };
    }

    const localized = localizeProduct(product, locale);

    return {
        title: dictionary.productPage.metaTitle.replace(
            "{product}",
            localized.title,
        ),
        description: localized.description,
    };
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
    const categoryCopy =
        dictionary.categoriesPage.bySlug[
            category.slug as keyof typeof dictionary.categoriesPage.bySlug
        ];

    return (
        <>
            <ProductHero />
            <ProductDetails product={product} category={category} />
            <RelatedProducts
                products={related}
                categoryLabel={categoryCopy?.label ?? category.label}
            />
            <SiteCTA />
        </>
    );
}
