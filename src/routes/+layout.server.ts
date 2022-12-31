import { stripe } from '$lib/stripe';
import type { Product } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
  const response = await stripe.products.list();
  return {
    store_products: response.data as Product[]
  }
}) satisfies LayoutServerLoad;
