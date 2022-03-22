import { useState, useEffect, useRef, useMemo } from 'react';

import ErrorMessage from '../app/errorMessage/ErrorMessage';
import useMarvelService from '../../service/MarvelService';
import Spinner from '../../spinner/Spinner';

import './charList.scss';

const setContent = (process, Component, newItemsLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return newItemsLoading ? <Component /> : <Spinner />;
		case 'confirmed':
			return <Component />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unexpected process state');
	}
};

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [offset, setOffset] = useState(210);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [charEnded, setCharEnded] = useState(false);

	const { getAllCharacters, process, setProcess } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllCharacters(offset)
			.then(onCharsLoaded)
			.then(() => setProcess('confirmed'));
	};

	const onCharsLoaded = (newCharList) => {
		let ended = false;
		if (newCharList < 9) {
			ended = true;
		}
		setCharList([...charList, ...newCharList]);
		setCharEnded(ended);
		setOffset(offset + 9);
		setNewItemsLoading(false);
	};

	const itemsRef = useRef([]);

	const focusOnItem = (id) => {
		itemsRef.current.forEach((item) => item.classList.remove('char__item_selected'));
		itemsRef.current[id].classList.add('char__item_selected');
		itemsRef.current[id].focus();
	};

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = { objectFit: 'cover' };
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = { objectFit: 'unset' };
			}
			return (
				<li
					key={item.id}
					className="char__item"
					onClick={() => {
						props.onSelectedChar(item.id);
						focusOnItem(i);
					}}
					ref={(el) => (itemsRef.current[i] = el)}
					tabIndex={0}
					onKeyPress={(e) => {
						if (e.key === '' || e.key === 'Enter') {
							props.onSelectedChar(item.id);
							focusOnItem(i);
						}
					}}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	}

	const elements = useMemo(() => {
		return setContent(process, () => renderItems(charList), newItemsLoading);
	}, [process]);

	return (
		<div className="char__list">
			{elements}
			<button
				onClick={() => onRequest(offset)}
				disabled={newItemsLoading}
				className="button button__main button__long"
				style={{ display: charEnded ? 'null' : 'block' }}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default CharList;
