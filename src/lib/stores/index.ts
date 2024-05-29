import { writable, type Writable } from "svelte/store";

export const loginModalOpen: Writable<boolean> = writable(false);
export const registerModalOpen: Writable<boolean> = writable(false);
export const apiUri: Writable<string> = writable('http://localhost:3000');
export const user: Writable<any> = writable(null);
export const what: Writable<boolean> = writable(false);