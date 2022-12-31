<script lang="ts">
  import type { Product } from '$lib/types';
  import type { PageData } from './$types';
  import ProductCard from '../components/ProductCard.svelte';

  export let data : PageData;

  $: store_products = data.store_products as Product[];
</script>


{#each store_products as product}
  <ProductCard product={product} />
{/each}
