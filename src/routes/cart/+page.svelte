<script lang="ts">
  import { onMount } from "svelte";
  import { cart } from "$lib/stores";
  import type { Product } from "$lib/types";

  let products : Product[] = [];
  
  const getProducts = async () => {
    const response = await fetch('/api/stripe/cart', {
      method: 'POST',
      body: JSON.stringify({ cart: $cart }),
      headers: { 'content-type': 'application/json' }
    });

    const data = await response.json();
    products = data.products;
  };

  onMount(async () => {
    getProducts();
  });

  const reset = () => { cart.set([]); getProducts(); }
</script>


<button class="bg-black text-white px-4 py-2 w-fit rounded-md" on:click={reset}>Reset</button>
{#each products as p}
  <p>{p.name}</p>
{/each}
