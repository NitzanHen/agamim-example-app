import { createSignal } from 'solid-js';

export const [asyncOperations, setAsyncOperations] = createSignal(new Set<string>());

export const isLoading = () => asyncOperations().size > 0;

export const addAsyncOperation = (id: string) => {
  setAsyncOperations(set => {
    const newSet = new Set(set);
    newSet.add(id);
    return newSet;
  })
}

export const removeAsyncOperation = (id: string) => {
  setAsyncOperations(set => {
    const newSet = new Set(set);
    newSet.delete(id);
    return newSet;
  })
}