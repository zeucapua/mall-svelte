<script lang="ts">
  import { onMount } from "svelte";
  import { cart } from "$lib/stores";
  import type { Product } from "$lib/types";
  
  interface LineItem {
    price_id: string, quantity: number
  }

  let products : Product[] = [];
  let line_items : LineItem[] = [];

  const getProducts = async () => {
    for (const product_id of $cart) {
      const response = await fetch('/api/stripe/get-product', {
        method: 'POST',
        body: JSON.stringify({ product_id: product_id }),
        headers: { 'content-type': 'application/json' }
      });
      const data = await response.json();
      products = [...products, data.product];
    }
  };

  onMount(async () => {
    getProducts();
  });

  const reset = () => { cart.set([]); products = []; }

  $: {
    for (const product of products) {
      const priceInLineItems = (line_item : LineItem) => line_item.price_id == product.default_price;
      let line_item = line_items.find(priceInLineItems) satisfies LineItem | undefined;
      if (line_item) { line_item.quantity++; }
      else {
        line_item = { price_id: product.default_price, quantity: 1 };
        line_items = [...line_items, line_item];
      }
    }
  }

</script>


<button class="bg-black text-white px-4 py-2 w-fit rounded-md" on:click={reset}>Reset</button>
{#each line_items as line_item}
  <div class="flex flex-row gap-4">
    <p>{line_item}</p>
  </div>
{/each}
