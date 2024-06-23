import Stripe from "stripe";
import {
  PaymentCustomerType,
  PaymentIntentType,
  PaymentLineItem,
  PaymentSessionType,
  PaymentShippingCharge,
} from "@core/types";
import BadRequestError from "@errors/BadrequestError";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

const initiatePayment = async (
  customerInfo: PaymentCustomerType,
  lines: PaymentLineItem[],
  shippingOptions: PaymentShippingCharge
) => {
  const customer = await stripe.customers.create(customerInfo);
  const session = (await stripe.checkout.sessions.create({
    line_items: lines,
    mode: "payment",
    shipping_options: [shippingOptions],
    success_url: `${process.env.STORE_FRONT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.STORE_FRONT_URL}/payment/declined?session_id={CHECKOUT_SESSION_ID}`,
    customer: customer.id,
  })) as PaymentSessionType;
  return {
    url: session.url,
    id: session.id,
  };
};

const fetchPaymentDetails = async (sessionId: string) => {
  const paymentInfo = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.payment_method"],
  });
  const payment_intent = paymentInfo?.payment_intent as PaymentIntentType;
  if (payment_intent?.status !== "succeeded") {
    throw new BadRequestError("Payment not completed");
  }
  return {
    id: payment_intent.id,
    amount_received: payment_intent.amount_received,
    type: payment_intent.payment_method.type,
    card: payment_intent.payment_method.card.brand,
    digit: payment_intent.payment_method.card.last4,
  } as PaymentIntentType;
};

export default {
  initiatePayment,
  fetchPaymentDetails,
};
