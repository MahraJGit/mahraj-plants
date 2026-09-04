import { products } from "@/data/products";
import type { Product } from "@/data/types";

export function getProductsByCategoryId(categoryId: string): Product[] {
    return products.filter((product) => product.category_id === categoryId);
}

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((product) => product.slug === slug);
}

export function getAllProductSlugs(): string[] {
    return products.map((product) => product.slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
    return products
        .filter(
            (item) =>
                item.category_id === product.category_id &&
                item.id !== product.id,
        )
        .slice(0, limit);
}
