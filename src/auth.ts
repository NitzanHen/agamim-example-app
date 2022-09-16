import { createEffect, createSignal } from 'solid-js';
import { addAsyncOperation, removeAsyncOperation } from './loading';
import { mutateTodos, refetchTodos } from './todo';
import { id, sleep } from './utils';


function getStoredToken() {
  return localStorage.getItem('token') ?? '';
}

const [token, setToken] = createSignal(getStoredToken());
createEffect(() => localStorage.setItem('token', token()));

export const isLoggedIn = () => !!token();

export async function login(username: string, password: string): Promise<boolean> {
  const opId = id();
  addAsyncOperation(opId);

  await sleep(500);

  const encoded = btoa(`${username}:${password}`);
  if (encoded !== 'YWdhbWltLXVzZXI6c2hpci1nYW5vbg==') {
    removeAsyncOperation(opId);
    return false;
  }

  removeAsyncOperation(opId);

  mutateTodos(undefined);

  setToken(encoded);
  refetchTodos();

  return true;
}

export function logout() {
  setToken('');

  window.location.reload();
} 