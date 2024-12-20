import Order from '../models/order.model.js'


export const getOrders = async ( req, res)=> {
    console.log("user id: ", req.user.id)
    const orders= await Order.find({ userId: req.user.id }).populate('items.productId', 'name images');


    res.json(orders);
}

export const getOrder = async ( req, res)=> {
    console.log("estamos aca")
    const order= await Order.findById(req.params.id).populate('items.productId', 'name images');
    if(!order) return res.status(404).json({message: 'Orden no encontrada.'});
    console.log("orden", order)
    res.json(order);

}
export const updateOrder = async ( req, res)=> {
    const order= await Order.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    });
    if(!order) return res.status(404).json({message: 'Orden no encontrada.'});
    res.json(order);
}
export const deleteOrder = async ( req, res)=> {

    const order= await Order.findByIdAndDelete(req.params.id);
    if(!order) return res.status(404).json({message: 'Orden no encontrada.'});
    res.json(order);
} 