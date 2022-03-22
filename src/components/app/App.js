import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
	Page404,
	ComicsPage,
	HomePage,
	SingleCharacterLayout,
	SingleComicLayout,
	SinglePage,
} from '../pages/indexPage';

import Spinner from '../../spinner/Spinner';
import AppHeader from '../appHeader/AppHeader';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const App = () => {
	return (
		<Router>
			<div className="app">
				<ErrorBoundary>
					<AppHeader />
				</ErrorBoundary>
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/comics" element={<ComicsPage />} />
							<Route
								path="/comics/:id"
								element={<SinglePage Component={SingleComicLayout} dataType="comic" />}
							/>
							<Route
								path="/characters/:id"
								element={<SinglePage Component={SingleCharacterLayout} dataType="character" />}
							/>
							<Route path="*" element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
