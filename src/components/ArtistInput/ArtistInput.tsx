import { useForm } from 'react-hook-form';
import { Key, useState } from 'react';
import { searchArtists } from '../../lib/spotify';
import Link from 'next/link';
import styles from './ArtistInput.module.css';

type FormValues = {
	artistName: string;
};

type ContainerProps = {
	children: React.ReactNode;
};

export function ArtistInput(props: ContainerProps): JSX.Element {
	const form = useForm<FormValues>();
	var [searchResults, setSearchResults] = useState<any>([]);
	const [displayText, setDisplay] = useState(false);

	async function submit(data: FormValues) {
		// Lookup text on API.
		const artistSearchResults = artistSearch(data.artistName);
		// Required to fulfil promise.
		artistSearchResults.then(async function () {
			setSearchResults(await artistSearchResults);
			setDisplay(!displayText);
		});
	}

	return (
		<form onSubmit={form.handleSubmit(submit)}>
			<fieldset className="center">
				<p>
					<label htmlFor="name">Artist Name</label>
				</p>
				<p>
					<input {...form.register('artistName')} type="text" id="name" />
				</p>
			</fieldset>
			<button className={styles.button} type="submit">
				Submit
			</button>

			<p style={{ display: displayText ? 'block' : 'none' }}>
				Select the artist you would like to view.
			</p>

			{/* If found limit and loop through results to create links. */}
			{searchResults &&
				searchResults.slice(0, 10).map((artists: { id: Key; name: string }) => (
					<div className={styles.search_results}>
						<Link key={artists.id} href={{ pathname: `/artist`, query: { id: artists.id } }}>
							{artists.name}
						</Link>
					</div>
				))}
			{props.children}
		</form>
	);
}

async function artistSearch(searchName: string) {
	let items;
	try {
		const response = await searchArtists(searchName);
		items = await response.json();
		items = items.artists.items;
	} catch (err) {
		console.log(err);
		items = [];
	}

	return items;
}

