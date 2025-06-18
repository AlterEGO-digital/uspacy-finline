import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDealStatus } from '../../../models/settings';
import { fetchDealStatus, saveDealStatus, saveSettings } from './async-thunks';

type SettingsState = {
	dealStatus: NullOr<IDealStatus>;
	dealError: NullOr<string>;
	settingsError: NullOr<string>;
	isSavingDealStatus: boolean;
	isSavingSettings: boolean;
	isLoading: boolean;

	isSettingsSaved: boolean;
	isDealStatusSaved: boolean;
	settingsRequestId: number;
};

const initialState: SettingsState = {
	dealStatus: null,
	dealError: null,
	settingsError: null,
	isLoading: false,
	isSavingDealStatus: false,
	isSavingSettings: false,
	isDealStatusSaved: false,
	isSettingsSaved: false,

	settingsRequestId: performance.now(),
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDealStatus.fulfilled, (state, action: PayloadAction<IDealStatus | null>) => {
			state.dealStatus = action.payload;
			state.dealError = null;
		});
		builder.addCase(fetchDealStatus.rejected, (state, action) => {
			state.dealError = (action.payload as { message: string })?.message || 'Unknown error';
		});

		builder.addCase(saveSettings.fulfilled, (state) => {
			state.isSavingSettings = false;
			state.settingsError = null;
			state.isSettingsSaved = true;
			state.settingsRequestId = performance.now();
		});
		builder.addCase(saveSettings.rejected, (state, action) => {
			state.isSavingSettings = false;
			state.isSettingsSaved = false;
			state.settingsRequestId = performance.now();
			state.settingsError = (action.payload as { message: string })?.message || 'Unknown error';
		});

		builder.addCase(saveDealStatus.fulfilled, (state, action: PayloadAction<IDealStatus>) => {
			state.isSavingDealStatus = false;
			state.isDealStatusSaved = true;
			state.dealError = null;
			state.dealStatus = action.payload;
		});
		builder.addCase(saveDealStatus.rejected, (state, action) => {
			state.isSavingDealStatus = false;
			state.isDealStatusSaved = false;
			state.dealError = (action.payload as { message: string })?.message || 'Unknown error';
		});
		builder.addCase(saveDealStatus.pending, (state) => {
			state.isSavingDealStatus = true;
			state.dealError = null;
			state.isDealStatusSaved = false;
		});
		builder.addCase(saveSettings.pending, (state) => {
			state.isSavingSettings = true;
			state.isSettingsSaved = false;
			state.settingsError = null;
		});
	},
});

export default settingsSlice.reducer;
