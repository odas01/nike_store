import { Schema, model } from 'mongoose';

import { ICartItem } from '../types/product.type';

const schema = new Schema<ICartItem>(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      product: {
         type: Schema.Types.ObjectId,
         ref: 'Product',
         required: true,
      },
      variant: {
         type: Schema.Types.ObjectId,
         ref: 'Variant',
         required: true,
      },
      size: {
         type: String,
         required: true,
      },
      qty: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
);

schema.pre('find', async function (next) {
   // this.populate({
   //    path: 'product',
   //    select: '-_id name',
   //    options: { lean: true },
   // }).lean();

   next();
});

export default model<ICartItem>('CartItem', schema);
