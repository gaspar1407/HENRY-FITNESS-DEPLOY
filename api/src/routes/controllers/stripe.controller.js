const { Payment_order, Membership, Subscription, User } = require("../../db/db.js");
const Stripe = require("stripe");
const {SECRET_STRIPE} = process.env;
const stripe = new Stripe(SECRET_STRIPE)

async function paymentStripe(userId, membershipId, membershipPrice, membershipType, dni, address, birthday, id){
   try{
    const payment = await stripe.paymentIntents.create({
        amount: (membershipPrice * 100),
        currency: "USD",
        description: membershipType,
        payment_method: id,
        confirm: true
    })

    if(payment){
        const userUpdate = await User.update({
            dni,
            address,
            birthday
        },{
            where:{
                id: userId
            }
            
        }
        )
    }


    

    if(payment){
        const payment_order = await Payment_order.create({
            value: membershipPrice,
            method: payment.payment_method_types[0],
            code_stripe: payment.id
        })

        if(payment_order){
            const suscrip = await Subscription.create({
                state: true,
                userId,
                membershipId,
                paymentOrderId: payment_order.id

            })

            return suscrip;
        }


    }
   }catch(error){
       return({message:error.message})
   }
}



module.exports = {
    paymentStripe
}
