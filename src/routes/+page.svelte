<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  import type { PageData } from './$types';
  export let data : PageData;
</script>

{#each data.data as product}
  <ProductCard product={product} />
{/each}



