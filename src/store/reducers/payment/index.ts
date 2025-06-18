import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPaymentAccount } from '../../../models/payment';
import { deletePaymentAccount, fetchPaymentAccounts, generatePaymentLink } from './async-thunks';

interface PaymentState {
	accounts: IPaymentAccount[];
	isAccountsError: NullOr<string>;
	isDeleteError: NullOr<string>;
	isGenerateError: NullOr<string>;
	isAccountsLoading: boolean;
	isDeleting: boolean;
	isGenerating: boolean;
	isDeleted: boolean;
	isGenerated: boolean;

	isUninitialized: boolean;
}

const initialState: PaymentState = {
	accounts: [],
	isAccountsError: null,
	isDeleteError: null,
	isGenerateError: null,
	isAccountsLoading: false,
	isDeleting: false,
	isGenerating: false,
	isDeleted: false,
	isGenerated: false,
	isUninitialized: true,
};

const paymentSlice = createSlice({
	name: 'payments',
	initialState,
	reducers: {
		resetGeneratingRequest: (state) => {
			state.isGenerateError = null;
			state.isGenerating = false;
			state.isGenerated = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPaymentAccounts.pending, (state) => {
			state.isAccountsLoading = true;
			state.isAccountsError = null;
			state.isUninitialized = false;
		});
		builder.addCase(fetchPaymentAccounts.fulfilled, (state, action: PayloadAction<IPaymentAccount[]>) => {
			state.isAccountsLoading = false;
			state.accounts = action.payload || [];
		});
		builder.addCase(fetchPaymentAccounts.rejected, (state, action) => {
			state.isAccountsLoading = false;
			state.isAccountsError = (action.payload as string) || 'Unknown error';
		});

		builder.addCase(deletePaymentAccount.pending, (state) => {
			state.isDeleting = true;
			state.isDeleteError = null;
			state.isDeleted = false;
		});
		builder.addCase(deletePaymentAccount.fulfilled, (state, action: PayloadAction<string>) => {
			state.isDeleting = false;
			state.isDeleted = true;
			state.accounts = state.accounts.filter((acc) => acc.id !== action.payload);
		});
		builder.addCase(deletePaymentAccount.rejected, (state, action) => {
			state.isDeleting = false;
			state.isDeleteError = (action.payload as string) || 'Unknown error';
		});

		builder.addCase(generatePaymentLink.pending, (state) => {
			state.isGenerating = true;
			state.isGenerateError = null;
			state.isGenerated = false;
		});
		builder.addCase(generatePaymentLink.fulfilled, (state) => {
			state.isGenerating = false;
			state.isGenerated = true;
		});
		builder.addCase(generatePaymentLink.rejected, (state, action) => {
			state.isGenerating = false;
			state.isGenerateError = (action.payload as string) || 'Unknown error';
		});
	},
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice.reducer;
