import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    zip: String,
  },
  status: {
    type: String,
    enumeración: ['procesando', 'enviado', 'entregado', 'cancelado'],
    default: 'procesando'
  }
 
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
