<script lang="ts">
  import { onMount } from "svelte";
  import type { Price, Product, LineItem } from "$lib/types";

  export let line_item : LineItem;
  let price : Price;
  let product : Product;

  onMount(() => {
    // get Price
    fetch('/api/stripe/get-price', {
      method: 'POST',
      body: JSON.stringify({ price_id: line_item.price_id }),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => { 
      price = data.price 
    });
  })

  $: { 
    if (price) {
      fetch('/api/stripe/get-product', {
        method: 'POST',
        body: JSON.stringify({ product_id: price.product }),
        headers: { 'content-type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => { product = data.product });
    }
  }
</script>

<div class="flex flex-row border w-full h-fit justify-between align-middle px-8 py-4">
  {#if product}
    <p class="font-bold text-xl">{product.name}</p>
  {/if}
  {#if price}
    <div>
      <p class="font-bold text-xl">{price.unit_amount * line_item.quantity}</p>
      <p class="text-lg">@ {line_item.quantity} units</p>
    </div>
  {/if}
</div>
