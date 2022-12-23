<script>
  import "../app.postcss";
  import { writable } from "svelte/store";

  export const cart = writable([]);
</script>

<slot />
