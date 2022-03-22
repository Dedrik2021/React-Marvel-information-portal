import { lazy } from 'react';

const Page404 = lazy(() => import('../pages/404'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

export {ComicsPage, HomePage, Page404, SingleCharacterLayout, SingleComicLayout, SinglePage}