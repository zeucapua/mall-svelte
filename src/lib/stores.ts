import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';

const initCart = browser ? (
  typeof window.localStorage.cart === 'string' && window.localStorage.cart.length > 0 
    ? window.localStorage.cart.split(',') : window.localStorage.cart
) : [];

export const cart = writable(initCart || []);
export const cartLength = derived(cart, ($cart : string[]) => $cart.length);


cart.subscribe((value : unknown) => {
  if (browser) { window.localStorage.cart = value; }
});
