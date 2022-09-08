import { deleteTodo, Todo } from '../../todo';
import classes from './todo-card.module.scss';

export interface TodoCardProps {
	todo: Todo
}

export const TodoCard = (props: TodoCardProps) => {
	const { todo } = props;

	return (
		<div class={classes.todo}>
			<p>{todo.title}</p>
			<div class={classes.space}/>
			<button onClick={() => deleteTodo(todo)}>delete</button>
		</div>
	);
};