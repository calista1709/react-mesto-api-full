export const BASE_URL = 'https://api.calista709.nomoredomainsclub.ru';

export function apiConfig() {
	return {
		baseUrl: 'https://api.calista709.nomoredomainsclub.ru',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('jwt')}`,
		}
	}
};
