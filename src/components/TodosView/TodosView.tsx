import { createEffect, createSignal, For, Match, on, Show, Switch } from 'solid-js';
import { addTodo, Todo, todos } from '../../todo';
import classes from './todos-view.module.scss';
import { v4 } from 'uuid';
import { TodoCard } from '../TodoCard';
import { mdiPlus } from '@mdi/js';
import { Icon } from '../Icon';
import '../../auth';
import { useNavigate } from '@solidjs/router';
import { isLoggedIn } from '../../auth';
import { Empty } from '../Empty';
import { TopBar } from '../TopBar';
import { GlobalLoader } from '../GlobalLoader';

export interface TodosViewProps { }

export const TodosView = (props: TodosViewProps) => {

	const navigate = useNavigate();

	if (!isLoggedIn()) {
		navigate("/login", { replace: true });
	}

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

	const completed = () => todos()?.filter(todo => todo.completed) ?? [];
	const ongoing = () => todos()?.filter(todo => !todo.completed) ?? [];

	createEffect(on(todos, () => setTitle('')));

	return (
		<>
			<TopBar />
			<GlobalLoader />
			<main class={classes.todosView}>
				<div class={classes.addTodo}>
					<h2>Add Todo</h2>
					<form onSubmit={submit}>
						<input value={title()} onInput={e => setTitle(e.currentTarget.value)} />
						<button type="submit" disabled={!title()}>
							<Icon path={mdiPlus} />
						</button>
					</form>
				</div>

				<Show when={todos()?.length === 0}>
					<div class={classes.empty}>
						<Empty />
						<h1>No Todos</h1>
						<p>Add one to get started!</p>
					</div>
				</Show>
				<Show when={!!ongoing().length}>
					<div class={classes.list}>
						<For each={ongoing()}>
							{(todo) => <TodoCard todo={todo} />}
						</For>
					</div>
				</Show>
				<Show when={!!completed().length}>
					<div class={classes.list}>
						<For each={completed()}>
							{(todo) => <TodoCard todo={todo} />}
						</For>
					</div>
				</Show>

			</main>
		</>
	);
};