import { json } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import type { Product } from '$lib/types';
import type { RequestHandler } from './$types';

export const POST = (async ({request}) => {
  const { product_id } = await request.json();
  const response = await stripe.products.retrieve(product_id);
  const data = await response as Product;
  return json({ product: data });
}) satisfies RequestHandler;
