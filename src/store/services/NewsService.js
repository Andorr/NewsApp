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
            return data;
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
            return data;
        });
    }

    // Get news created by user
    fetchNewsByUser = (userId: string, callback: Function) => {
        const response = API.getNewsByUser(userId).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Creates a news item
    createNewsItem = (item: Object, callback: Function) => {
        const response = API.createNews(item).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Create a news item with file upload
    createNewsItemWithFile = (item: Object, callback: Function) => {
        const response = API.createNewsWithFile(item).response();
        response.onreadystatechange = () => {
            console.log(response);
            console.log(response.status);
            if(response.status >= 200 && response.status <= 508) {
                let responseData = response.response;
                responseData = responseData ? JSON.parse(responseData) : null; // Convert response to JSON-Object
                !callback || callback(response.status === 201, responseData);
            }
        }
        
    }

    // Update a news item
    updateNewsItem = (id: string, item: Object, callback: Function) => {
        const response = API.updateNews(id, item).response();
        return response.then((data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Delete a news item
    deleteNewsItem = (id: string, callback: Function) => {
        const response = API.deleteNews(id).response();
        return response.then((isError, data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Comments on a news item
    createComment = (id: string, comment: string, callback: Function) => {
        const dataItem: Object = {news: id, comment: comment};

        const response = API.createNewsComment(dataItem).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Delete comment
    deleteComment = (newsId: string, commentId: string, callback: Function) => {
        const response = API.deleteNewsComment(newsId, commentId).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Update comment
    updateComment = (newsId: string, commentId: string, comment: string, callback: Function) => {
        const response = API.updateNewsComment(newsId, commentId, comment).response();
        response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Like a post
    onLikePost = (id: string, callback: Function) => {
        const response = API.voteNews(id).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Get categories
    getCategories = (callback: Function) => {
        const response = API.getCategories().response();
        response.then((data) => {
            const categories: Array<string> = data.categories;
            store.dispatch(NewsActions.setCategories(categories));
            !callback || callback(response.isError, categories);
            return categories;
        });
    }
}

export default new NewsService();