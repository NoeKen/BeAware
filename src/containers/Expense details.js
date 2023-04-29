import moment from 'moment';
import {Container, Content, Text, View} from 'native-base';
import React, { useEffect } from 'react';
import {StyleSheet} from 'react-native';
import light from '../constants/theme/light';
import SQLite from 'react-native-sqlite-2';
import {useState} from 'react';
import Header from '../components/UI/header';
import { getCategory } from '../Services/categoriesService';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
export default function ExpenseDetails({route, navigation}) {
  const {item,categories} = route.params;
  const [category, setCategory] = useState(getCategory(categories, item.category_id));
  console.log('item pressed has this date: ', category);
 

  return (
    <Container>
      <Header iLeft={'arrow-back'} title={'Details'} />
      <Content style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContainer.key}>Title :</Text>
          <Text style={styles.sectionContainer.value.text}>{item?.title}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContainer.key}>Amount :</Text>
          <Text style={styles.sectionContainer.value.text}>
            {item?.amount} F
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContainer.key}>Category :</Text>
          <Text style={styles.sectionContainer.value.text}>
            {category?.name}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionContainer.key}>Description :</Text>
          <Text style={styles.descriptionContainer.value}>
            {item.description == ''
              ? 'No description provided '
              : item?.description}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionContainer.key}>Created_at :</Text>
          <View
            style={[
              styles.sectionContainer.value,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={styles.sectionContainer.value.text}>
              {moment(item?.created_at).format('DD-MM-YYYY')}
            </Text>
            <Text style={styles.sectionContainer.value.text}>
              {[moment(item?.created_at).format('hh:mm:ss a')]}
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    paddingVertical: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: light.brandPrimary,
    justifyContent: 'space-between',
    alignItems: 'center',
    key: {
      width: '25%',
      fontWeight: 'bold',
      fontSize: 14,
      color: light.inactiveTab,
    },
    value: {
      width: '65%',
      text: {
        fontWeight: 'bold',
        color: light.textColor,
        textAlign: 'right',
      },
    },
  },
  descriptionContainer: {
    paddingVertical: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: light.brandPrimary,
    key: {
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 20,
      color: light.inactiveTab,
    },
    value: {
      fontWeight: 'bold',
      marginLeft: 20,
      borderLeftWidth: 1,
      paddingLeft: 10,
      fontSize: 16,
      color: light.textColor,
      borderLeftColor: light.brandPrimary,
    },
  },
});
