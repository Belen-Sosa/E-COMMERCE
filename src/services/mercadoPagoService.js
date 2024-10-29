
import { config } from 'dotenv';
import Order from '../models/order.model.js'
import Payment from '../models/payment.model.js'

config();

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN});


export const createPreference = async ( req, res)=> {
    const {userId, items,totalAmount}= req.body;
    const preference = new Preference(client);
    const itemsWithUnitPrice = items.map(item => ({
        ...item,
        id: item.productId._id,
        title: item.productId.name,
        unit_price: item.price  // Mapeamos 'price' a 'unit_price'
    }));
    
    preference.create({
        body:{
            items: itemsWithUnitPrice,  // Enviamos los items ya con 'unit_price',
            notification_url: "https://890c-181-230-98-91.ngrok-free.app/api/webhook",
            metadata: {
                userId, // Agregamos el userId en la metadata
                items,
            }
    
    }

    })
    .then((response) => {
     
     res.json(response)
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error a la hora de crear la preferencia' });
    });


    

}
//Captura los datos de el pago

export const webHook= async (req, res) =>{
    const paymentId = req.query.id;
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${client.accessToken}`
            }
        });

        if(response.ok){

            
            const data = await response.json();
         
            try {
                const newOrder = new Order({
                    userId: data.metadata.user_id,
                    items: data.metadata.items,
                    totalAmount:data.transaction_amount,
                 
                });
                
            
                const savedOrder=  await newOrder.save();
              
                try {
               
                   const newPayment = new Payment({
                    orderId: savedOrder._id,
                    userId: savedOrder.userId,
                    amount: savedOrder.totalAmount, 
                    paymentMethod: data.payment_type_id,
                    paymentStatus:data.status
                    ,
                  })
                  const savedPayment = await newPayment.save();

               
                } catch (error) {
                    console.log(error)
                }
               
            } catch (error) {
                console.log(error)
            }
           

        }

        res.sendStatus(200);

    } catch (error) {
        console.log('Error:',error);
        res.sendStatus(500);
        
    }
}
