import Payment from '../models/payment.model.js'

export const getPayments = async ( req, res)=> {

    const payments= await Payment.find();
    res.json(payments);
}
export const createPayment = async ( req, res)=> {
    const {orderId, userId,amount,paymentMethod,paymentStatus}= req.body;

    const newPayment = new Payment({
        orderId,
        userId,
        amount,
        paymentMethod,
        paymentStatus
    });

    const savedPayment=  await newPayment.save();
    res.json(savedPayment);

}

export const getPayment= async ( req, res)=> {

    const payment= await Payment.findById(req.params.id);
    if(!payment) return res.status(404).json({message: 'Pago no encontrado.'});
    res.json(payment);

}
export const updatePayment = async ( req, res)=> {
    const payment= await Payment.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    });
    if(!payment) return res.status(404).json({message: 'Pago no encontrado.'});
    res.json(payment);
}
export const deletePayment = async ( req, res)=> {

    const payment= await Payment.findByIdAndDelete(req.params.id);
    if(!payment) return res.status(404).json({message: 'Pago no encontrado.'});
    res.json(payment);
}