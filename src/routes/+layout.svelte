<script>
  import "../app.postcss";
  import { cart } from '$lib/stores';
  import { derived } from 'svelte/store';
  export const cartNumber = derived(cart, $cart => {
    typeof $cart === 'string' ? $cart.split(',').length : $cart.length
  });
</script>

<div class="flex flex-col w-full min-w-screen h-full min-h-screen p-16">
  <slot />
</div>
