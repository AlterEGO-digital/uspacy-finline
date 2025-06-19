import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../helpers/errors';
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
	paymentLink: NullOr<string>;

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
	paymentLink: null,
};

const paymentSlice = createSlice({
	name: 'payments',
	initialState,
	reducers: {
		resetGeneratingRequest: (state) => {
			state.isGenerateError = null;
			state.isGenerating = false;
			state.isGenerated = false;
			state.paymentLink = null;
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
			state.isAccountsError = getErrorMessage(action.payload).message;
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
			state.isDeleteError = getErrorMessage(action.payload).message;
		});

		builder.addCase(generatePaymentLink.pending, (state) => {
			state.paymentLink = null;
			state.isGenerating = true;
			state.isGenerateError = null;
			state.isGenerated = false;
		});
		builder.addCase(generatePaymentLink.fulfilled, (state, action: PayloadAction<string>) => {
			state.isGenerating = false;
			state.isGenerated = true;
			state.paymentLink = action.payload;
			state.isGenerateError = null;
		});
		builder.addCase(generatePaymentLink.rejected, (state, action) => {
			state.isGenerating = false;
			state.isGenerateError = getErrorMessage(action.payload).message;
		});
	},
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice.reducer;
