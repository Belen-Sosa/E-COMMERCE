import mongoose from 'mongoose';



const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  images:{
    type: [String] ,
    required: false,
    default: []
  },
  
}, {
  timestamps: true
});


export default mongoose.model('Product', productSchema);
