import { isTestCurrency, VALID_TEST_PAYMENT_AMOUNT } from '../../../components/PaymentForm/helpers/currency';
import { GeneratePaymentFormValues } from '../../../components/PaymentForm/types';
import { isString } from '../../../helpers/typeGuards';
import { IGeneratePaymentLinkDto, IPaymentAccount, IRawPaymentAccount } from '../../../models/payment';

export const adaptToPaymentLinkDto = (values: GeneratePaymentFormValues, id: number): IGeneratePaymentLinkDto => {
	return {
		deal_id: String(id),
		amount: isTestCurrency(values.currency) ? VALID_TEST_PAYMENT_AMOUNT : Number(values.amount),
		currency: values.currency,
		description: values.description,
		customer_email: isString(values.email) ? values.email : values.email.id,
		customer_phone: isString(values.phone) ? values.phone : values.phone.id,
		account_id: String(values.paymentAccount.id),
		f_receipt_delivery: values.receiptDelivery.toLowerCase(),
	};
};

export const normalizePaymentAccount = (entity: IRawPaymentAccount): IPaymentAccount => {
	return {
		id: entity.id,
		label: entity.name,
	};
};
