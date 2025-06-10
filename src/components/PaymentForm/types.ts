import * as v from 'valibot';

import { PaymentCurrencyEnum, RecieptDeliveryEnum } from '../../models/payment';

const t = (key: string) => key;
const getKey = (path: string) => `validation:common.${path}`;

const PaymentAccountSchema = v.pipe(
	v.object({ id: v.union([v.number(), v.string()]), label: v.string() }),
	v.check((input) => input !== null, t(getKey('predefined'))),
);

const EmailSchema = v.union(
	[
		v.pipe(v.string(t(getKey('invalidString'))), v.trim(), v.nonEmpty(t(getKey('required'))), v.email(t(getKey('invalidEmail')))),
		v.object({
			id: v.string(t(getKey('invalidString'))),
			label: v.string(t(getKey('invalidString'))),
			owner: v.string(),
		}),
	],
	t(getKey('required')),
);
const PhoneSchema = v.union(
	[
		v.pipe(v.string(t(getKey('invalidString'))), v.trim(), v.nonEmpty(t(getKey('required')))),
		v.object({
			id: v.string(t(getKey('invalidString'))),
			label: v.string(t(getKey('invalidString'))),
			owner: v.string(),
		}),
	],
	t(getKey('required')),
);

export const GeneratePaymentFormSchema = v.object({
	description: v.pipe(v.string(t(getKey('invalidString'))), v.trim(), v.nonEmpty(t(getKey('required')))),
	amount: v.pipe(
		v.string(t(getKey('invalidString'))),
		v.trim(),
		v.nonEmpty(t(getKey('required'))),
		v.check(
			(input) => !isNaN(Number(input)),
			() => t(getKey('invalidNumber')),
		),
	),
	currency: v.enum(PaymentCurrencyEnum),
	email: EmailSchema,
	phone: PhoneSchema,
	paymentAccount: PaymentAccountSchema,
	receiptDelivery: v.enum(RecieptDeliveryEnum),
});

export type GeneratePaymentFormValues = v.InferInput<typeof GeneratePaymentFormSchema>;
export type ComboboxRenderableOption = { id: string; label: string; owner: string };
