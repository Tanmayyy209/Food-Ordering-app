import  mongoose from "mongoose";
import {getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import {Order} from "@/models/Order";

const STRIPE_PK ="pk_test_51P2pCTSIK1B0Rhe5USdE0lbJAK4Q8iWaV9A9RgKm0fB5bd3ZYwSlkIZ9PTDOcbrN6FIEcnnFiBsE6OoraFxOHtV500Zt7ZxubR"
const STRIPE_SK = "sk_test_51P2pCTSIK1B0Rhe5WhdB4Qwqhm6zVMautGbc9ttFesecaax34WXX9P0GKiK4Lt5Q64cfvfehpH3n49SRqErQyF6700yopsK2J5"
const NEXTAUTH_URL = "http://localhost:3000/"



const stripe = require('stripe')(STRIPE_SK);

const uri = 'mongodb+srv://food-ordering:1b2kzZ9jyOZL1BEM@cluster0.f5yf323.mongodb.net/food-ordering'

export async function POST(req){
    mongoose.connect(uri);

    const{cartProducts, address} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false,
      });

      const stripeLineItems = [];
      for (const cartProduct of cartProducts) {
    
        const productInfo = await MenuItem.findById(cartProduct._id);
    
        let productPrice = productInfo.basePrice;
        if (cartProduct.size) {
          const size = productInfo.sizes
            .find(size => size._id.toString() === cartProduct.size._id.toString());
          productPrice += size.price;
        }
        if (cartProduct.extras?.length > 0) {
          for (const cartProductExtraThing of cartProduct.extras) {
            const productExtras = productInfo.extraIngredientPrices;
            const extraThingInfo = productExtras
              .find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
            productPrice += extraThingInfo.price;
          }
        }

        const productName = cartProduct.name;

        stripeLineItems.push({
          quantity: 1,
          price_data: {
            currency: 'INR',
            product_data: {
              name: productName,
            },
            unit_amount: productPrice * 100,
          },
        });
      }
  


    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
        cancel_url: NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId:orderDoc._id.toString()},
        payment_intent_data: {
          metadata:{orderId:orderDoc._id.toString()},
        },
        shipping_options: [
          {
            shipping_rate_data: {
              display_name: 'Delivery fee',
              type: 'fixed_amount',
              fixed_amount: {amount: 500, currency: 'INR'},
            },
          }
        ],
      });
    
      return Response.json(stripeSession.url);
    }

