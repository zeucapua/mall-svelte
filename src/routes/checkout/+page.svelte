<script lang="ts">
  import { goto } from '$app/navigation';
  import { cart } from '$lib/stores';
  import { onMount } from 'svelte';
  import { loadStripe } from 'stripe';
  import { PUBLIC_STRIPE_KEY } from '$env/static/public';
  import { Elements } from 'svelte-stripe';
  import type Stripe from 'stripe';

  let publicStripe : Stripe;
  let error : unknown = null;
  const paymentRequest = {
    country: 'US',
    currency: 'usd',
    total: {},
    displayItems: [{}], 
    requestPayerName: true,
    requestPayerEmail: true,
  };

  onMount( async () => {
    publicStripe = loadStripe(PUBLIC_STRIPE_KEY);
    updatePaymentRequest();
  });

  async function updatePaymentRequest() {
    const response = await fetch('/api/stripe/cart', {
      method: 'POST',
      body: JSON.stringify({ cart: $cart })
    });

    let total = 0;
    const { products } = await response.json();
    let paymentItems : Record<string, unknown>[] = [];
    for (const product of products) {
      const res = await fetch('/api/stripe/get-product-price', {
        method: 'POST',
        body: JSON.stringify({ product: product }),
      });
      const price = await res.json();
      const paymentItem = {
        amount: price.unit_amount,
        label: product.name
      };
      paymentItems = [...paymentItems, paymentItem];
      total += price.unit_amount;
    }

    paymentRequest.total = { amount: total, label: 'Mall Svelte Cart Total' };
    paymentRequest.displayItems = paymentItems;
  }

  async function createPaymentIntent() {
    const response = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ cart: $cart })
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  }

  async function pay(e) {
    const paymentMethod = e.detail.paymentMethod;
    const clientSecret = await createPaymentIntent();
    let result = await publicStripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id
    });

    if (result.error) { e.detail.complete('fail'); error = result.error }
    else {
      e.detail.complete('success');
      goto('/thankyou');
    }
  }

</script>

{#if error}
  <p>There is an error</p>
{/if}


{#if publicStripe}
  <Elements {publicStripe}>
  </Elements>
{:else}
  <p>Loading...</p>
{/if}

