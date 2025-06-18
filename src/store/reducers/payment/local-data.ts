import { isDev, isStage } from '../../../const';
import { PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../../models/payment';

export const getCurrencyList = (): PaymentCurrencyEnum[] => {
	const currencies = ['UAH', 'USD', 'EUR'] as PaymentCurrencyEnum[];
	const testCurrency = PaymentCurrencyEnum.XTS;

	if (isDev || isStage) {
		return [testCurrency, ...currencies];
	}

	return currencies;
};

export const getRecieptDeliveryList = (): RecieptDeliveryEnum[] => {
	return ['None', 'Email', 'SMS', 'Viber'] as RecieptDeliveryEnum[];
};
