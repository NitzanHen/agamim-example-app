import { deleteTodo, Todo } from '../../todo';
import classes from './todo-card.module.scss';
import { mdiDelete } from '@mdi/js'; 
import { Icon } from '../Icon';

export interface TodoCardProps {
	todo: Todo
}

export const TodoCard = (props: TodoCardProps) => {
	const { todo } = props;

	return (
		<div class={classes.todo}>
			<p class={classes.title}>{todo.title}</p>
			<div class={classes.space}/>
			<button onClick={() => deleteTodo(todo)}>
				<Icon path={mdiDelete}/>
			</button>
		</div>
	);
};