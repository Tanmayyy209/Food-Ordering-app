import {Order} from "@/models/Order";

 const STRIPE_SK = "sk_test_51P2mkUSFJp91ynxb4CKK8ChrqtjGExfluB9aT847ofYO2iSVXbPxpTHyn34raZPQWhdDvJTAWFE1TFk6pigG3XmW009GhHpfUy"
 const STRIPE_SIGN_SECRET = "whsec_5fb61ba89162278dd2dff8e274a689695c582d747410a3a11a5c05ecce9b8fd9"

const stripe = require('stripe')(STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId}, {paid:true});
    }
  }

  return Response.json('ok', {status: 200});
}