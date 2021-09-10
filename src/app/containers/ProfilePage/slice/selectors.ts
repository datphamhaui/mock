/*
 *
 * ProfilePage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.profilePage || initialState;

export const selectProfilePage = createSelector(selectSlice, state => state);
