export const safe_string = (url: string) => {
	return url.replace(/[^a-zA-Z0-9]/g, '_');
};
