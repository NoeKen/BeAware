import moment from 'moment';
import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/books';
import Config from '../constants/config';
import { getFeaturedImageUrl } from '../lib/images';
import { ucfirst, stripHtml } from '../lib/string';
import { errorMessages, successMessages } from '../constants/messages';
import pagination from '../lib/pagination';
import { ToastAndroid } from 'react-native';

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
  namespace: 'books',

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
    async getBookUsers({ forceSync = false, page = 1 } = {}, rootState) {
      const { bookUsers = {} } = rootState;
      const { meta = {} } = bookUsers;
      const { lastPage } = meta;

      // We've reached the end of the list
      if (page && lastPage && page > lastPage) {
        throw HandleErrorMessage({ message: `Page ${page} does not exist` });
      }

      try {
        const response = await Api.get(`book_users`, {
          params: {
            _includes: 'user,book',
            per_page: 10,
            _sortDir: 'desc',
            // type,
            page,
            'user_id-ne': rootState.auth.currentUser.id,
            // 'is_needed-ne':1
          },
        });
        const { data } = response;

        const newMeta = { lastPage: data.last_page, perPage: data.per_page, total: data.total };
        return !data.data || data.data.length < 1
          ? true
          : dispatch.books.replaceBookUsers({ data: data.data, meta: newMeta, page });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Get a list from the API
     * @param {obj} rootState
     * @returns {Promise}
     */
    async getBookTransaction({ forceSync = false, page = 1 } = {}, rootState) {
      const { bookTransaction = {} } = rootState;
      const { meta = {} } = bookTransaction;
      const { lastPage } = meta;

      // We've reached the end of the list
      if (page && lastPage && page > lastPage) {
        throw HandleErrorMessage({ message: `Page ${page} does not exist` });
      }

      try {
        const response = await Api.get(`book_transactions`, {
          params: {
            _includes: 'book_user,transaction,editor',
            per_page: 10,
            _sortDir: 'desc',
            // type,
            page,
            'user_id-ne': rootState.auth.currentUser.id,
            // 'is_needed-ne':1
          },
        });
        const { data } = response;

        const newMeta = { lastPage: data.last_page, perPage: data.per_page, total: data.total };
        return !data.data || data.data.length < 1
          ? true
          : dispatch.books.replaceBookTransaction({ data: data.data, meta: newMeta, page });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Get a list of books from the API
     * @param {obj} rootState
     * @returns {Promise}
     */
    async getAllBooks(){
      try {
        const response = await Api.get(`books`, {
          params: {
            _includes: 'editor,categories,book_users',
            // per_page: 10,
            _sortDir: 'desc',
            should_paginate: false
          },
        });
        console.log("all books: ",response.data);
        return response.data;
      } catch (error) {
        console.log("getting all books failed: ",error.response);
      }
    },
    /**
     * Get a list of books from the API
     * @param {obj} rootState
     * @returns {Promise}
     */

    async getBooks({ forceSync = false, page = 1 } = {}, rootState) {
      const { _books = {} } = rootState;
      const { meta = {} } = _books;
      const { lastPage } = meta;
      // We've reached the end of the list
      if (page && lastPage && page > lastPage) {
        throw HandleErrorMessage({ message: `Page ${page} does not exist` });
      }
      // console.log('============== rootState.categories.selectedCategory.id ======================');
      // console.log(
      //   'rootState.categories.selectedCategory.id',
      //   rootState.categories.selectedCategory.id,
      // );
      // console.log('============== rootState.categories.selectedCategory.id ======================');
      try {
        const response = await Api.get(`books`, {
          params: {
            _includes: 'editor,categories,book_users',
            per_page: 10,
            _sortDir: 'desc',
            // type,
            // 'categories-fk' : `id-in=${rootState.categories.selectedCategory.id}`,
            // 'categories-fk' : "id-in=idDelaCategorie,kk",
            page,
            // 'user_id-ne':rootState.auth.currentUser.id,
            // 'is_needed-ne':1
          },
        });
        const { data } = response;
        const newMeta = { lastPage: data.last_page, perPage: data.per_page, total: data.total };
        return !data.data || data.data.length < 1
          ? true
          : dispatch.books.replaceBooks({ data: data.data, meta: newMeta, page });
      } catch (error) {
        console.log('error get book: ', error.response);
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Get a list of books from the API
     * @param {obj} rootState
     * @returns {Promise}
     */

    async getBooksCategories({ forceSync = false, page = 1 } = {}, rootState) {
      const { _booksCategory = {} } = rootState;
      const { meta = {} } = _booksCategory;
      const { lastPage } = meta;
      // We've reached the end of the list
      if (page && lastPage && page > lastPage) {
        throw HandleErrorMessage({ message: `Page ${page} does not exist` });
      }

      try {
        const response = await Api.get(`book_categories`, {
          params: {
            _includes: 'book,category',
            per_page: 10,
            _sortDir: 'desc',
            // type,
            page,
            // 'user_id-ne':rootState.auth.currentUser.id,
            // 'is_needed-ne':1
          },
        });
        // console.log('================ books catergoies ====================');
        // console.log('books catergoies: ', response);
        // console.log('================ books catergoies ====================');
        const { data } = response;
        const newMeta = { lastPage: data.last_page, perPage: data.per_page, total: data.total };
        return !data.data || data.data.length < 1
          ? true
          : dispatch.books.replaceBooksCategories({ data: data.data, meta: newMeta, page });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * create a book_user to store
     * @param {obj} payload
     * @param {obj} rootState
     */
    async doCreateBookCategory(payload = {}, rootState) {
      try {
        // const result = await Api.post('book_categories', rootState.books.createBookCategory);
        const result = await Api.post('book_categories', payload);
        console.log('================= Create Book Category ===================');
        console.log('Book Category: ', result);
        console.log('================= Create Book Category ===================');
        const { data } = result;
        // dispatch.books.replaceCreateBookCategory(data.data);
        console.log(data);
      } catch (error) {
        console.log('==================== create book Category ================');
        console.log(error.response);
        console.log('==================== create book Category ================');
      }
    },

    /**
     * create a book_user to store
     * @param {obj} payload
     * @param {obj} rootState
     */
    async doCreateBookUser(payload = {}, rootState) {
      // try {
      // const result = await Api.post('book_users', rootState.books.createBookUser);
      const result = await Api.post('book_users', payload).catch((error) => {
        console.log('==================== create book user error ================');
        console.log('Error: ', error.response);
        console.log('==================== create book user error ================');
      });
      const { data } = result;
      console.log('================= create book user ===================');
      console.log('Book User Created:', data);
      console.log('================= create book user ===================');
      // AsyncStorage.setItem('@Auth:token', data.data.token);
      dispatch.books.replaceBookUserCreated(result.data);
      dispatch.books.replaceCreateBookTransaction({
        ...rootState.books.createBookTransaction,
        book_user_id: data.id,
      });
      dispatch.books.replaceCreateBookCategory({
        ...rootState.books.createBookCategory,
        book_id: data.id,
      });
      // console.log(data);
      // }
    },

    /**
     * create a books to store
     * @param {*} payload
     * @param {*} rootState
     */
    async doCreateBook(payload = {}, rootState) {
      const result = await Api.post('books', payload).catch((error) => {
        console.log('==================== create books error ================');
        console.log(error.response);
        console.log('==================== create books error ================');
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        return Promise.reject(error);
      });
      const { data } = result;
      dispatch.books.replaceCreatedBook(result.data);
      console.log('================= create book ===================');
      console.log('result', result);
      console.log('================= create book ===================');
      return result;
      // AsyncStorage.setItem('@Auth:token', data.data.token);
      // dispatch.auth.replaceCreateBook(data.data.user);
      // console.log(data)
    },

    /**
     *
     * @param {*} payload
     * @param {*} rootState
     */
    async getEditors({ forceSync = false, page = 1 } = {}, rootState) {
      const { editors = {} } = rootState;
      const { meta = {} } = editors;
      const { lastPage } = meta;

      // We've reached the end of the list
      if (page && lastPage && page > lastPage) {
        throw HandleErrorMessage({ message: `Page ${page} does not exist` });
      }

      try {
        const response = await Api.get(`editors`, {
          params: {
            // _includes:'editor',
            per_page: 10,
            _sortDir: 'desc',
            // type,
            page,
            // 'user_id-ne':rootState.auth.currentUser.id,
            // 'is_needed-ne':1
          },
        });
        const { data } = response;
        console.log('======================= books =============');
        console.log(data);
        console.log('====================== books ==============');

        const newMeta = { lastPage: data.last_page, perPage: data.per_page, total: data.total };
        return !data.data || data.data.length < 1
          ? true
          : dispatch.books.replaceEditors({ data: data.data, meta: newMeta, page });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     *
     * @param {*} payload
     * @param {*} rootState
     */
    async doCreateEditor(payload = {}, rootState) {
      try {
        const result = await Api.post('editors', rootState.books.createEditor);
        const { data } = result;
        console.log('================= create editor ===================');
        console.log(data);
        console.log('================= create editor ===================');
      } catch (error) {
        console.log('====================================');
        console.log('create editor: ', error);
        console.log('====================================');
        ToastAndroid.show(error.message, ToastAndroid.LONG, ToastAndroid.CENTER);
      }
    },
    /**
     *
     * @param {*} payload
     * @param {*} rootState
     */
    async doCreateBookTransaction(payload = {}, rootState) {
      try {
        console.log('=============== payload BookTransaction =====================');
        console.log('payload: ', payload);
        console.log('=============== payload BookTransaction =====================');
        const result = await Api.post('book_transactions', rootState.books.createBookTransaction);
        // const result = await Api.post('book_transactions', payload);
        const { data } = result;
        dispatch.books.replaceCreatedBookTransaction(result.data);
        console.log('================= book_transactions ===================');
        console.log(data);
        console.log('================= book_transactions ===================');
      } catch (error) {
        console.log('================ book_transactions ====================');
        console.log('create book_transaction: ', error.response);
        console.log('================ book_transactions ====================');
        ToastAndroid.show(error.message, ToastAndroid.LONG, ToastAndroid.CENTER);
      }
    },

    /**
     * Get a single item from the API
     * @param {number} id
     * @returns {Promise[obj]}
     */
    async fetchSingle(id) {
      try {
        const response = await Api.get(`/v2/posts/${id}?_embed`);
        const { data } = response;

        if (!data) {
          throw new Error({ message: errorMessages.articles404 });
        }

        return transform(data);
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Save date to redux store
     * @param {obj} data
     * @returns {Promise[obj]}
     */
    async save(data) {
      try {
        if (Object.keys(data).length < 1) {
          throw new Error({ message: errorMessages.missingData });
        }

        dispatch.articles.replaceUserInput(data);
        return successMessages.defaultForm; // Message for the UI
      } catch (error) {
        throw HandleErrorMessage(error);
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
    replaceBookUsers(state, payload) {
      let newList = null;
      const { data, meta, page } = payload;

      // Loop data array, saving items in a usable format
      // if (data && typeof data === 'object') {
      //   newList = data.map((item) => transform(item));
      // }
      newList = data;
      // Create our paginated and flat lists
      const listPaginated =
        page === 1 ? { [page]: newList } : { ...state[type].listPaginated, [page]: newList };
      const listFlat =
        Object.keys(listPaginated)
          .map((k) => listPaginated[k])
          .flat() || [];
      const bookUsers = newList
        ? {
            ...state.bookUsers,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? { [page]: moment().format() }
                : { ...state.lastSync, [page]: moment().format() },
            meta: {
              page,
              lastPage: meta.lastPage || null,
              total: meta.total || null,
            },
            pagination: pagination(5, '/bookUsers/'),
          }
        : null;

      return bookUsers
        ? {
            ...state,
            bookUsers,
          }
        : initialState;
    },

    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replaceBookTransaction(state, payload) {
      let newList = null;
      const { data, meta, page } = payload;

      // Loop data array, saving items in a usable format
      // if (data && typeof data === 'object') {
      //   newList = data.map((item) => transform(item));
      // }
      newList = data;
      // Create our paginated and flat lists
      const listPaginated =
        page === 1 ? { [page]: newList } : { ...state[type].listPaginated, [page]: newList };
      const listFlat =
        Object.keys(listPaginated)
          .map((k) => listPaginated[k])
          .flat() || [];
      const bookTransaction = newList
        ? {
            ...state.bookTransaction,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? { [page]: moment().format() }
                : { ...state.lastSync, [page]: moment().format() },
            meta: {
              page,
              lastPage: meta.lastPage || null,
              total: meta.total || null,
            },
            pagination: pagination(5, '/bookTransaction/'),
          }
        : null;

      return bookTransaction
        ? {
            ...state,
            bookTransaction,
          }
        : initialState;
    },

    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replaceBooks(state, payload) {
      let newList = null;
      const { data, meta, page } = payload;
      newList = data;
      // Create our paginated and flat lists
      const listPaginated =
        page === 1 ? { [page]: newList } : { ...state[type].listPaginated, [page]: newList };
      const listFlat =
        Object.keys(listPaginated)
          .map((k) => listPaginated[k])
          .flat() || [];
      const _books = newList
        ? {
            ...state._books,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? { [page]: moment().format() }
                : { ...state.lastSync, [page]: moment().format() },
            meta: {
              page,
              lastPage: meta.lastPage || null,
              total: meta.total || null,
            },
            pagination: pagination(5, '/_books/'),
          }
        : null;

      return _books
        ? {
            ...state,
            _books,
          }
        : initialState;
    },

    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replaceBooksCategories(state, payload) {
      let newList = null;
      const { data, meta, page } = payload;
      newList = data;
      // Create our paginated and flat lists
      const listPaginated =
        page === 1 ? { [page]: newList } : { ...state[type].listPaginated, [page]: newList };
      const listFlat =
        Object.keys(listPaginated)
          .map((k) => listPaginated[k])
          .flat() || [];
      const _booksCategories = newList
        ? {
            ...state._booksCategories,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? { [page]: moment().format() }
                : { ...state.lastSync, [page]: moment().format() },
            meta: {
              page,
              lastPage: meta.lastPage || null,
              total: meta.total || null,
            },
            pagination: pagination(5, '/_booksCategories/'),
          }
        : null;

      return _booksCategories
        ? {
            ...state,
            _booksCategories,
          }
        : initialState;
    },

    /**
     *
     * @param {*} state
     * @param {*} payload
     * @returns
     */
    replaceCreateBookCategory(state, payload) {
      return {
        ...state,
        createBookCategory: payload,
      };
    },

    /**
     *
     * @param {*} state
     * @param {*} payload
     * @returns
     */
    replaceEditors(state, payload) {
      let newList = null;
      const { data, meta, page } = payload;

      // Loop data array, saving items in a usable format
      // if (data && typeof data === 'object') {
      //   newList = data.map((item) => transform(item));
      // }
      newList = data;
      // Create our paginated and flat lists
      const listPaginated =
        page === 1 ? { [page]: newList } : { ...state[type].listPaginated, [page]: newList };
      const listFlat =
        Object.keys(listPaginated)
          .map((k) => listPaginated[k])
          .flat() || [];
      const editors = newList
        ? {
            ...state.editors,
            listPaginated,
            listFlat,
            lastSync:
              page === 1
                ? { [page]: moment().format() }
                : { ...state.lastSync, [page]: moment().format() },
            meta: {
              page,
              lastPage: meta.lastPage || null,
              total: meta.total || null,
            },
            pagination: pagination(5, '/editors/'),
          }
        : null;

      return editors
        ? {
            ...state,
            editors,
          }
        : initialState;
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceCreateBookUsers(state, payload) {
      return {
        ...state,
        createBookUser: payload,
      };
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceCreateBook(state, payload) {
      return {
        ...state,
        createBook: payload,
      };
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceCreateBookTransaction(state, payload) {
      return {
        ...state,
        createBookTransaction: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceCreateEditor(state, payload) {
      return {
        ...state,
        createEditor: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceCreatedBook(state, payload) {
      return {
        ...state,
        createdBook: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceBookUserCreated(state, payload) {
      return {
        ...state,
        bookUserCreated: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceCreatedBookTransaction(state, payload) {
      return {
        ...state,
        bookTransactionCreated: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceBooksCreating(state, payload) {
      return {
        ...state,
        booksCreating: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceBooksTransactionCreating(state, payload) {
      return {
        ...state,
        booksTransactionCreating: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceBooksUserCreating(state, payload) {
      return {
        ...state,
        booksUserCreating: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceBooksCategoriesCreating(state, payload) {
      return {
        ...state,
        booksCategoriesCreating: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceSelectedBook(state, payload) {
      return {
        ...state,
        selectedBook: payload,
      };
    },

    /**
     * @param {obj} state
     * @param {obj} payload
     * @returns
     */
    replaceFavorites(state, payload) {
      return {
        ...state,
        favorites: payload,
      };
    },
  },
};
