
import { environment } from './environments/environment';

const devApi = '/api';
const prodApi = 'https://api.qiekenol.com';
const staticApi = 'https://admin.qiekenol.com';

let exportApi;

if (environment.production) {
  exportApi = prodApi;
} else {
  exportApi = devApi;
}

export const API_ROOT = exportApi;
export const STATIC_URL = staticApi;
