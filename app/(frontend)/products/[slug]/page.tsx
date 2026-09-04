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

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return { title: "Product Not Found | Mahraj Plants" };
    }

    return {
        title: `${product.title} | Mahraj Plants`,
        description: product.description,
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

    return (
        <>
            <ProductHero />
            <ProductDetails product={product} category={category} />
            <RelatedProducts
                products={related}
                categoryLabel={category.label}
            />
            <SiteCTA />
        </>
    );
}
