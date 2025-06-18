import { RootState } from '../..';

export const selectDealStatus = (state: RootState) => state.settings.dealStatus?.status;
export const selectSettingsError = (state: RootState) => state.settings.settingsError;
export const selectDealStatusError = (state: RootState) => state.settings.dealError;

export const selectIsLoading = (state: RootState) => state.settings.isLoading;
export const selectIsSavingDealStatus = (state: RootState) => state.settings.isSavingDealStatus;
export const selectIsSavingSettings = (state: RootState) => state.settings.isSavingSettings;

export const selectIsSettingsSaved = (state: RootState) => state.settings.isSettingsSaved;
export const selectIsDealStatusSaved = (state: RootState) => state.settings.isDealStatusSaved;
export const selectSettingsRequestId = (state: RootState) => state.settings.settingsRequestId;
