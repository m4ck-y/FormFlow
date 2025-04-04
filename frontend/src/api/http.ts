import { ApiResponse } from "../types/apis";

const BASE_URL = import.meta.env.VITE_IP_BACKEND_MAIN;

const DEFAULT_HEADERS: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
};

/**
 * Obtiene el token de autenticación del localStorage
 */
const getAuthToken = (): string | null => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).token.access_token : null;
    } catch {
        return null;
    }
};

/**
 * Construye las cabeceras de la petición
 */
const buildHeaders = (requireAuth: boolean = false): HeadersInit => {
    const headers = { ...DEFAULT_HEADERS };
    
    if (requireAuth) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    
    return headers;
};

/**
 * Procesa la respuesta de la API
 */
const processResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    const data = await response.json() as T;
    
    return {
        error: response.status !== 200 ? new Error(`${response.status}: ${response.statusText}`) : null,
        value: data,
        status: response.status
    };
};

/**
 * Construye los parámetros de la petición
 */
const buildRequestOptions = (
    method: string,
    params: any = {},
    requireAuth: boolean = false
): RequestInit => {
    const options: RequestInit = {
        method,
        headers: buildHeaders(requireAuth)
    };

    if (method !== 'GET' && Object.keys(params).length > 0) {
        options.body = JSON.stringify(params);
    }

    return options;
};

/**
 * Realiza una solicitud HTTP a la API.
 *
 * @param {string} url - La ruta de la API a la que se hará la solicitud.
 * @param {Record<string, string | number>} [params={}] - Un objeto que contiene los parámetros de consulta para la solicitud `GET`.
 *                                       Estos parámetros serán convertidos a una cadena de consulta y añadidos a la URL.
 *                                       Debes pasar un objeto clave-valor, donde las claves son los nombres de los parámetros y los valores son los valores correspondientes.
 *                                       Ejemplo: `{ userId: 123, limit: 10 }` se convierte en `userId=123&limit=10`.
 * @param {string} [method='GET'] - El método HTTP a utilizar (por defecto es 'GET'). Puedes usar otros métodos como 'POST', 'PUT', etc.
 * @param {boolean} [requireAuth=false] - Indica si la solicitud requiere autenticación. Si es `true`, se incluirá un encabezado de autorización.
 * 
 * @returns {Promise<ApiResponse<T>>} - Un objeto `Promise` que resuelve en la respuesta de la API con el tipo genérico `T` dependiendo de lo que se haya solicitado.
 * 
 * @example
 * // Ejemplo de llamada a la función con parámetros:
 * const url = "/api/items";
 * const params = { userId: 123, limit: 10 };
 * fetchApi(url, params)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 *
 * // Esto generará una URL como:
 * // https://example.com/api/items?userId=123&limit=10
 */
async function fetchApi<T>(
    url: string,
    params: any = {},
    method: string = 'GET',
    requireAuth: boolean = false
): Promise<ApiResponse<T>> {
    const options = buildRequestOptions(method, params, requireAuth);
    const fullUrl = method === 'GET' && Object.keys(params).length > 0
        ? `${BASE_URL}${url}?${new URLSearchParams(params)}`
        : `${BASE_URL}${url}`;

    console.log("params:", params, "URLSearchParams:", new URLSearchParams(params).toString(), "fullUrl", fullUrl);

    try {
        const response = await fetch(fullUrl, options);
        return await processResponse<T>(response);
    } catch (error) {
        return {
            error: error instanceof Error ? error : new Error('Unknown error'),
            value: null,
            status: null
        };
    }
}

// Métodos HTTP exportados
export const http = {
    /**
     * Realiza una solicitud `GET` a la API utilizando los parámetros proporcionados.
     *
     * @param {string} url - La ruta del endpoint de la API a la que se hará la solicitud.
     * @param {Record<string, string | number>} [params={}] - Un objeto que contiene los parámetros de consulta para la solicitud `GET`.
     *                                       Este objeto se convertirá a una cadena de consulta y se añadirá a la URL.
     *                                       Ejemplo: `{ userId: 123, limit: 10 }` se convierte en `userId=123&limit=10`.
     * @param {boolean} [requireAuth=false] - Indica si la solicitud requiere autenticación. Si es `true`, se incluirá un encabezado de autorización.
     * 
     * @returns {Promise<ApiResponse<T>>} - Una promesa que resuelve con la respuesta de la API, del tipo `T` según la API.
     * 
     * @example
     * // Llamada a la función `get` con parámetros:
     * const url = "/api/items";
     * const params = { userId: 123, limit: 10 };
     * http.get(url, params)
     *   .then(response => console.log(response))
     *   .catch(error => console.error(error));
     * 
     * // Esto generará una URL como:
     * // https://example.com/api/items?userId=123&limit=10
     */
    get: <T>(url: string, params = {}, requireAuth = false) => 
        fetchApi<T>(url, params, 'GET', requireAuth),
    
    post: <T>(url: string, params = {}, requireAuth = false) => 
        fetchApi<T>(url, params, 'POST', requireAuth),
    
    put: <T>(url: string, params = {}, requireAuth = false) => 
        fetchApi<T>(url, params, 'PUT', requireAuth),
    
    delete: <T>(url: string, params = {}, requireAuth = false) => 
        fetchApi<T>(url, params, 'DELETE', requireAuth)
};
