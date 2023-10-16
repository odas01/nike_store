import { Variant, ListWithParams, Image } from '.';

interface Category {
   name: string;
   store: string;
}

interface Prices {
   originalPrice: number;
   price: number;
}

interface Size {
   size: string;
   stock: number;
}

interface Prices {
   originalPrice: number;
   price: number;
}

//  RESPONSE
export interface IProduct extends Variant {
   _id: string;
   name: string;
   genders: string[];
   category: Category;
   slug: string;
   discount: number;
   prices: Prices;
   desc: string;
   variants: Variant[];
   view: number;
   sold: number;
   status: 'show' | 'hide' | 'deleted';
   createdAt: Date;
}

export interface AllProducts extends ListWithParams {
   products: IProduct[];
}

export type ProductFormValue = {
   name: string;
   store: string;
   genders: string[];
   category: string;
   discount: number;
   desc: string;
   prices: Prices;
   color: string;
   sizes: Size[];
   images: Image[];
   thumbnail: Image;
};

export type ProductEdit = Omit<
   ProductFormValue,
   'color' | 'sizes' | 'images' | 'thumbnail'
>;
