 import mongoose from 'mongoose';

 const userSchema = new mongoose.Schema({
   username: {
     type: String,
     required: true,
     trim: true
   },
   email: {
     type: String,
     required: true,
     trim: true,
     unique: true
   },
   password: {
     type: String,
     required: true
   },
   role: {
     type: String,
     enum: ['customer', 'admin'],
     default: 'customer'
   },
   addresses: [
     {
       street: String,
       city: String,
       state: String,
       zip: String,
       country: String
     }
   ],
   orderHistory: [
     {
       orderId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Order'
       },
       status: String,
       totalAmount: Number,
       orderDate: Date
     }
   ]
 }, {
        //esto hace que se guarde en la base la fecha en la que se creo el registro y la ultima fecha en la que se modifico el registro 
   timestamps: true
 });
 
 export default mongoose.model('User', userSchema);
 