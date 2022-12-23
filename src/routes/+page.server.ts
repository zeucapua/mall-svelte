import { stripe } from '$lib/stripe';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return await stripe.products.list();
}) satisfies PageServerLoad;
