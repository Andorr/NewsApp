import reducer, {initialState} from '../../store/reducers/UserReducer';
import * as Actions from '../../store/actions/UserActions';
import {userData} from './testData';
import {keyBy} from 'lodash';

describe('Testing user-reducer', () => {

    // [SET_USER_INFO] Testing normal behavior
    it('[SET_USER_INFO] Testing normal behavior', () => {
        const data = userData;

        expect(reducer(initialState, {
            type: Actions.actions.SET_USER_INFO,
            payload: data,
        })).toEqual({
            email: data.email,
            nickname: data.nickname,
            id: data.id,
        });
    });
});