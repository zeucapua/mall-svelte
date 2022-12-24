<script lang="ts">
  import { cart } from "$lib/stores";
  export let product : any; 

  const addProduct = () => {
    cart.update(c => (
      [product.id].concat(
        typeof c === 'string' ? c.split(',') : c
      )
    ));
  }
</script>

<div class="flex flex-col w-fit h-full border-2 rounded-xl p-8">
  <p class="text-3xl font-bold">
    {product.name}
  </p>
  <button class="bg-black text-white rounded-md w-fit px-4 py-2" on:click={addProduct}> 
    Add to Cart
  </button>
</div>
