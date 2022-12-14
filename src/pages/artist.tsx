import Head from 'next/head';
import { ArtistAlbums } from 'src/components/ArtistAlbums/ArtistAlbums';
import { ArtistLoad } from 'src/components/ArtistLoad/ArtistLoad';

export default function Home(props: { id: any }) {
	return (
		<div className="container">
			<Head>
				<title>Next TypeScript Starter</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="main">
				<div className="artist-container">
					<ArtistLoad id={props.id}></ArtistLoad>
				</div>
				<div className="album-container">
					<h2>Albums</h2>
					<ArtistAlbums id={props.id}></ArtistAlbums>
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(context: { query: { id: any } }) {
	const id = context.query.id;

	return {
		props: {
			id: id,
		},
	};
}

