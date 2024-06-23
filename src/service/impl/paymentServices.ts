const stripe = require("stripe")(process.env.STRIPE_SECRET);
import {
  PaymentCustomerType,
  PaymentLineItem,
  PaymentSessionType,
  PaymentShippingCharge,
} from "@core/types";

const initiatePayment = async (
  customerInfo: PaymentCustomerType,
  lines: PaymentLineItem[],
  shippingOptions: PaymentShippingCharge,
) => {

  const customer = await stripe.customers.create(customerInfo);
  const session: PaymentSessionType = await stripe.checkout.sessions.create({
    line_items: lines,
    mode: "payment",
    shipping_options: [shippingOptions],
    success_url: `${process.env.STORE_FRONT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.STORE_FRONT_URL}/payment/declined?session_id={CHECKOUT_SESSION_ID}`,
    customer: customer.id,
  });
  return {
    url: session.url,
    id: session.id,
  };
};
export default {
  initiatePayment,
};
