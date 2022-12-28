<script lang="ts">
  import { onMount } from "svelte";
  import { cart } from "$lib/stores";
  import type { Product } from "$lib/types";

  let products : Product[] = [];
  
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
</script>


<button class="bg-black text-white px-4 py-2 w-fit rounded-md" on:click={reset}>Reset</button>
{#each products as p}
  <p>{p.name}</p>
{/each}
