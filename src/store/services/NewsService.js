// @flow

import API from '../../api/api';
import store from '../store';

import * as NewsActions from '../actions/NewsActions';

class NewsService {

    // Fetch news
    fetchNews = (callback: Function) => {
        const response = API.getNews().response();
        response.then((data: Object) => {
            if(response.isError === false) {
                store.dispatch(NewsActions.setNewsItems(data));
            }
            !callback || callback(response.isError, data);
        });
    }

    // Gets a specific news item based on id
    fetchNewsItem = (id: string, callback: Function) => {
        const response = API.getNewsById(id).response();
        response.then((data: Object) => {
            !callback || callback(response.isError, data);
        });
    }

    // Creates a news item
    createNewsItem = (item: Object, callback: Function) => {
        const response = API.createNews(item).response();
        response.then((data: Object) => {
            !callback || callback(response.isError, data);
        });
    }

    // Comments on a news item
    createComment = (id: string, comment: string, callback: Function) => {
        const dataItem: Object = {news: id, comment: comment};

        const response = API.createNewsComment(dataItem).response();
        response.then((data: Object) => {
            !callback || callback(response.isError, data);
        });
    }
}

export default new NewsService();