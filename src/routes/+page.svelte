<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  export let data : PageData;
</script>

<div class="flex flex-col w-full min-w-screen h-full min-h-screen p-16">
{#each data.data as product}
  <ProductCard product={product} />
{/each}
<button on:click={() => goto("/cart")}>Cart</button>
</div>



