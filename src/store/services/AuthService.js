// @flow

import {AUTH} from '../../api/api';
import {TOKEN} from '../../api/http';
import store from '../store';
import ws from '../../api/ws';

import * as UserActions from '../actions/UserActions';

class AuthService {

    // Create Account
    createAccount(email: string, password: string, nickname: string, callback: ?Function) {
        const response = AUTH.createAccount(email.trim().toLowerCase(), password, nickname).response();
        return response.then((data) => {
            if(response.isError === false) {
                store.dispatch(UserActions.setUserInfo(data));
            }
            !callback || callback(response.isError, data);
        });
    }

    // Login
    login(email: string, password: string, callback: ?Function) {
        const response = AUTH.token(email.trim().toLowerCase(), password).response();
        return response.then((data) => {
            if(response.isError === false && data.token) {
                TOKEN.set(data.token);
                this.fetchUserInfo();
            }
            !callback || callback(response.isError === true, data);
        });
    }

    // Fetches user information (email and nickname)
    fetchUserInfo(callback: ?Function) {
        const response = AUTH.fetchUser().response();
        return response.then((data) => {
            if(response.isError === false) {
                store.dispatch(UserActions.setUserInfo(data));
                ws.sendAuth(data._id);
            }
            !callback || callback(response.isError === true, data);
        });
    }

    isAuthorized() {
        return TOKEN.get() !== undefined;
    }

    logout() {
        TOKEN.remove();
        store.dispatch(UserActions.setUserInfo({}));
    }
}

export default new AuthService();