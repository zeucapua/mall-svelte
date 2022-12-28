<script lang="ts">
  import { cart } from "$lib/stores";
  import type { Price, Product } from '$lib/types';
  export let product : Product; 

  let price : Price;

  const addProduct = () => {
    cart.update(c => (
      [product.id].concat(
        typeof c === 'string' ? c.split(',') : c
      )
    ));
  };

  // TODO: fix "POST method not allowed" to get Price
  $: fetch('http://localhost:5173/api/stripe/get-price', {
    method: 'POST',
    body: JSON.stringify({ price_id: product.default_price }),
    headers: { 'content-type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => { price = data.price });

</script>

<div class="flex flex-col w-fit h-full border-2 rounded-xl p-8">
  <p class="text-3xl font-bold">
    {product.name}
  </p>
  {#if price}
    <p>{price.unit_amount}</p> 
  {/if}
  <button class="bg-black text-white rounded-md w-fit px-4 py-2" on:click={addProduct}> 
    Add to Cart
  </button>
</div>
