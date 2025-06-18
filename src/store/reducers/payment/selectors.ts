import { RootState } from '../..';

export const selectPaymentAccounts = (state: RootState) => state.payments.accounts;
export const selectPaymentAccount = (id: string) => (state: RootState) => state.payments.accounts?.find((acc) => acc.id == id);

export const selectIsAccountsLoading = (state: RootState) => state.payments.isAccountsLoading;
export const selectIsDeleting = (state: RootState) => state.payments.isDeleting;
export const selectIsGenerating = (state: RootState) => state.payments.isGenerating;
export const selectIsGeneratingSuccess = (state: RootState) => state.payments.isGenerated;
export const selectIsDeletingSuccess = (state: RootState) => state.payments.isDeleted;

export const selectAccountsError = (state: RootState) => state.payments.isAccountsError;
export const selectDeleteError = (state: RootState) => state.payments.isDeleteError;
export const selectGenerateError = (state: RootState) => state.payments.isGenerateError;
export const selectAccountsUninitialized = (state: RootState) => state.payments.isUninitialized;
