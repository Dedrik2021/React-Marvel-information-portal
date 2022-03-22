import { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CharSearchForm from '../charSearchForm/CharSearchForm';

import decoration from '../../resources/img/vision.png';

const CharInfoStyle = styled.div`
	position: sticky;
	top: 20px;
`;

const HomePage = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const onSelectedChar = (id) => {
		setSelectedChar(id);
	};

	return (
		<>
			<Helmet>
				<meta name="description" content="Marvel information portal" />
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onSelectedChar={onSelectedChar} />
				</ErrorBoundary>
				<CharInfoStyle>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharSearchForm />
					</ErrorBoundary>
				</CharInfoStyle>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	);
};

export default HomePage;
