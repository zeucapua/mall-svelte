<script lang="ts">
  import "../app.postcss";
  import { goto } from '$app/navigation';
  import { cartLength } from '$lib/stores';
  import type { LayoutData } from './$types';

  export let data : LayoutData;
</script>

<div class="flex flex-col w-full min-w-screen h-full min-h-screen p-16">
  <button on:click={() => goto('/cart')} class="px-4 py-2 border-2 rounded-md w-fit">
    Cart: {$cartLength}
  </button>
  <slot />
</div>
