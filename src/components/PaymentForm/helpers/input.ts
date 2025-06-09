export const createDigitsHandler =
	({ maxDecimal }: { maxDecimal: number }) =>
	(event: React.KeyboardEvent) => {
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

		if (allowedKeys.includes(event.key)) return;

		const input = event.target as HTMLInputElement;
		const currentValue = input.value;
		const key = event.key;

		const isDigit = /^\d$/.test(key);
		const isDotOrComma = key === '.' || key === ',';
		const separator = currentValue.includes('.') ? '.' : currentValue.includes(',') ? ',' : null;

		if (isDigit) {
			if (separator) {
				const separatorIndex = currentValue.indexOf(separator);
				const cursorPos = input.selectionStart ?? 0;

				// Check if the cursor is after the separator
				if (cursorPos > separatorIndex) {
					const decimals = currentValue.split(separator)[1] || '';
					if (decimals.length >= maxDecimal) {
						event.preventDefault();
						return;
					}
				}
			}
			return;
		}

		if (isDotOrComma && !separator) {
			return;
		}

		event.preventDefault();
	};
