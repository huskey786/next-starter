import { loadArtist } from 'src/lib/spotify';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function ArtistLoad(props: { id: any }): JSX.Element {
	var id = props.id;
	const [artistObj, setArtistObj] = useState<any>([]);

	// Prevent continuous calls to APIs.
	useEffect(() => {
		const loadArtistObj = async () => {
			const response = await artistLoad(id);
			setArtistObj(response);
		};
		loadArtistObj();
	}, []);

	if (artistObj.length === 0) {
		return <div>This app works perfectly, problem with Spotify.</div>;
	} else {
		return (
			<div className="container">
				<h1 className="title">{artistObj.name}</h1>
				<p className="center">
					<Link className="clear" href="/">
						Go back to homepage
					</Link>
				</p>
				<img src={artistObj.images[1].url}></img>
				<h2>Bio:</h2>
				<p>Followers: {artistObj.followers.total}</p>
				<p>Genres: {artistObj.genres[0]}</p>
				<p>
					<Link className="clear" href={artistObj.external_urls.spotify} target="_blank">
						View on Spotify
					</Link>
				</p>
			</div>
		);
	}
}

async function artistLoad(searchName: string) {
	let items;
	try {
		const response = await loadArtist(searchName);
		items = await response.json();
	} catch (err) {
		console.log(err);
		items = [];
	}

	return items;
}

