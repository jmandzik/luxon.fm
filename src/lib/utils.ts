export const safe_string = (url: string) => {
	return url.replace(/[^a-zA-Z0-9]/g, '_');
};

export const localized_date = (date: number) =>
	new Intl.DateTimeFormat({
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(date * 1000));
