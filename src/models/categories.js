import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {ToastAndroid} from 'react-native';
import Config from '../constants/config';
import Api from '../lib/api';
import {getFeaturedImageUrl} from '../lib/images';
import pagination from '../lib/pagination';
import {stripHtml, ucfirst} from '../lib/string';
import initialState from '../store/categories';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

/**
 * Transform the endpoint data structure into our redux store format
 * @param {obj} item
 */
const transform = item => ({
  id: item.id || 0,
  name:
    item.title && item.title.rendered
      ? ucfirst(stripHtml(item.title.rendered))
      : '',
  content:
    item.content && item.content.rendered
      ? stripHtml(item.content.rendered)
      : '',
  contentRaw: item.content && item.content.rendered,
  excerpt:
    item.excerpt && item.excerpt.rendered
      ? stripHtml(item.excerpt.rendered)
      : '',
  date: moment(item.date).format(Config.dateFormat) || '',
  slug: item.slug || null,
  link: item.link || null,
  image: getFeaturedImageUrl(item),
});

export default {
  namespace: 'categories',

  /**
   *  Initial state
   */
  state: initialState,
  /**
   * Effects/Actions
   */
  effects: dispatch => ({
    /**
     * Get a list from the API
     * @param {obj} rootState
     * @returns {Promise}
     */
    async deleteCategory(payload={},rootState ){
      const tab= rootState.categories.categories;
      const index = tab.findIndex(item => item.id === payload);
      if (index !== -1) {
        tab.splice(index, 1);
        ToastAndroid.show('Item was successfully deleted',ToastAndroid.LONG);
        dispatch.categories.replaceCategories(tab)
        navigation.refresh();
      } else {
        ToastAndroid.show('Item was not deleted',ToastAndroid.LONG);
        console.log(`item with id ${id} was not found`);
      }
    },
  }),

  /**
   * Reducers
   */
  reducers: {
   

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceCategory(state, payload) {
      return {
        ...state,
        category: payload,
      };
    },
    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceCategories(state, payload) {
      return {
        ...state,
        categories: payload,
      };
    },

    
    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceIsLogged(state, payload) {
      return {
        ...state,
        isLogged: payload,
      };
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceIsRegistered(state, payload) {
      return {
        ...state,
        isRegistered: payload,
      };
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceIsFullRegistration(state, payload) {
      return {
        ...state,
        isFullRegistration: payload,
      };
    },
    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceDeviceToken(state, payload) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          device_tokens: payload,
        },
      };
    },
  },
};
