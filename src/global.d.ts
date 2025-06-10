type NullOr<T> = T extends Null ? T : T | null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Anything = any;
declare module '*.svg' {
	import React from 'react';
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}
