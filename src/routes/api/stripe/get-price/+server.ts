import { json } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import type { Price } from '$lib/types';
import type { RequestHandler } from './$types';

export const POST = (async ({request}) => {
  const { price_id } = await request.json();
  const response = await stripe.prices.retrieve(price_id);
  const data = await response as Price;
  return json({ price: data });
}) satisfies RequestHandler;
