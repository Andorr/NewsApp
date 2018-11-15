import reducer, {initialState} from '../../store/reducers/NewsReducer';
import * as Actions from '../../store/actions/NewsActions';
import testData, {realData, categories} from './testData';
import {keyBy} from 'lodash';

describe('Testing news-reducer', () => {

    // [SET_NEWS_ITEM] Testing normal behavior
    it('[SET_NEWS_ITEMS] Testing normal behavior', () => {
        const data = testData;
        expect(reducer(initialState, {
                type: Actions.actions.SET_NEWS_ITEMS,
                payload: data
            }
        )).toEqual({
            categories: [],
            news: keyBy(data, 'id'),
        });
    });

    // [SET_NEWS_ITEMS] Testing null behavior
    it('[SET_NEWS_ITEMS] Testing null behavior', () => {
        expect(reducer({news: {}}, {
                type: Actions.actions.SET_NEWS_ITEMS,
                payload: null
            }
        )).toEqual({news: {}});
    });

    // [SET_NEWS_ITEM] Testing normal behavior
    it('[SET_NEWS_ITEM] Testing normal behavior', () => {
        const item = testData[0];
        expect(reducer({news: {}}, {
            type: Actions.actions.SET_NEWS_ITEM,
            payload: item,
        })).toEqual({
            news: {'1234': item}
        })
    });

    // [DELETE_NEWS_ITEM] Testing normal behavior
    it('[DELETE_NEWS_ITEM] Testing normal behavior', () => {
        const item = testData[0]; // Initial data
        expect(reducer({news: {
            [item.id]: item,
        }}, {
            type: Actions.actions.DELETE_NEWS_ITEM,
            payload: item.id, // Item to delete
        })).toEqual({
            news: {}, // Result
        })
    });

    // [SET_COMMENT_ITEM] Testing normal behavior
    it('[SET_COMMENT_ITEM] Testing normal behavior', () => {
        const comment = {_id: '12345', comment: 'Test comment'}; // New comment

        const item = realData[0];
        const newItem = JSON.parse(JSON.stringify(item)); // Deep copy of news item
        newItem.comments.unshift(comment); // The expected result

        expect(reducer({news: {[item.id]: item}}, {
            type: Actions.actions.SET_COMMENT_ITEM,
            payload: comment,
            id: item.id, // News id
        })).toEqual({
            news: {[newItem.id]: newItem}, // Expected result
        });
    });

    it('[DELETE_COMMENT_ITEM] Testing normal behavior', () => {
        // Init data
        const item = realData[0];
        const commentId = item.comments[0]._id;
        const newsId = item.id;

        // Expected result
        const newItem = JSON.parse(JSON.stringify(item)); // Deep copy
        newItem.comments.splice(0, 1);

        expect(reducer({news: {[item.id]: item}}, {
            type: Actions.actions.DELETE_COMMENT_ITEM,
            payload: commentId,
            id: newsId,
        })).toEqual({
            news: {[newItem.id]: newItem}
        })
    });

    // [SET_CATEGORIES] Testing normal behavior
    it('[SET_CATEGORIES] Testing normal behavior', () => {
        // Init data
        const data = categories;

        expect(reducer({categories: []}, {
            type: Actions.actions.SET_CATEGORIES,
            payload: data,
        })).toEqual({
            categories: data,
        });
    });
});