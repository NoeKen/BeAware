import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { ToastAndroid } from 'react-native';
import Config from '../constants/config';
import Api from '../lib/api';
import { getFeaturedImageUrl } from '../lib/images';
import pagination from '../lib/pagination';
import { stripHtml, ucfirst } from '../lib/string';
import initialState from '../store/categories';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

/**
 * Transform the endpoint data structure into our redux store format
 * @param {obj} item
 */
const transform = (item) => ({
  id: item.id || 0,
  name: item.title && item.title.rendered ? ucfirst(stripHtml(item.title.rendered)) : '',
  content: item.content && item.content.rendered ? stripHtml(item.content.rendered) : '',
  contentRaw: item.content && item.content.rendered,
  excerpt: item.excerpt && item.excerpt.rendered ? stripHtml(item.excerpt.rendered) : '',
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
  effects: (dispatch) => ({
    /**
     * Get a list from the API
     * @param {obj} rootState
     * @returns {Promise}
     */
    async getCategories(payload = {}, rootState) {
        if (rootState.amount === '' || rootState.title === '') {
            ToastAndroid.show('there is at least one obligated field empty', ToastAndroid.LONG);
            return;
          }
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
                [category.name,category.image,category.description],
                );
              });
            navigation.navigate('Home');
            ToastAndroid.show('category created successfully', ToastAndroid.LONG);
            console.log('category created');
          } catch (error) {
            // setReqError(`An error occurred saving the category : ${error.message}`);
            console.log('error occurred: ', error);
          }
      
      
      
      
        try {
        const result = await Api.post('auth/signin', rootState.auth.loginInput);
        AsyncStorage.setItem('@Auth:token', result.data.data.token);
        console.log('token', result.data.data.token);
        const res = await Api.get('auth/me',{params:{
          include : 'rating',
        }});
        const { data } = res;
        console.log(res);
        dispatch.auth.replaceCurrentUser(data.data.user);
        dispatch.auth.replaceIsLogged(true);
        ToastAndroid.show('login succeeded', ToastAndroid.LONG);
      } catch (error) {
        ToastAndroid.show('login failed with this error:', ToastAndroid.LONG);
        console.log('login error =>', error);
        console.log('login error.response =>', error.response);
        console.log('login error.message =>', error.message);
      }
    },

    async doSignup(payload = {}, rootState) {
      try {
        const result = await Api.post('auth/signup', rootState.auth.signupInput);
        console.log('registration completed');
        const { data } = result;
        AsyncStorage.setItem('@Auth:token', data.data.token);
        dispatch.auth.replaceCurrentUser(data.data.user);
        dispatch.auth.replaceIsRegistered(true);
        // ToastAndroid.show('Your account has been succesfull created', Toast.LONG)
      } catch (error) {
        alert (error.message);
      }
    },

    async doSignupPerson(payload = {}, rootState) {
      try {
        const result = await Api.post('people', payload);
        // const result=await Api.post('people', rootState.auth.signupPersonInput) ;
        const { data } = result;
        console.log('signupPerson.data =========================================>', data);
        // AsyncStorage.setItem('@Auth:token', data.data.token);
        dispatch.auth.replaceSignupPerson(data.data.user);
        dispatch.auth.replaceIsFullRegistration(true);
      } catch (error) {
        console.log('=============== signUp person =====================');
        console.log('error person :', error);
        console.log('=============== signUp person =====================');
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    },
    async doSignupEnterprise(payload = {}, rootState) {
      try {
        // const result=await Api.post('enterprises', rootState.auth.signupEnterpriseInput) ;
        const result = await Api.post('enterprises', payload);
        const { data } = result;
        // AsyncStorage.setItem('@Auth:token', data.data.token);
        // dispatch.auth.replaceSignupEnterprise(data.data.user);
        dispatch.auth.replaceIsFullRegistration(true);
        ToastAndroid.show('enrollment succed');
      } catch (error) {
        console.log('================= Error Enterprise ===================');
        console.log('Error Enterprise :', error.response);
        console.log('================= Error Enterprise ===================');
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        // Toast.show( {text : error.message, buttonText:'Okay'} )
      }
    },

    async doLogout(payload = {}, rootState) {
      try {
        dispatch.auth.replaceIsLogged(false);
        // AsyncStorage.removeItem('@Auth:token');
        AsyncStorage.clear();
        dispatch.auth.replaceCurrentUser({});
        Api.post('auth/signout', {});
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    },

    /* Get a list from the API
     * @param {obj} data
     * @returns {Promise}
     */
    async updateUser(payload = {}, rootState) {
      try {
        const response = await Api.put('/api/users/updateMe', {
          ...rootState.auth.currentUser,
        });
        console.log('=====>update user<====', response.data);
        return response;
      } catch (error) {
        console.log('update user', error);
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
      const { data, headers, page } = payload;

      // Loop data array, saving items in a usable format
      if (data && typeof data === 'object') {
        newList = data.map((item) => transform(item));
      }

      // Create our paginated and flat lists
      const listPaginated =
        page === 1 ? { [page]: newList } : { ...state.listPaginated, [page]: newList };
      const listFlat =
        Object.keys(listPaginated)
          .map((k) => listPaginated[k])
          .flat() || [];

      return newList
        ? {
            ...state,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? { [page]: moment().format() }
                : { ...state.lastSync, [page]: moment().format() },
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
    replaceLoginInput(state, payload) {
      return {
        ...state,
        loginInput: payload,
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
