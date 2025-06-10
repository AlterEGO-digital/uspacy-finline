import { PaymentCurrencyEnum } from '../../../models/payment';
import { isTestCurrency } from './currency';

export const getCurrencyLabel = (option: PaymentCurrencyEnum) => {
	return isTestCurrency(option) ? `${option} (for test account)` : option;
};
