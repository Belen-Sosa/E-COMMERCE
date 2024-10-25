import Order from '../models/order.model.js'
import { config } from 'dotenv';
config();

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN});


export const getOrders = async ( req, res)=> {

    const orders= await Order.find();
    res.json(orders);
}
export const createOrder = async ( req, res)=> {
    const {userId, items,totalAmount}= req.body;
   /* console.log("tamo aqui")
   

    const newOrder = new Order({
        userId,
        items,
        totalAmount,
     
    });

    const savedOrder=  await newOrder.save();
    console.log(savedOrder._id)
    res.json(savedOrder);*/

    const preference = new Preference(client);
    const itemsWithUnitPrice = items.map(item => ({
        ...item,
        id: item.productId._id,
        title: item.productId.name,
        unit_price: item.price  // Mapeamos 'price' a 'unit_price'
    }));
    
    preference.create({
        body:{
            items: itemsWithUnitPrice,  // Enviamos los items ya con 'unit_price'
           
    
    
    }
    })
    .then((response) => {
        // Enviar el preferenceId al frontend
        console.log(response)
     res.json(response)
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error creating preference' });
    });


    

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