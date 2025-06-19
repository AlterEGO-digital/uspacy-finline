import { isDev, isStage } from '../../../const';
import { IDeal } from '../../../models/deal';
import { PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../../models/payment';
import { GeneratePaymentFormValues } from '../types';

export const getInitialPaymentFormState = (deal: IDeal, currencies: PaymentCurrencyEnum[]): GeneratePaymentFormValues => {
	if (!Array.isArray(deal?.contacts)) {
		return {
			amount: '',
			currency: isDev || isStage ? PaymentCurrencyEnum.XTS : PaymentCurrencyEnum.UAH,
			description: '',
			email: '',
			paymentAccount: { id: '', label: '' },
			phone: '',
			receiptDelivery: RecieptDeliveryEnum.None,
		};
	}

	const [contact] = deal?.contacts || [];
	const fallbackEmail = Array.isArray(contact?.email) ? contact.email[0]?.value : '';
	const fallbackPhone = Array.isArray(contact?.phone) ? contact.phone[0]?.value : '';

	const email = Array.isArray(contact?.email) ? contact?.email?.find((emailAddress) => !!emailAddress?.main)?.value : fallbackEmail;
	const phone = Array.isArray(contact?.phone) ? contact?.phone?.find((tel) => !!tel?.main)?.value : fallbackPhone;
	const currency = isDev || isStage ? PaymentCurrencyEnum.XTS : currencies.find((c) => c === deal?.amount?.currency) || PaymentCurrencyEnum.UAH;
	const amount = deal?.amount?.value || '0.00';

	return {
		amount,
		email,
		phone,
		currency,
		description: '',
		paymentAccount: null,
		receiptDelivery: RecieptDeliveryEnum.None,
	};
};
