import axios from 'axios';
import Cookies from 'universal-cookie';
import setTokenInCookie from '../src/utils/helpers/setTokenInCookie';

const cookie = new Cookies();

export const axiosPrivate = axios.create({
	baseURL: '/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

axiosPrivate.interceptors.request.use(
	async (config) => {
		const accessToken = cookie.get('accessToken');

		if (!accessToken) {
			await axios('https://backend-test-gilt-eta.vercel.app/api/users/swap', {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			})
				.then((response) => {
					const newaccessToken = response?.data?.accessToken;
					setTokenInCookie('accessToken', newaccessToken);
					config.headers.Authorization = newaccessToken;
				})
				.catch((error) => {
					window.location.replace('/login');
				});
		} else {
			config.headers.Authorization = accessToken;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.data?.code === '401') {
			window.location.replace('/login');
		}
		return Promise.reject(error);
	}
);

