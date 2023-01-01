<script lang="ts">
  import "../app.postcss";
  import { goto } from '$app/navigation';
  import { cartLength } from '$lib/stores';
  import type { LayoutData } from './$types';

  export let data : LayoutData;
</script>

<div class="flex flex-col w-full min-w-screen h-full min-h-screen"> 
	<div class="flex flex-row w-full h-fit bg-[#ff3e00] justify-between p-16">
		<button on:click={() => goto('/')} class="text-7xl text-white font-bold">Mall</button>
		<button on:click={() => goto('/cart')} class="px-4 py-2 bg-white text-black border-2 rounded-md w-fit">
			Cart: {$cartLength}
		</button>
	</div>
	<div class="w-full h-full min-h-screen p-16 bg-neutral-900">
		<slot />
	</div>
	<div class="w-full h-full bg-[#ff3e00] p-8 justify-center">
		<p class="text-2xl text-center text-white">Mall - 2023</p>
	</div>
</div>
