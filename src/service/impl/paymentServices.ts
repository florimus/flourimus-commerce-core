import Stripe from "stripe";
import {
  PaymentCustomerType,
  PaymentLineItem,
  PaymentSessionType,
  PaymentShippingCharge,
} from "@core/types";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

const initiatePayment = async (
  customerInfo: PaymentCustomerType,
  lines: PaymentLineItem[],
  shippingOptions: PaymentShippingCharge,
) => {

  const customer = await stripe.customers.create(customerInfo);
  const session = await stripe.checkout.sessions.create({
    line_items: lines,
    mode: "payment",
    shipping_options: [shippingOptions],
    success_url: `${process.env.STORE_FRONT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.STORE_FRONT_URL}/payment/declined?session_id={CHECKOUT_SESSION_ID}`,
    customer: customer.id,
  }) as PaymentSessionType;
  return {
    url: session.url,
    id: session.id,
  };
};
export default {
  initiatePayment,
};
