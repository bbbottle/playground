import React from 'react';

import { req } from '@zhoujiahao/utils';

import { apiURL } from '../../config';
import { buildDataProvider } from './comp-factory';

const extractPhotosUrl = photos => photos.map(({ url }) => url);

const getPhotosURL = () => req(apiURL.res).then(extractPhotosUrl);
const getPosts = () => req(apiURL.posts);

export const PostsProvider = buildDataProvider(getPosts, 'posts');
export const PhotosProvider = buildDataProvider(getPhotosURL, 'photos')
