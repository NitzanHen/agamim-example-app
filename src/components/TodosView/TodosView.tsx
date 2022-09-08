import { createEffect, createSignal, For, Match, on, Switch } from 'solid-js';
import { addTodo, todos } from '../../todo';
import classes from './todos-view.module.scss';
import { v4 } from 'uuid';
import { TodoCard } from '../TodoCard';

export interface TodosViewProps { }

export const TodosView = (props: TodosViewProps) => {

	const [title, setTitle] = createSignal('');

	const submit = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();

		console.log('submitting');

		addTodo({
			id: v4(),
			title: title(),
			completed: false,
			creationDate: new Date()
		});
	}

	createEffect(on(todos, () => setTitle('')));

	return (
		<div class={classes.todosView}>
			<div>
				<h2>Add Todo</h2>
				<form onSubmit={submit}>
					<input value={title()} onInput={e => setTitle(e.currentTarget.value)} />
					<button type="submit" disabled={!title()}>+</button>
				</form>
			</div>

			<Switch>
				<Match when={todos() === undefined}>
					Loading...
				</Match>
				<Match when={todos()?.length === 0}>
					No todos
				</Match>
				<Match when={todos()?.length}>
					<div class={classes.list}>
						<For each={todos()}>
							{(todo) => <TodoCard todo={todo} />}
						</For>
					</div>

				</Match>
			</Switch>

		</div>
	);
};