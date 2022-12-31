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

<button on:click={resetCart} class="w-fit rounded-md bg-black text-white px-4 py-2">
  Reset
</button>

<div class="flex flex-col">
  {#each line_items as line_item}
    <LineItemRow line_item={line_item} />
  {/each}
</div>
