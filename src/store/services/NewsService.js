// @flow

import API from '../../api/api';
import store from '../store';

import * as NewsActions from '../actions/NewsActions';

class NewsService {

    // Fetch news
    fetchNews = (callback: Function) => {
        const response = API.getNews().response();
        response.then((data) => {
            if(response.isError === false) {
                store.dispatch(NewsActions.setNewsItems(data));
            }
            !callback || callback(response.isError, data);
        });
    }

    fetchNewsItem = (id: string, callback: Function) => {
        const response = API.getNewsById(id).response();
        response.then((data) => {
            !callback || callback(response.isError, data);
        });
    }

    createNewsItem = (item: Object, callback: Function) => {
        const response = API.createNews(item).response();
        response.then((data) => {
            !callback || callback(response.isError, data);
        });
    }
}

export default new NewsService();