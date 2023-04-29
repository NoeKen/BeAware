import moment from 'moment';
import {ToastAndroid} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import Config from '../constants/config';
import {getFeaturedImageUrl} from '../lib/images';
import {stripHtml, ucfirst} from '../lib/string';
import initialState from '../store/expenses';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
// const navigation = useNavigation();

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
    async deleteExpense(payload = {}, rootState) {
      const tab = rootState.expenses.expenses;
      console.log('array', tab, 'id', payload);
      const index = tab.findIndex(item => item.id === payload);
      if (index !== -1) {
        tab.splice(index, 1);
        ToastAndroid.show('Item was successfully deleted', ToastAndroid.LONG);
        dispatch.expenses.replaceExpenses(tab);
        // navigation.reset();
      } else {
        ToastAndroid.show('Item was not deleted', ToastAndroid.LONG);
        console.log(`item with id ${id} was not found`);
      }
    },

    async deleteCascadeExpenses(payload = {}, rootState) {
      const tab = rootState.expenses.expenses;
      tab.map((item, index) => {
        if (item.category_id === payload) {
          tab.splice(index, 1);
        }
      });
      dispatch.expenses.replaceExpenses(tab)
    },
    // async addExpensesList(payload = {}, rootState) {
    //   console.log('rootState: ', rootState);
    //   try {
    //     db.transaction(function (txn) {
    //       // txn.executeSql('DROP TABLE IF EXISTS Categories', []);
    //       // txn, executeSql('DROP DATABASE IF EXISTS beAware.db');
    //       txn.executeSql(
    //         'CREATE TABLE IF NOT EXISTS Categories(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), image VARCHAR(255), description VARCHAR(255),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
    //         [],
    //       );
    //       txn.executeSql(
    //         'INSERT INTO Categories (name,image,description) VALUES (:name,:image,:description)',
    //         // 'INSERT INTO Categories (title,amount,description,created_at) VALUES (:title,:amount,:description,:created_at)',
    //         [
    //           rootState.categories.category.name,
    //           rootState.categories.category.image,
    //           rootState.categories.category.description,
    //         ],
    //       );
    //     });
    //     // navigation.navigate('Home');
    //     ToastAndroid.show('category created successfully', ToastAndroid.LONG);
    //     console.log('category created');
    //   } catch (error) {
    //     // setReqError(`An error occurred saving the category : ${error.message}`);
    //     console.error('error occurred: ', error);
    //     ToastAndroid.show(
    //       'An expected error ocurred when creating category',
    //       ToastAndroid.LONG,
    //     );
    //   }
    // },
    // async getCategories(payload = {}, rootState) {
    //   try {
    //     db.transaction(txn => {
    //       txn.executeSql(
    //         'select * from Categories',
    //         // 'select * from Categories ORDER BY date(created_at)',
    //         [],
    //         (txn, res) => {
    //           var len = res.rows.length;
    //           var cat = [];
    //           if (len > 0) {
    //             for (let i = 0; i < len; ++i) {
    //               cat.push(res.rows.item(i));
    //               console.log(
    //                 '<=====> category: <==========> ',
    //                 res.rows.item(i),
    //               );
    //             }
    //           }
    //           dispatch.categories.replaceCategories(cat);
    //           // setCategories(cat);
    //         },
    //       );
    //     });
    //   } catch (error) {
    //     console.error('error occurred: ', error);
    //     ToastAndroid.show(
    //       'An expected error ocurred when creating category',
    //       ToastAndroid.LONG,
    //     );
    //   }
    // },
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
    replaceExpenses(state, payload) {
      return {
        ...state,
        expenses: payload,
      };
    },
  },
};
