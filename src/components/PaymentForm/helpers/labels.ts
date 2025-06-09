import { PaymentCurrencyEnum } from '../../../models/payment';

const isTestCurrency = (currency: PaymentCurrencyEnum) => currency === PaymentCurrencyEnum.XTS;

export const getCurrencyLabel = (option: PaymentCurrencyEnum) => {
	return isTestCurrency(option) ? `${option} (for test account)` : option;
};
