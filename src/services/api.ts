import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
	rejectUnauthorized: !!process.env.NEXT_REJECT_UNAUTHORIZED,
});

export const api = axios.create({
	baseURL:'http://localhost:5137/',
	httpsAgent,
	headers: {
		'Content-Type': 'application/json',
	},
});
