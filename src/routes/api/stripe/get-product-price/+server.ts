import { json } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import type { RequestHandler } from './$types';

export const POST = (async ({request}) => {
  const { product } = await request.json();
  const response = await stripe.prices.retrieve(product.default_price);
  const data = await response.json();
  return json({ price: data});
}) satisfies RequestHandler;
