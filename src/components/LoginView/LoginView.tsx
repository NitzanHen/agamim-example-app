import { useNavigate } from '@solidjs/router';
import { isLoggedIn, login } from '../../auth';
import { GlobalLoader } from '../GlobalLoader';
import classes from './login-view.module.scss';

export interface LoginViewProps { }

export const LoginView = (props: LoginViewProps) => {
	const navigate = useNavigate();

	if (isLoggedIn()) {
		navigate("/", { replace: true });
	}

	const handleSubmit = async (e: Event & { currentTarget: HTMLFormElement }) => {
		e.preventDefault();
		e.stopPropagation();

		const data = new FormData(e.currentTarget);
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		const ok = await login(username, password);
		if (ok) {
			navigate("/");
			return;
		}

		alert('wrong credentials.\n\n(try username "agamim-user" with password "shir-ganon")')
	}

	return (
		<>
			<GlobalLoader />
			<main class={classes.main}>
				<form onsubmit={handleSubmit} class={classes.login}>
					<h1>Welcome!</h1>

					<div class={classes.field}>
						<label for="username">Username</label>
						<input id="username" name="username" required />
					</div>

					<div class={classes.field}>
						<label for="password">Password</label>
						<input id="password" name="password" type="password" required />
					</div>
					<button type="submit">
						log in
					</button>
				</form>
			</main>

		</>
	);
};