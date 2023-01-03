import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';

const initCart = browser ? (
  typeof window.localStorage.cart === 'string' && window.localStorage.cart.length > 0 
    ? window.localStorage.cart.split(',') : window.localStorage.cart
) : [];

const initTotal = browser ? (
  typeof window.localStorage.totalAmount === 'string' && window.localStorage.totalAmount.length > 0
    ? parseInt(window.localStorage.totalAmount) : 0
) : 0;

export const cart = writable(initCart || []);
export const cartLength = derived(cart, ($cart : string[]) => $cart.length);
export const totalAmount = writable(initTotal || 0);

cart.subscribe((value : unknown) => {
  if (browser) { window.localStorage.cart = value; }
});


totalAmount.subscribe((value : unknown) => {
  if (browser) { window.localStorage.totalAmount = value; }
});










