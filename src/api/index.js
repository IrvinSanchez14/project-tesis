import axios from 'axios';
import Base64 from 'base-64';

const tok = 'irvin:$apr1$jNfr1l1x$qoNoVU.gC2Pukdznj5Ovw/';
const hash = Base64.encode(tok);
const Basic = 'Basic ' + hash;

export default axios.create({
	baseURL: 'http://localhost:8080/api-jws/api',

	headers: { 'Content-Type': 'application/json', Authorization: Basic },
});
