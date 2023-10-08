export const safe_string = (url: string) => {
	return url.replace(/[^a-zA-Z0-9]/g, '_');
};

export const localized_date = (date: number) =>
	new Intl.DateTimeFormat({
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(date * 1000));

export function format_duration(seconds: number): string {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	let formatted = '';

	if (hrs > 0) {
		formatted += `${hrs}h `;
	}

	if (mins > 0 || hrs > 0) {
		formatted += `${mins}m `;
	}

	formatted += `${secs}s`;

	return formatted.trim();
}

export function debounce(func: Function, wait: number): Function {
	let timeoutId: NodeJS.Timeout | null = null;

	return (...args: any[]) => {
		const context = this;

		const executeFunction = () => {
			func.apply(context, args);
			timeoutId = null;
		};

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(executeFunction, wait);
	};
}

export function throttle(func: Function, limit: number): Function {
	let lastFunc: NodeJS.Timeout;
	let lastRan: number;

	return function (...args: any[]) {
		const context = this;

		if (!lastRan) {
			func.apply(context, args);
			lastRan = Date.now();
		} else {
			clearTimeout(lastFunc);

			lastFunc = setTimeout(
				function () {
					if (Date.now() - lastRan >= limit) {
						func.apply(context, args);
						lastRan = Date.now();
					}
				},
				limit - (Date.now() - lastRan)
			);
		}
	};
}
