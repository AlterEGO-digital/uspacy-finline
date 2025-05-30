import { IDeal } from '../../../models/deal';
import { PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../../models/payment';
import { GeneratePaymentFormValues } from '../types';

export const getInitialPaymentFormState = (deal: IDeal): GeneratePaymentFormValues => {
	const [contact] = deal?.contacts || [];
	const [fallbackEmail] = contact?.email ?? [];

	const email = contact?.email?.find((emailAddress) => !!emailAddress.main) || fallbackEmail;

	return {
		amount: deal?.amount?.value || '0.00',
		currency: deal?.amount?.currency || PaymentCurrencyEnum.UAH,
		description: '',
		email: email?.value ?? '',
		paymentAccount: null,
		phone: contact?.phone ?? '',
		receiptDelivery: RecieptDeliveryEnum.None,
	};
};
