import { IDeal } from '../../../models/deal';
import { PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../../models/payment';
import { GeneratePaymentFormValues } from '../types';

export const getInitialPaymentFormState = (deal: IDeal, currencies: PaymentCurrencyEnum[]): GeneratePaymentFormValues => {
	const [contact] = deal?.contacts || [];
	const [fallbackEmail] = contact?.email ?? [];

	const email = contact?.email?.find((emailAddress) => !!emailAddress.main) || fallbackEmail;
	const currency = currencies.find((c) => c === deal?.amount?.currency) || PaymentCurrencyEnum.UAH;
	const amount = deal?.amount?.value || '0.00';

	return {
		amount,
		currency,
		description: '',
		email: email?.value ?? '',
		paymentAccount: null,
		phone: contact?.phone ?? '',
		receiptDelivery: RecieptDeliveryEnum.None,
	};
};
