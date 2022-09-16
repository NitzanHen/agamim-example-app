import { createEffect, createResource, createSignal } from 'solid-js';
import { addAsyncOperation, removeAsyncOperation } from './loading';
import { id, sleep } from './utils';
import { Override } from './types';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  creationDate: Date;
}
export type SerializedTodo = Override<Todo, { creationDate: string }>;

function getStoredTodos(): Todo[] {
  const lsItem = localStorage.getItem('todos');
  if (!lsItem) {
    return [];
  }

  return (
    JSON.parse(lsItem) as SerializedTodo[]
  ).map(({ creationDate, ...todo }) => ({
    ...todo,
    creationDate: new Date(creationDate)
  }));
}

const [getTodos, setTodos] = createSignal(getStoredTodos());

createEffect(() => localStorage.setItem('todos', JSON.stringify(getTodos() ?? [])));

export const [todos, { mutate: mutateTodos, refetch: refetchTodos }] = createResource(
  getTodos,
  async (todos) => {
    const opId = id();
    addAsyncOperation(opId);

    await sleep(500);

    removeAsyncOperation(opId);
    return todos
  }
);

export const addTodo = async (todo: Todo) => {
  const opId = id();
  addAsyncOperation(opId);

  await sleep(750);
  setTodos(oldTodos => [todo, ...oldTodos]);

  removeAsyncOperation(opId);
}

export const editTodo = async (todo: Todo) => {
  const opId = id();
  addAsyncOperation(opId);

  await sleep(750);
  setTodos(oldTodos => oldTodos.map(
    t => t.id === todo.id ? todo : t
  ));

  removeAsyncOperation(opId);
}

export const setTodoCompletion = async(todoId: Todo['id'], completed: boolean) => {
  const opId = id();
  addAsyncOperation(opId);

  await sleep(750);
  setTodos(oldTodos => oldTodos.map(
    t => t.id === todoId ? { ...t, completed } : t
  ));

  removeAsyncOperation(opId);
}

export const deleteTodo = async (todo: Todo) => {
  const opId = id();
  addAsyncOperation(opId);

  await sleep(750);
  setTodos(oldTodos => oldTodos.filter(t => t.id !== todo.id));

  removeAsyncOperation(opId);
}

export const clearTodos = async () => {
  const opId = id();
  addAsyncOperation(opId);

  await sleep(1500);
  setTodos([]);

  removeAsyncOperation(opId);
}