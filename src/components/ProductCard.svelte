<script lang="ts">
  import { onMount } from "svelte";
  import { cart, totalAmount } from "$lib/stores";
	import { formatPrice } from "$lib/utils";
  import type { Price, Product } from "$lib/types";

  export let product : Product;
  let price : Price;

  function addToCart() {
    cart.update(c => (
      [product.default_price].concat(c)
    ));
    totalAmount.update(a => a + price.unit_amount);
  }

  onMount(() => {
    // get Price
    fetch('/api/stripe/get-price', {
      method: 'POST',
      body: JSON.stringify({ price_id: product.default_price }),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => { price = data.price })
  })

</script>

<div class="flex flex-col w-full h-full p-8 border rounded-xl text-white text-center">
  <p class="text-3xl font-bold">{product.name}</p>
  {#if price}
    <p>${formatPrice(price.unit_amount)}</p>
  {/if}
  <button on:click={addToCart} class="bg-white text-black px-4 py-2 rounded-md mt-2">
		Add To Cart
	</button>
</div>
