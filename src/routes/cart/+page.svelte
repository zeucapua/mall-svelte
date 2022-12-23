<script lang="ts">
  import { cart } from "$lib/stores";
  const reset = () => { cart.set([]); }
</script>


<div class="flex flex-col w-full min-w-screen h-full min-h-screen p-16">
  <button class="bg-black text-white px-4 py-2 w-fit rounded-md" on:click={reset}>Reset</button>
</div>
