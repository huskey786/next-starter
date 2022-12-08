import { useState } from 'react';

type CountProps = {
	children: React.ReactNode;
};

export function Count(props: CountProps): JSX.Element {
	const [count, setCount] = useState(0);

	function incrementCount() {
		setCount(count + 1);

		return true;
	}

	return (
		<button onClick={incrementCount}>
			{props.children} {count}
		</button>
	);
}

