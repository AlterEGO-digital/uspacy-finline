type NullOr<T> = T extends Null ? T : T | null;

declare module '*.svg' {
	import React from 'react';
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}
