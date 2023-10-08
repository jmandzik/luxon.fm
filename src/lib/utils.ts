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
