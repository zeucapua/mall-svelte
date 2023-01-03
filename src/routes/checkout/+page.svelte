<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";
  import { totalAmount } from "$lib/stores";
  import { PUBLIC_STRIPE_KEY } from "$env/static/public";
  import { Elements, PaymentElement, LinkAuthenticationElement, Address } from "svelte-stripe"

  let stripe = null;
  let clientSecret = null;
  let error = null;
  let elements;
  let processing = false;

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY);
    clientSecret = await createPaymentIntent();
  });

  async function createPaymentIntent() {
    const response = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount: $totalAmount, currency: "usd" }),
      headers: { "content-type": "application/json" },
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  }

  async function submit() {
    // avoid processing duplicates
    if (processing) return
    processing = true
    // confirm payment with stripe
    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })
    // log results, for debugging
    console.log({ result })
    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      goto('/thanks')
    }
  }
</script>


{#if error}
  <p>{error.message} Please try again.</p>
{/if}


{#if stripe && clientSecret}
  <Elements
    {stripe}
    {clientSecret}
    theme="flat"
    labels="floating"
    bind:elements
  >
    <form on:submit|preventDefault={submit}>
      <LinkAuthenticationElement />
      <PaymentElement />
      <button disabled={processing} class="w-full h-fit px-4 py-2 bg-black text-white text-center">
        {#if processing}
          Processing...
        {:else}
          Pay
        {/if}
      </button>
    </form>
  </Elements>
{:else}
  <p>Loading...</p>
{/if}






