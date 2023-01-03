import { json } from "@sveltejs/kit";
import { stripe } from "$lib/stripe";
import type { RequestHandler } from "./$types";

export const POST = (async ({request}) => {
  const { amount, currency } = await request.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    automatic_payment_methods: { enabled: true },
  });

  return json({ clientSecret: paymentIntent.client_secret });

}) satisfies RequestHandler;
