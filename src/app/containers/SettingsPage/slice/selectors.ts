/*
 *
 * SettingsPage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.settingsPage || initialState;

export const selectSettingsPage = createSelector(selectSlice, state => state);
