import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost/tesis/api-jws/api',
	headers: { 'Content-Type': 'application/json' },
});
