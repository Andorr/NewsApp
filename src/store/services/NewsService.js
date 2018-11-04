// @flow

import API from '../../api/api';
import store from '../store';

import * as NewsActions from '../actions/NewsActions';

class NewsService {

    // Fetch news
    fetchNews = (callback: Function) => {
        const response = API.getNews().response();
        return response.then((data: Object) => {
            if(response.isError === false) {
                store.dispatch(NewsActions.setNewsItems(data)); // Add to store
            }
            !callback || callback(response.isError, data);
        });
    }

    // Gets a specific news item based on id
    fetchNewsItem = (id: string, callback: Function) => {
        const response = API.getNewsById(id).response();
        return response.then((data: Object) => {
            if(response.isError === false) {
                store.dispatch(NewsActions.setNewsItem(data)); // Add to store
            }
            !callback || callback(response.isError, data);
        });
    }

    // Get news created by user
    fetchNewsByUser = (userId: string, callback: Function) => {
        const response = API.getNewsByUser(userId).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
        });
    }

    // Creates a news item
    createNewsItem = (item: Object, callback: Function) => {
        const response = API.createNews(item).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
        });
    }

    // Update a news item
    updateNewsItem = (id: string, item: Object, callback: Function) => {
        const response = API.updateNews(id, item).response();
        return response.then((data) => {
            !callback || callback(response.isError, data);
        });
    }

    // Delete a news item
    deleteNewsItem = (id: string, callback: Function) => {
        const response = API.deleteNews(id).response();
        return response.then((isError, data) => {
            !callback || callback(response.isError, data);
        });
    }

    // Comments on a news item
    createComment = (id: string, comment: string, callback: Function) => {
        const dataItem: Object = {news: id, comment: comment};

        const response = API.createNewsComment(dataItem).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
        });
    }

    // Like a post
    onLikePost = (id: string, callback: Function) => {
        const response = API.voteNews(id).response();
        return response.then((data) => {
            !callback || callback(response.isError, data);
        });
    }
}

export default new NewsService();