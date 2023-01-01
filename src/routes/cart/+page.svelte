<script lang="ts">
  import { onMount } from "svelte";
  import { cart } from "$lib/stores";
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

  function resetCart() { cart.set([]); line_items = []; }
</script>

<div class="flex flex-col divide-x-2 md:flex-row">
	<div class="flex flex-col divide-y-2 md:basis-2/3">
		{#if line_items.length > 0}
			{#each line_items as line_item}
				<LineItemRow line_item={line_item} />
			{/each}
		{:else}
			<p class="text-xl text-white text-center items-center">There are no items in your cart</p>
		{/if}
	</div>
	<div class="flex flex-col justify-start p-8 md:basis-1/3">
		<button on:click={resetCart} class="w-fit rounded-md bg-black text-white px-4 py-2">
			Remove All
		</button>
	</div>
</div>
