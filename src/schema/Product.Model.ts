import mongoose, { Schema } from "mongoose";
import { ProductVolume } from "../libs/enums/product.enum";
import { ProductSize } from "../libs/enums/product.enum";
import { ProductCollection } from "../libs/enums/product.enum";
import { ProductStatus } from "../libs/enums/product.enum";

const productSchema = new Schema ({
    productName: {
      type: String,
      required: true
    },

     productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.PAUSE,
    },

    productCollection: {
    type: String,
    enum: ProductCollection,
    required: true,
},
    productSize: {
        type: String,
        enum: ProductSize,
        default: ProductSize.NORMAL,
},
    productVolume: {
    type: Number,
    enum: ProductVolume,
    default: ProductVolume.ONE,
   },

   productPrice: {
    type: Number,
    required: true,
   },

   productLeftCount: {
    type: Number,
    required: true,
   },

    productDesc: {
     type: String,
     required: true,
    },

    productImages: {
        type: [String],
        default: [],
    },

},
   { timestamps: true}    //updated_at, created_at
);

export default mongoose.model('Product', productSchema)