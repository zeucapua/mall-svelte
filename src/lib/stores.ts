import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initCart = browser ? window.localStorage.getItem('cart') ?? [] : [];
export const cart = writable(initCart || []);

cart.subscribe((value) => {
  if (browser) { window.localStorage.setItem('cart', value); }
});
