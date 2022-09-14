import type { JSX } from 'solid-js';

export interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
	path: string;
}

export const Icon = ({ path, ...svgProps }: IconProps) => {

	return (
		<svg 
		{...svgProps} 
		width='24' 
		height='24' 
		viewBox='0 0 24 24' 
		display='block'>
			<path d={path} fill="currentColor"/>
		</svg>
	);
};