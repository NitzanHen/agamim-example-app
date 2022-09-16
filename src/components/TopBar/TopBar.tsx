import classes from './top-bar.module.scss';
import { mdiLogout, mdiNuke } from '@mdi/js';
import { Icon } from '../Icon';
import { logout } from '../../auth';
import { clearTodos } from '../../todo';

export interface TopBarProps { }

export const TopBar = (props: TopBarProps) => {

	return (
		<header class={classes.header}>
			<h1>Agamim Todos</h1>
			<div class={classes.spacer} />

			<button onclick={clearTodos}>
				<Icon path={mdiNuke} />
			</button>
			<button onclick={logout}>
				<Icon path={mdiLogout} />
			</button>
		</header>
	);
};