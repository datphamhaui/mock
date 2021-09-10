/*
 *
 * PostPage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.postPage || initialState;

export const selectPostPage = createSelector(selectSlice, state => state);
