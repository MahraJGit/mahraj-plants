export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category_id: string;
}
