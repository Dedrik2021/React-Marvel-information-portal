import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../app/errorMessage/ErrorMessage';
import useMarvelService from '../../service/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newComicsLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return newComicsLoading ? <Component /> : <Spinner />;
		case 'confirmed':
			return <Component />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unexpected process state');
	}
};

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [comicsEnded, setComicsEnded] = useState(false);
	const [newComicsLoading, setNewComicsLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const { getAllComics, setProcess, process } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
		getAllComics(offset)
			.then(onComicsLoaded)
			.then(() => setProcess('confirmed'));
	};

	const onComicsLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList < 8) {
			ended = true;
		}
		setComicsList([...comicsList, ...newComicsList]);
		setComicsEnded(ended);
		setNewComicsLoading(false);
		setOffset(offset + 8);
	};

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li className="comics__item" key={i}>
					<Link to={`/comics/${item.id}`}>
						<img src={item.thumbnail} alt={item.title} className="comics__item-img" />
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price}</div>
					</Link>
				</li>
			);
		});
		return <ul className="comics__grid">{items}</ul>;
	}

	return (
		<div className="comics__list">
			{setContent(process, () => renderItems(comicsList), newComicsLoading)}
			<button
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				disabled={newComicsLoading}
				style={{ display: comicsEnded ? 'none' : 'block' }}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
