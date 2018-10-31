import Cookies from 'universal-cookie';

export const BASE = 'https://sys-ut-news-api.herokuapp.com/'; //'http://localhost:8080/';
const TOKEN_HEADER_NAME = 'Authorization';
const TOKEN_COOKIE_ID = 'access_token';
const cookies = new Cookies();

export class IRequest {
    constructor(method, url, data={}, args={}, withAuth=true) {
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

    response() {
        if (this.method === 'GET') {
            return new IResponse(getRequest(this.method, this.url, this.headers, this.data));
        } else {
            return new IResponse(request(this.method, this.url, this.headers, this.data));
        }
    }
}

class IResponse {
    constructor(response) {
        this.response = response.then((data) => {
            if (!data) {
                data = {};
            }

            this.isError = !data.ok;
            this.status = data.status;
            
            return (data.json)? data.json() : data;
        }).catch((error) => console.log(error));
    }

    then(method) {
        return this.response.then(method);
    }
}

const request = (method, url, headers, data) => {
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    })
    .catch((error) => console.log(error));
};

const getRequest = (method, url, headers) => {
    return fetch(url, {
        method: method,
        headers: headers,
    })
    .catch((error) => console.log(error));
};

export class Token {
    set(token, expires_in=3600) {
        cookies.set(TOKEN_COOKIE_ID, token, {path: '/', expires: new Date(Date.now() + expires_in*1000)});
    }

    get() {
        return cookies.get(TOKEN_COOKIE_ID);
    }

    remove() {
        cookies.remove(TOKEN_COOKIE_ID, {path: '/'});
    }
}

export const TOKEN = new Token();
