export interface IDealEmail {
	id: string;
	main: boolean;
	sort: string;
	type: string;
}

export interface IDealContact {
	id: number;
	owner: number;
	phone: string;
	title: string;
	eamail: IDealEmail[];
}

export interface IDealAmount {
	currency: string;
	value: string;
}

export interface IDeal {
	contacts: IDealContact[];
	amount: IDealAmount;
}
