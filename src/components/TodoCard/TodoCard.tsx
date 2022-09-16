import { deleteTodo, editTodo, setTodoCompletion, Todo } from '../../todo';
import classes from './todo-card.module.scss';
import { mdiCheck, mdiDelete, mdiUndo } from '@mdi/js';
import { Icon } from '../Icon';
import { createSignal } from 'solid-js';

export interface TodoCardProps {
	todo: Todo
}

export const TodoCard = (props: TodoCardProps) => {
	const { todo } = props;
	const { title, id, completed } = todo;


	return (
		<div classList={{ [classes.todo]: true, [classes.completed]: completed }}>
			<p class={classes.title}>{title}</p>
			<div class={classes.space} />

			<button onClick={() => setTodoCompletion(id, !completed)}>
				<Icon path={completed ? mdiUndo : mdiCheck} />
			</button>
			<button onClick={() => deleteTodo(todo)}>
				<Icon path={mdiDelete} />
			</button>
		</div>
	);
};