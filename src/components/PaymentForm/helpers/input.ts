export function allowDigitsOnly(event: React.KeyboardEvent) {
	const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

	if (allowedKeys.includes(event.key)) return;

	const input = event.target as HTMLInputElement;
	const currentValue = input.value;
	const key = event.key;

	const isDigit = /^\d$/.test(key);
	const isDotOrComma = key === '.' || key === ',';
	const alreadyHasSeparator = currentValue.includes('.') || currentValue.includes(',');

	if (isDigit) {
		return;
	}

	if (isDotOrComma && !alreadyHasSeparator) {
		return;
	}

	event.preventDefault();
}
