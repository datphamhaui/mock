/*
 *
 * ArticlePage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.articlePage || initialState;

export const selectArticlePage = createSelector(selectSlice, state => state);
