import { json } from "@sveltejs/kit";
import { stripe } from "$lib/stripe";
import type { Product } from "$lib/types";
import type { RequestHandler } from "./$types";

export const POST = (async ({request}) => {
  const { cart } = await request.json();
  let products : Product[] = [];
  const productIds : string[] = cart;
  for (const id of productIds) {
    if (id.length === 0) continue;
    const p = await stripe.products.retrieve(id);
    products = [...products, p];
  }
  return json({products: products});
}) satisfies RequestHandler;
