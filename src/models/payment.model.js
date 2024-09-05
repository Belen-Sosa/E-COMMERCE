import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['credito', 'debito', 'efectivo'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pendiente', 'pagado', 'rechazado'],
    default: 'pending',
  }
}, {
  timestamps: true
});

export default mongoose.model('Payment', paymentSchema);
