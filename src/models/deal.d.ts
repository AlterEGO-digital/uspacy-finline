export interface IDealEmail {
	id: string;
	main: boolean;
	sort: string;
	type: string;
	value: string;
}

export interface IContactPhone {
	id: string;
	type: string;
	value: string;
	main: boolean;
	sort: string;
}

export interface IDealContact {
	id: number;
	owner: number;
	phone: IContactPhone[] | string;
	title: string;
	email: IDealEmail[] | string;
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
