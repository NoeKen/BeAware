import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {ToastAndroid} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import Config from '../constants/config';
import Api from '../lib/api';
import {getFeaturedImageUrl} from '../lib/images';
import pagination from '../lib/pagination';
import {stripHtml, ucfirst} from '../lib/string';
import initialState from '../store/expenses';

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
  namespace: 'expense',

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
    async addExpensesList(payload = {}, rootState) {
      console.log('rootState: ', rootState);
      try {
        db.transaction(function (txn) {
          // txn.executeSql('DROP TABLE IF EXISTS Categories', []);
          // txn, executeSql('DROP DATABASE IF EXISTS beAware.db');
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS Categories(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), image VARCHAR(255), description VARCHAR(255),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
            [],
          );
          txn.executeSql(
            'INSERT INTO Categories (name,image,description) VALUES (:name,:image,:description)',
            // 'INSERT INTO Categories (title,amount,description,created_at) VALUES (:title,:amount,:description,:created_at)',
            [
              rootState.categories.category.name,
              rootState.categories.category.image,
              rootState.categories.category.description,
            ],
          );
        });
        // navigation.navigate('Home');
        ToastAndroid.show('category created successfully', ToastAndroid.LONG);
        console.log('category created');
      } catch (error) {
        // setReqError(`An error occurred saving the category : ${error.message}`);
        console.error('error occurred: ', error);
        ToastAndroid.show(
          'An expected error ocurred when creating category',
          ToastAndroid.LONG,
        );
      }
    },
    async getCategories(payload = {}, rootState) {
      try {
        db.transaction(txn => {
          txn.executeSql(
            'select * from Categories',
            // 'select * from Categories ORDER BY date(created_at)',
            [],
            (txn, res) => {
              var len = res.rows.length;
              var cat = [];
              if (len > 0) {
                for (let i = 0; i < len; ++i) {
                  cat.push(res.rows.item(i));
                  console.log(
                    '<=====> category: <==========> ',
                    res.rows.item(i),
                  );
                }
              }
              dispatch.categories.replaceCategories(cat);
              // setCategories(cat);
            },
          );
        });
      } catch (error) {
        console.error('error occurred: ', error);
        ToastAndroid.show(
          'An expected error ocurred when creating category',
          ToastAndroid.LONG,
        );
      }
    },
  }),

  /**
   * Reducers
   */
  reducers: {
    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replace(state, payload) {
      let newList = null;
      const {data, headers, page} = payload;

      // Loop data array, saving items in a usable format
      if (data && typeof data === 'object') {
        newList = data.map(item => transform(item));
      }

      // Create our paginated and flat lists
      const listPaginated =
        page === 1
          ? {[page]: newList}
          : {...state.listPaginated, [page]: newList};
      const listFlat =
        Object.keys(listPaginated)
          .map(k => listPaginated[k])
          .flat() || [];

      return newList
        ? {
            ...state,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? {[page]: moment().format()}
                : {...state.lastSync, [page]: moment().format()},
            meta: {
              page,
              lastPage: parseInt(headers['x-wp-totalpages'], 10) || null,
              total: parseInt(headers['x-wp-total'], 10) || null,
            },
            pagination: pagination(headers['x-wp-totalpages'], '/articles/'),
          }
        : initialState;
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceExpensesList(state, payload) {
      return {
        ...state,
        expensesList: payload,
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
    replaceRegisterBasic(state, payload) {
      return {
        ...state,
        registerBasic: payload,
      };
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceSignupInput(state, payload) {
      return {
        ...state,
        signupInput: payload,
      };
    },
    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceSignupPerson(state, payload) {
      return {
        ...state,
        signupPersonInput: payload,
      };
    },
    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceSignupEnterprise(state, payload) {
      return {
        ...state,
        signupEnterpriseInput: payload,
      };
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceCurrentUser(state, payload) {
      return {
        ...state,
        currentUser: payload,
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
