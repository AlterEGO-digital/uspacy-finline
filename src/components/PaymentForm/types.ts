import { check, email, enum_, InferInput, nonEmpty, object, pipe, string, trim, union } from 'valibot';

import { PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../models/payment';

const t = (key: string) => key;
const getKey = (path: string) => `validation:common.${path}`;

const PaymentAccountSchema = pipe(
	object({ id: string(), label: string() }),
	check((input) => input !== null, t(getKey('predefined'))),
);

const EmailSchema = union(
	[
		pipe(string(t(getKey('invalidString'))), trim(), nonEmpty(t(getKey('required'))), email(t(getKey('invalidEmail')))),
		object({
			id: string(t(getKey('invalidString'))),
			label: string(t(getKey('invalidString'))),
			owner: string(),
		}),
	],
	t(getKey('required')),
);
const PhoneSchema = union(
	[
		pipe(string(t(getKey('invalidString'))), trim(), nonEmpty(t(getKey('required')))),
		object({
			id: string(t(getKey('invalidString'))),
			label: string(t(getKey('invalidString'))),
			owner: string(),
		}),
	],
	t(getKey('required')),
);

export const GeneratePaymentFormSchema = object({
	description: pipe(string(t(getKey('invalidString'))), trim(), nonEmpty(t(getKey('required')))),
	amount: pipe(
		string(t(getKey('invalidString'))),
		trim(),
		nonEmpty(t(getKey('required'))),
		check(
			(input) => !isNaN(Number(input)),
			() => t(getKey('invalidNumber')),
		),
	),
	currency: enum_(PaymentCurrencyEnum),
	email: EmailSchema,
	phone: PhoneSchema,
	paymentAccount: PaymentAccountSchema,
	receiptDelivery: enum_(RecieptDeliveryEnum),
});

export type GeneratePaymentFormValues = InferInput<typeof GeneratePaymentFormSchema>;

export type ComboboxRenderableOption = { id: string; label: string; owner: string };
