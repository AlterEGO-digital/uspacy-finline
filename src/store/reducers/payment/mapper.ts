import { GeneratePaymentFormValues } from '../../../components/PaymentForm/types';
import { isString } from '../../../helpers/typeGuards';
import { IGeneratePaymentLinkDto } from '../../../models/payment';

export const adoptToPaymentLinkDto = (values: GeneratePaymentFormValues, id: string): IGeneratePaymentLinkDto => {
	return {
		id,
		amount: values.amount,
		currency: values.currency,
		description: values.description,
		email: isString(values.email) ? values.email : values.email.id,
		phone: isString(values.phone) ? values.phone : values.phone.id,
		payment_account: values.paymentAccount.id,
		receipt_delivery: values.receiptDelivery.toLowerCase(),
	};
};
