/*
 *
 * SignupPage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.signupPage || initialState;

export const selectSignupPage = createSelector(selectSlice, state => state);
