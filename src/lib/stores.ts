import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initCart = browser ? window.localStorage.cart : [];

export const cart = writable(initCart || []);

cart.subscribe((value : unknown) => {
  if (browser) {
    console.log('value', typeof value, value);
    if (typeof value === 'string') { window.localStorage.cart = value.split(','); }
    else {
      window.localStorage.cart = value;
    }
    console.log('localStorage', typeof window.localStorage.cart, window.localStorage.cart);
  }
});
