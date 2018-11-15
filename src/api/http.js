// @flow
import Cookies from 'universal-cookie';

export const BASE: string = 'https://sys-ut-news-api.herokuapp.com/'; //'http://localhost:8080/'; //''; // ;
const TOKEN_HEADER_NAME: string = 'Authorization';
const TOKEN_COOKIE_ID: string = 'access_token';
const cookies: Cookies = new Cookies();

export class IRequest {

    method: string;
    data: ?Object;
    headers: Object;
    url: string;

    constructor(method: string, url: string, data: ?Object={}, args: ?Object={}, withAuth: bool=true) {
        this.method = method;
        this.data = data;
        this.headers = {'Content-Type': 'application/json'};
        this.url = BASE + url;

        if (withAuth) {
            this.headers[TOKEN_HEADER_NAME] = 'Bearer ' + TOKEN.get();
        }

        for (const key in args) {
            this.headers[key] = args[key];
        }
    }

    response(): IResponse {
        if (this.method === 'GET') {
            return new IResponse(getRequest(this.method, this.url, this.headers));
        }
        else if (this.method === 'POST_FILE') {
            return new IResponse(formRequest('POST', this.url, this.headers, this.data));
        }
        else if (this.method === 'PUT_FILE') {
            return new IResponse(formRequest('PUT', this.url, this.headers, this.data));
        }
        else {
            return new IResponse(request(this.method, this.url, this.headers, this.data));
        }
    }
}

class IResponse {
    response: Promise<any>;
    isError: bool;
    status: number;

    constructor(response: Promise<any>) {
        this.response = response.then((data) => {
            if (!data) {
                data = {};
            }

            this.isError = !data.ok;
            this.status = data.status;
            
            return (data.json)? data.json() : data;
        }).catch((error) => console.log(error));
    }

    then(method: Function) {
        return this.response.then(method);
    }
}

const request = (method: string, url: string, headers: Object, data: ?Object): Promise<any> => {
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    })
    .catch((error) => console.log(error));
};

const getRequest = (method: string, url: string, headers: Object): Promise<any> => {
    return fetch(url, {
        method: method,
        headers: headers,
    })
    .catch((error) => console.log(error));
};



export const formRequest = (method: string, url: string, headers: Object, data: ?Object): Promise<any> => {
    // Set data
    let formData: FormData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }

    delete headers['Content-Type']

    return fetch(url, {
        method: method,
        headers: headers,
        body: formData
    })
    .catch((error) => console.log(error));
};



export class Token {
    set(token: string, expires_in: number =3600): void {
        cookies.set(TOKEN_COOKIE_ID, token, {path: '/', expires: new Date(Date.now() + expires_in*1000)});
    }

    get(): string {
        return cookies.get(TOKEN_COOKIE_ID);
    }

    remove(): void {
        cookies.remove(TOKEN_COOKIE_ID, {path: '/'});
    }
}

export const TOKEN: Token = new Token();