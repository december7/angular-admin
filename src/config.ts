
import { environment } from './environments/environment';

const devApi = '/api';
const prodApi = 'http://localhost:8000';
const staticApi = 'http://localhost:8000';

let exportApi;

if (environment.production) {
  exportApi = prodApi;
} else {
  exportApi = devApi;
}

export const API_ROOT = exportApi;
export const STATIC_URL = staticApi;
