import { createEffect, createResource, createSignal } from 'solid-js';
import { sleep } from './sleep';
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

createEffect(() => console.log(getTodos()))

export const [todos, { mutate: mutateTodos, refetch: refetchTodos }] = createResource(
  getTodos,
  async (todos) => {
    await sleep(500);
    return todos
  }
);

export const addTodo = async (todo: Todo) => {
  await sleep(750);
  setTodos(oldTodos => [todo, ...oldTodos]);
}

export const editTodo = async (todo: Todo) => {
  await sleep(750);
  setTodos(oldTodos => oldTodos.map(
    t => t.id === todo.id ? todo : t
  ));
}

export const deleteTodo = async (todo: Todo) => {
  await sleep(750);
  setTodos(oldTodos => oldTodos.filter(t => t.id !== todo.id));
}