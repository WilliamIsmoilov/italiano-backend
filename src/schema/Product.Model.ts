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

    productViews: {
        type: Number,
        default: 0,
    },

},
   { timestamps: true}    //updated_at, created_at
);

export default mongoose.model('Product', productSchema)