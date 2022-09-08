import React, { useState } from 'react';
import { View, Text, FlatList,Alert } from 'react-native';
import light from '../constants/theme/light';

export default function Home() {
  const [expenses, setExpenses] = useState([
    {
      id:0,
      title:'chaussure',
      description:'j\' ai achete une chaussure',
      amount: 5000
    },
    {
      id:1,
      title:'Lait',
      description:'j\' ai achete une chaussure',
      amount: 5000
    },
    {
      id:2,
      title:'Cahiers',
      description:'j\' ai achete une chaussure',
      amount: 5000
    },
    {
      id:3,
      title:'Sac',
      description:'j\' ai achete une chaussure',
      amount: 5000
    },
    {
      id:4,
      title:'Connexion internet',
      description:'j\' ai achete une chaussure',
      amount: 5000
    }
  ])
  return (
    <View >
      <Text>One</Text>
      <FlatList
          data={[{id:1,title:'manger'},{id:2,title:'courir'}]}
          renderItem={({item})=>
            // <View style={{height:60,width:500,backgroundColor:'#bc84bc80'}}>
            <Text style={{color:light.textColor}}>item title</Text>
            // </View>,
            // Alert.alert(item.title)
          }
          keyExtractor={item => item.id}
          />
          <Text>Two</Text>
     </View>
  );
}
