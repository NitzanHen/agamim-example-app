import { createEffect, createSignal, For, Match, on, Switch } from 'solid-js';
import { addTodo, todos } from '../../todo';
import classes from './todos-view.module.scss';
import { v4 } from 'uuid';
import { TodoCard } from '../TodoCard';
import { GlobalLoader } from '../GlobalLoader';
import { mdiPlus } from '@mdi/js';
import { Icon } from '../Icon';
import empty from './empty.svg';

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
			<GlobalLoader />

			<div class={classes.addTodo}>
				<h2>Add Todo</h2>
				<form onSubmit={submit}>
					<input value={title()} onInput={e => setTitle(e.currentTarget.value)} />
					<button type="submit" disabled={!title()}>
						<Icon path={mdiPlus} />
					</button>
				</form>
			</div>

			<Switch>
				<Match when={todos()?.length === 0}>
					<div class={classes.empty}>
						<img src={empty} />
						<h1>No Todos</h1>
						<p>Add one to get started!</p>
					</div>
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