import Order from '../models/order.model.js'

export const getOrders = async ( req, res)=> {

    const orders= await Order.find();
    res.json(orders);
}
export const createOrder = async ( req, res)=> {
    
    const {userId, items,totalAmount}= req.body;

    const newOrder = new Order({
        userId,
        items,
        totalAmount
    });

    const savedOrder=  await newOrder.save();
    res.json(savedOrder);

}

export const getOrder = async ( req, res)=> {

    const order= await Order.findById(req.params.id);
    if(!order) return res.status(404).json({message: 'Orden no encontrada.'});
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