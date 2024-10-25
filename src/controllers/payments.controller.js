
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

export const createPaymentMP = async ( req, res)=> {
    
   try {
    const {items}= req.body;

    const body ={
        items,
        back_urls :{
            success: "https://roadmap.sh/full-stack",
            failure: "https://roadmap.sh/full-stack",
            pending: "https://roadmap.sh/full-stack",
        },
        auto_return : "approved"
    
    };

    const preference=  new Preference(client )
    const result = await preference.create({body})
    res.json({
        id: result.id,

    })
   } catch (error) {
    console.log(error)
    res.status(500).json({
        error: "error al crear la preferencia"
    })
   }
    

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