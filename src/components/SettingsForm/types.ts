import * as v from 'valibot';

const t = (key: string) => key;
const getKey = (path: string) => `validation:common.${path}`;

const PaymentAccountSchema = v.object({
	apiKey: v.pipe(v.string(), v.trim()),
	apiSecret: v.pipe(v.string(), v.trim()),
	posId: v.pipe(v.string(), v.trim()),
	endpointsKey: v.pipe(v.string(), v.trim()),
	label: v.pipe(v.string(), v.trim()),
});

const validateFields = v.custom<v.InferInput<typeof PaymentAccountSchema>>(
	(item) => {
		if (!item) return true;
		const values = Object.values(item).map((value) => (value ?? '').toString().trim());

		const allEmpty = values.every((value) => value === '');
		const allFilled = values.every((value) => value !== '');
		return allEmpty || allFilled;
	},
	() => {
		return t(getKey('optionalOrFilled'));
	},
);

const OptionSchema = v.object({
	id: v.pipe(v.union([v.string(), v.number()])),
	label: v.string(),
});

const isNotEmpty = v.custom<v.InferInput<typeof OptionSchema>>(
	(input) => {
		if (!input) return false;

		const isValid = Object.values(input ?? {})
			.map((value) => (String(value) ?? '').toString().trim())
			.every(Boolean);

		return isValid;
	},
	() => t(getKey('required')),
);

export const SettingsFormSchema = v.object({
	paymentAccounts: v.optional(v.array(v.pipe(PaymentAccountSchema, validateFields))),
	funnel: v.pipe(OptionSchema, isNotEmpty),
	stage: v.pipe(OptionSchema, isNotEmpty),
});
export type SettingsFormValues = v.InferInput<typeof SettingsFormSchema>;
