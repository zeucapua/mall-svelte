<script lang="ts">
  import type { Product } from '$lib/types';
  import type { PageData } from './$types';
  import ProductCard from '../components/ProductCard.svelte';

  export let data : PageData;

  $: store_products = data.store_products as Product[];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit px-8 gap-8">
{#each store_products as product}
  <ProductCard product={product} />
{/each}
</div>
