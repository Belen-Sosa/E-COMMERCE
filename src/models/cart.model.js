import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
    
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,  
          required: true
        },
        subtotal: {
          type: Number, 
          required: true,
        
        }, image:{
          type: String ,
          required: false,
          default: ""
        },
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  });
  
  export default mongoose.model('Cart', cartSchema);
  