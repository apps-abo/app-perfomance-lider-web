import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
	rejectUnauthorized: !!process.env.NEXT_REJECT_UNAUTHORIZED,
});

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	httpsAgent,
	headers: {
		'Content-Type': 'application/json'
	},
});
