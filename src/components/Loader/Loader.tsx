import styles from './Loader.module.css';
import React from 'react';

type ContainerProps = {
	children: React.ReactNode;
};

export function Loader(props: ContainerProps) {
	return (
		<div className={styles.loaderContainer}>
			<img src="/loader.svg" />
			<div>Loading...</div>
			{props.children}
		</div>
	);
}

