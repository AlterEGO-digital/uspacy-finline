import { array, custom, InferInput, nonEmpty, object, optional, pipe, string, trim } from 'valibot';

const t = (key: string) => key;
const getKey = (path: string) => `validation:common.${path}`;

const posSchema = object({
	posId: pipe(string(), trim()),
	endpointsKey: pipe(string(), trim()),
	label: pipe(string(), trim()),
});

const validateFields = custom<InferInput<typeof posSchema>>(
	(item) => {
		if (!item) return true;
		const values = Object.values(item).map((v) => (v ?? '').toString().trim());

		const allEmpty = values.every((v) => v === '');
		const allFilled = values.every((v) => v !== '');
		return allEmpty || allFilled;
	},
	() => {
		return t(getKey('optionalOrFilled'));
	},
);

export const SettingsFormSchema = object({
	apiKey: pipe(string(t(getKey('invalidString'))), trim(), nonEmpty(t(getKey('required')))),
	apiSecret: pipe(string(t(getKey('invalidString'))), trim(), nonEmpty(t(getKey('required')))),
	paymentAccounts: optional(array(pipe(posSchema, validateFields))),
});

export type SettingsFormValues = InferInput<typeof SettingsFormSchema>;
