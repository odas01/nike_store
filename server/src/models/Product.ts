import { Schema, model } from 'mongoose';
import slugify from 'slugify';

import { IProduct } from '../types/product.type';

const productSchema = new Schema<IProduct>(
   {
      category: {
         type: Schema.Types.ObjectId,
         ref: 'Category',
      },
      name: {
         type: String,
         trim: true,
         unique: true,
         required: true,
      },
      slug: {
         type: String,
      },
      prices: {
         originalPrice: {
            type: Number,
            required: true,
         },
         price: {
            type: Number,
            required: true,
         },
      },
      discount: {
         type: Number,
         default: 0,
      },
      genders: [
         {
            type: String,
            required: true,
            enum: ['men', 'women', 'boy', 'girl'],
         },
      ],
      desc: {
         type: String,
         default: 'No description',
      },
      variants: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Variant',
         },
      ],
      view: {
         type: Number,
         default: 0,
      },
      sold: {
         type: Number,
         default: 0,
      },
      status: {
         type: String,
         enum: ['show', 'hide', 'deleted'],
         default: 'show',
      },
   },
   {
      timestamps: true,
      toJSON: {
         transform: (_, obj) => {
            delete obj.__v;
         },
      },
   }
);

// const formatData = (name:string, originalPrice:number, price:number) => {
//    return {
//       name:
//    }
// }

productSchema.pre('save', function (next) {
   // const randomChar = Math.random().toString(36).substring(4, 7);
   this.slug = slugify(this.name, {
      lower: true,
   });
   next();
});

export default model<IProduct>('Product', productSchema);
