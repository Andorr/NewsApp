// @flow

export type Match = {
    params: Object,
    isExact: boolean,
    path: string,
    url: string,
};

export type UserInfo = {
    id: string,
    nickname: string,
    email: string,
    image: ?string,
}