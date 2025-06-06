import { GeneratePaymentFormValues } from '../../../components/PaymentForm/types';
import { isString } from '../../../helpers/typeGuards';
import { IGeneratePaymentLinkDto, IPaymentAccount, IRawPaymentAccount } from '../../../models/payment';

export const adaptToPaymentLinkDto = (values: GeneratePaymentFormValues, id: string): IGeneratePaymentLinkDto => {
	return {
		order_id: id,
		amount: values.amount,
		currency: values.currency,
		description: values.description,
		customer_email: isString(values.email) ? values.email : values.email.id,
		customer_phone: isString(values.phone) ? values.phone : values.phone.id,
		payment_account: String(values.paymentAccount.id),
		f_receipt_delivery: values.receiptDelivery.toLowerCase(),
	};
};

export const normalizePaymentAccount = (entity: IRawPaymentAccount): IPaymentAccount => {
	return {
		id: entity.id,
		label: entity.name,
	};
};
