<script lang="ts">
  import { onMount } from "svelte";
  import { cart, totalAmount } from "$lib/stores";
  import { formatPrice } from "$lib/utils";

  let total;
  let purchase;

  onMount(() => {
    total = $totalAmount;
    purchase = $cart;
    totalAmount.set(0);
    cart.set([]);
  });

</script>

<p class="text-3xl text-white text-center">
  Thank you for your ${formatPrice(total)} purchase! 
</p>

<p class="text-xl text-white text-center">
  Here's a summary of your purchase: {purchase}
</p>
