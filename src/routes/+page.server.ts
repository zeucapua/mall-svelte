import { stripe } from '$lib/stripe';
import { Product } from '../lib/types.ts';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return await stripe.products.list() as Product[];
}) satisfies PageServerLoad;
