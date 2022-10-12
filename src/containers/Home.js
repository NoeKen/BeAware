import { Container, Content, Icon } from 'native-base';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import CategoryItem from '../components/categoryItem';
import FabIcon from '../ui/fabIcon';

export default function Home({navigation}) {
  const [data, setData] = useState([
    {
    name: 'Ecole',
    description:'cette section concerne toutes les depenses liees a l\'ecole',
    image:'file:///storage/emulated/0/Android/data/com.beaware/files/Pictures/f4583258-aa7d-4af6-9a08-53822c7938a3.jpg'
    },
    {
    name: 'travail',
    description:'cette section concerne toutes les depenses liees au travail',
    image:'file:///storage/emulated/0/Android/data/com.beaware/files/Pictures/d65a76ec-5872-4e64-a983-c5d9f54c3de8.jpg'
    },
  ])
  return (
    <Container style={{paddingHorizontal:16}}>
      {/* <Text>One</Text> */}
      <Icon name="add" onPress={() => navigation.navigate('Add Category')} />
      {/* <Content></Content> */}
      <FlatList
        data={data}
        renderItem={item => [
          console.log('item: ',item),
          // <Text>{item.item.description}</Text>,
          <CategoryItem data={item.item} navigation={navigation} />,
        ]}
      />
      <FabIcon />
    </Container>
  );
}

const styles = StyleSheet.create({});
