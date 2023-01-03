<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { formatPrice } from "$lib/utils";
  import { cart, totalAmount } from "$lib/stores";
  import type { LineItem } from "$lib/types";
  import LineItemRow from "../../components/LineItemRow.svelte";

  let line_items : LineItem[] = [];

  onMount(() => {
    for (const price_id of $cart) {
      const priceExists = (line_item : LineItem) => line_item.price_id == price_id;
      let line_item = line_items.find(priceExists);
      if (line_item) { line_item.quantity += 1; }
      else {
        line_item = { price_id: price_id, quantity: 1 };
        line_items = [...line_items, line_item];
      }
    }
  });

  function gotoCheckout() {
    if (line_items.length > 0) { goto("/checkout"); }
    else { alert("Please add items to cart before checking out"); }
  }
  function resetCart() { cart.set([]); line_items = []; totalAmount.set(0); }
</script>

<div class="flex flex-col divide-x-2 md:flex-row">
	<div class="flex flex-col divide-y-2 md:basis-2/3">
		{#if line_items.length > 0}
			{#each line_items as line_item}
				<LineItemRow line_item={line_item} />
			{/each}
		{:else}
			<p class="text-xl text-white text-center">There are no items in your cart</p>
		{/if}
	</div>
	<div class="flex flex-col gap-8 p-8 md:basis-1/3">
    <p class="text-lg text-white">
      Total:
      {#if line_items.length > 0}
        ${formatPrice($totalAmount)}
      {:else}
        N/A
      {/if}
    </p>
		<button on:click={resetCart} class="w-fit rounded-md bg-black text-white px-4 py-2">
			Remove All
		</button>
    <button on:click={gotoCheckout} class="w-full rounded-md bg-black text-white px-4 py-2">
      Checkout
    </button>
	</div>
</div>
