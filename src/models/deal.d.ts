export interface IDealEmail {
	id: string;
	main: boolean;
	sort: string;
	type: string;
	value: string;
}

export interface IDealContact {
	id: number;
	owner: number;
	phone: string;
	title: string;
	email: IDealEmail[];
}

export interface IDealAmount {
	currency: PaymentCurrencyEnum;
	value: string;
}

export interface IDeal {
	contacts: IDealContact[];
	amount: IDealAmount;
	id: string;
}
