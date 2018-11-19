// @flow

import API from '../../api/api';
import store from '../store';

import * as NewsActions from '../actions/NewsActions';

class NewsService {

    // Fetch news
    fetchNews = (callback: ?Function): Promise<Array<Object>> => {
        const response = API.getNews().response();
        return response.then((data: Array<Object>) => {
            if(response.isError === false) {
                store.dispatch(NewsActions.setNewsItems(data)); // Add to store
            }
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Gets a specific news item based on id
    fetchNewsItem = (id: string, callback: ?Function): Promise<Object> => {
        const response = API.getNewsById(id).response();
        return response.then((data: Object) => {
            if(response.isError === false) {
                store.dispatch(NewsActions.setNewsItem(data)); // Add to store
            }
            !callback || callback(response.isError, data);
            return data;
        });
    }

    fetchNewsWithParams = (params: Object, callback: ?Function): Promise<Array<Object>> => {
        const response = API.getNewsWithParams(params).response();
        return response.then((data: Array<Object>) => {
            if(response.isError === false) {
                store.dispatch(NewsActions.setNewsItems(data));
            }
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Get news created by user
    fetchNewsByUser = (userId: string, callback: ?Function): Promise<Array<Object>> => {
        const response = API.getNewsByUser(userId).response();
        return response.then((data: Array<Object>) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Get news by category
    fetchNewsByCategory = (category: string, callback: ?Function): Promise<Array<Object>> => {
        const response = API.getNewsByCategory(category).response();
        return response.then((data: Array<Object>) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Creates a news item
    createNewsItem = (item: Object, callback: ?Function): Promise<Object> => {
        const response = API.createNews(item).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Create a news item with file upload
    createNewsItemWithFile = (item: Object, callback: ?Function): Promise<Object> => {
        const response = API.createNewsWithFile(item).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        })
    }

    // Update a news item
    updateNewsItem = (id: string, item: Object, callback: ?Function): Promise<Object> => {
        const response = API.updateNews(id, item).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Update a news item with file upload
    updateNewsItemWithFile = (id: string, item: Object, callback: ?Function): Promise<Object> => {
        const response = API.updateNewsWithFile(id, item).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Delete a news item
    deleteNewsItem = (id: string, callback: ?Function): Promise<Object> => {
        const response = API.deleteNews(id).response();
        return response.then((isError, data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Comments on a news item
    createComment = (id: string, comment: string, callback: ?Function): Promise<Object> => {
        const dataItem: Object = {news: id, comment: comment};

        const response = API.createNewsComment(dataItem).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Delete comment
    deleteComment = (newsId: string, commentId: string, callback: ?Function): Promise<Object> => {
        const response = API.deleteNewsComment(newsId, commentId).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Update comment
    updateComment = (newsId: string, commentId: string, comment: string, callback: ?Function): Promise<Object> => {
        const response = API.updateNewsComment(newsId, commentId, comment).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Like a post
    onLikePost = (id: string, callback: ?Function): Promise<Object> => {
        const response = API.voteNews(id).response();
        return response.then((data: Object) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // Get categories
    getCategories = (callback: ?Function): Promise<Array<string>> => {
        const response = API.getCategories().response();
        return response.then((data: Object) => {
            const categories: Array<string> = data.categories || [];
            store.dispatch(NewsActions.setCategories(categories));
            !callback || callback(response.isError, categories);
            return categories;
        });
    }
}

export default new NewsService();