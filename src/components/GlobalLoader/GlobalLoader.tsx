import { createEffect, Show } from 'solid-js';
import { asyncOperations, isLoading } from '../../loading';
import classes from './global-loader.module.scss';

export interface GlobalLoaderProps { }

export const GlobalLoader = (props: GlobalLoaderProps) => {
	const size = 50;
	const girth = 5;
	const radius = size / 2 - girth;

	return (
		<div class={classes.loader}>
			<Show when={isLoading()}>
				<svg
					style={`--perimeter: ${300}`}
					width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke-width={girth}
					/>
				</svg>
			</Show>
		</div>
	);
};