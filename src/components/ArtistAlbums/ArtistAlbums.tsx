import { loadAlbums } from 'src/lib/spotify';
import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';

export function ArtistAlbums(props: any): JSX.Element {
	var id = props.id;
	const [artistAlbums, setArtistAlbum] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadArtistAlbums = async () => {
			const response = await artistAlbumLoad(id);
			setArtistAlbum(response);
			setLoading(false);
		};
		loadArtistAlbums();
	}, []);

	if (loading) {
		return <Loader>Loading...</Loader>;
	} else {
		return (
			<div className="container">
				<ol>
					{artistAlbums.map((albums) => (
						<div key={albums.id}>
							<li>
								{albums.name}: {albums.release_date}
							</li>
						</div>
					))}
				</ol>
			</div>
		);
	}
}

async function artistAlbumLoad(searchName: string) {
	let items;
	try {
		const response = await loadAlbums(searchName);
		items = await response.json();
	} catch (err) {
		items = [];
	}

	return items.items;
}

