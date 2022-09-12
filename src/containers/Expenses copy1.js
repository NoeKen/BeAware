// // import {ScrollView} from 'native-base';
// import {Container, Content} from 'native-base';
// import React, {useEffect, useState} from 'react';
// import {
//   FlatList,
//   ImageBackground,
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import SQLite from 'react-native-sqlite-2';
// import {openDatabase} from 'react-native-sqlite-storage';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import light from '../constants/theme/light';
// import SwipeableFlatList from 'react-native-swipeable-list';

// const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

// const Expenses = ({navigation}) => {
//   const [expenses, setExpenses] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   //=================================================================================
//   // const getExpenses = () => {
//   // var result = [];
//   useEffect(() => {
//     db.transaction(txn => {
//       txn.executeSql('SELECT * FROM `Expenses`', [], (txn, res) => {
//         var len = res.rows.length;
//         if (len > 0) {
//           var result = [];
//           var amount = 0;
//           for (let i = 0; i < len; ++i) {
//             result.push(res.rows.item(i));
//             amount += res.rows.item(i).amount;
//             // console.log(`item ${i}:`, res.rows.item(i));
//             // expenses.push(res.rows.item(i));
//           }
//           setExpenses(result);
//           setTotalAmount(amount);
//         }
//         // return result;
//       });
//     });
//   }, []);
//   //=================================================================================

//   const QuickActions = (index, qaItem) => {
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           flex: 1,
//           justifyContent: 'space-between',
//         }}>
//         <View style={{flex: 0.6}} />
//         <View
//           style={{
//             flex: 0.4,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             paddingEnd: 5,
//           }}>
//           <TouchableOpacity>
//             <MaterialCommunityIcons name="table-edit" style={{fontSize: 20}} />
//           </TouchableOpacity>
          
//           <TouchableOpacity>
//             <MaterialCommunityIcons name="table-edit" style={{fontSize: 20}} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <Container>
//       <SafeAreaView>
//         <View style={styles.header}>
//           <ImageBackground
//             source={require('../../assets/pictures/tirelire.png')}
//             resizeMode="cover"
//             style={styles.image}>
//             <Text style={styles.text}>BeAware</Text>
//           </ImageBackground>
//         </View>
//       </SafeAreaView>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginHorizontal: 16,
//           borderBottomWidth: 1,
//           paddingBottom: 10,
//           borderBottomColor: light.brandPrimary,
//         }}>
//         <Text style={styles.title}>Dépences</Text>
//         {/* <TouchableOpacity onPress={() => getExpenses()}> */}
//         <Text style={styles.title}>{totalAmount}</Text>
//         {/* <MaterialCommunityIcons name="reload" style={{fontSize: 20}} /> */}
//         {/* </TouchableOpacity> */}
//       </View>

//       <Content>
//         <View style={{padding: 16}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <Text style={styles.sectionTitle}>Aujourd'hui</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('AddExpense')}>
//               {/* <Text style={{fontSize: 20}}>Create</Text> */}
//               <MaterialCommunityIcons
//                 name="table-edit"
//                 style={{fontSize: 20}}
//               />
//             </TouchableOpacity>
//           </View>
//           <View>
//             {expenses.map(
//               item => (
//                 <SwipeableFlatList
//                   style={{marginBottom: 10}}
//                   data={expenses}
//                   keyExtractor={item => item.expense_id}
//                   renderItem={({item}) => [
//                     <View
//                       style={{
//                         height: 60,
//                         backgroundColor: '#d8d7d8ad',
//                         marginVertical: 2,
//                         borderRadius: 8,
//                         padding: 8,
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         flex: 1,
//                       }}>
//                       <View
//                         style={{flex: 0.75, justifyContent: 'space-between'}}>
//                         <Text
//                           style={{
//                             color: light.textColor,
//                             fontFamily: 'ubuntu-bold',
//                             fontSize: 18,
//                           }}
//                           numberOfLines={1}>
//                           {item.title}
//                         </Text>
//                         <Text
//                           style={{
//                             color:
//                               item.description === ''
//                                 ? '#7070703e'
//                                 : light.inactiveTab,
//                             fontFamily: 'Montserrat-Medium',
//                           }}
//                           numberOfLines={1}>
//                           {item.description === ''
//                             ? 'Aucune description fournie'
//                             : item.description}
//                         </Text>
//                       </View>
//                       <Text
//                         style={{
//                           color: light.brandPrimary,
//                           alignSelf: 'center',
//                           textAlign: 'right',
//                           fontFamily: 'ubuntu-bold',
//                           fontSize: 18,
//                           flex: 0.25,
//                         }}>
//                         {item.amount}
//                       </Text>
//                     </View>,
//                   ]}
//                   maxSwipeDistance={240}
//                   renderQuickActions={({index, item}) =>
//                     QuickActions(index, item)
//                   }
//                   contentContainerStyle={styles.contentContainerStyle}
//                   shouldBounceOnMount={true}
//                   ItemSeparatorComponent={<View style={styles.itemSeparator} />}
//                 />
//               ),
//               // <View
//               //   style={{
//               //     height: 60,
//               //     backgroundColor: '#d8d7d8ad',
//               //     marginVertical: 2,
//               //     borderRadius: 8,
//               //     padding: 8,
//               //     flexDirection: 'row',
//               //     justifyContent: 'space-between',
//               //     flex: 1,
//               //   }}>
//               //   <View style={{flex: 0.75, justifyContent: 'space-between'}}>
//               //     <Text
//               //       style={{
//               //         color: light.textColor,
//               //         fontFamily: 'ubuntu-bold',
//               //         fontSize: 18,
//               //       }}
//               //       numberOfLines={1}>
//               //       {item.title}
//               //     </Text>
//               //     <Text
//               //       style={{
//               //         color:
//               //           item.description === ''
//               //             ? '#7070703e'
//               //             : light.inactiveTab,
//               //         fontFamily: 'Montserrat-Medium',
//               //       }}
//               //       numberOfLines={1}>
//               //       {item.description === ''
//               //         ? 'Aucune description fournie'
//               //         : item.description}
//               //     </Text>
//               //   </View>
//               //   <Text
//               //     style={{
//               //       color: light.brandPrimary,
//               //       alignSelf: 'center',
//               //       textAlign: 'right',
//               //       fontFamily: 'ubuntu-bold',
//               //       fontSize: 18,
//               //       flex: 0.25,
//               //     }}>
//               //     {item.amount}
//               //   </Text>
//               // </View>
//               // ]
//             )}
//             {/* <FlatList
//                 style={{marginBottom: 10}}
//                 data={expenses}
//                 keyExtractor={item => item.expense_id}
//                 renderItem={({item}) => [
//                   <View
//                     style={{
//                       height: 60,
//                       backgroundColor: '#d8d7d8ad',
//                       marginVertical: 2,
//                       borderRadius: 8,
//                       padding: 8,
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       flex: 1,
//                     }}>
//                     <View style={{flex: 0.75, justifyContent: 'space-between'}}>
//                       <Text
//                         style={{
//                           color: light.textColor,
//                           fontFamily: 'ubuntu-bold',
//                           fontSize: 18,
//                         }}
//                         numberOfLines={1}>
//                         {item.title}
//                       </Text>
//                       <Text
//                         style={{
//                           color:
//                             item.description === ''
//                               ? '#7070703e'
//                               : light.inactiveTab,
//                           fontFamily: 'Montserrat-Medium',
//                         }}
//                         numberOfLines={1}>
//                         {item.description === ''
//                           ? 'Aucune description fournie'
//                           : item.description}
//                       </Text>
//                     </View>
//                     <Text
//                       style={{
//                         color: light.brandPrimary,
//                         alignSelf: 'center',
//                         textAlign: 'right',
//                         fontFamily: 'ubuntu-bold',
//                         fontSize: 18,
//                         flex: 0.25,
//                       }}>
//                       {item.amount}
//                     </Text>
//                   </View>,
//                 ]}
//               /> */}
//           </View>
//         </View>
//       </Content>
//       {/* </ScrollView> */}

//       {/* </View> */}
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingHorizontal: 16,
//     // backgroundColor:light.textColor
//   },
//   title: {
//     color: light.brandPrimary,
//     // fontWeight: 'bold',
//     fontSize: 25,
//     fontFamily: 'ubuntu-bold',
//     marginTop: 15,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontFamily: 'ubuntu-bold',
//     marginBottom: 15,
//     marginTop: 20,
//   },
//   image: {
//     flex: 1,
//   },
//   text: {
//     color: 'white',
//     fontSize: 42,
//     lineHeight: 120,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     backgroundColor: '#783c3cc0',
//   },
//   header: {
//     height: 120,
//     // backgroundColor: '#eab07ea9',
//     // marginBottom: 20,
//   },
//   itemSeparator: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: light.inactiveTab,
//     // opacity: colorEmphasis.medium,
//   },

//   container: {
//     backgroundColor: '#121212',
//   },
//   headerContainer: {
//     height: 80,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: '800',
//     // color: darkColors.onBackground,
//     // opacity: colorEmphasis.high,
//   },
//   item: {
//     backgroundColor: '#121212',
//     height: 80,
//     flexDirection: 'row',
//     padding: 10,
//   },
//   messageContainer: {
//     // backgroundColor: darkColors.backgroundColor,
//     maxWidth: 300,
//   },
//   name: {
//     fontSize: 16,
//     // color: darkColors.primary,
//     // opacity: colorEmphasis.high,
//     fontWeight: '800',
//   },
//   subject: {
//     fontSize: 14,
//     // color: darkColors.onBackground,
//     // opacity: colorEmphasis.high,
//     fontWeight: 'bold',
//     // textShadowColor: darkColors.secondary,
//     textShadowOffset: {width: 1, height: 1},
//     textShadowRadius: 4,
//   },
//   // text: {
//   //   fontSize: 10,
//   //   // color: darkColors.onBackground,
//   //   // opacity: colorEmphasis.medium,
//   // },
//   // avatar: {
//   //   width: 40,
//   //   height: 40,
//   //   backgroundColor: darkColors.onBackground,
//   //   opacity: colorEmphasis.high,
//   //   borderColor: darkColors.primary,
//   //   borderWidth: 1,
//   //   borderRadius: 20,
//   //   marginRight: 7,
//   //   alignSelf: 'center',
//   //   shadowColor: darkColors.secondary,
//   //   shadowOffset: {width: 1, height: 1},
//   //   shadowRadius: 2,
//   //   shadowOpacity: colorEmphasis.high,
//   // },
//   qaContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },

//   button: {
//     width: 80,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     opacity: 0.8,
//   },
//   button1Text: {
//     color: light.brandPrimary,
//   },
//   button2Text: {
//     color: '#086dbb',
//   },
//   // button3Text: {
//   //   color: '#fe0404',
//   // },
//   contentContainerStyle: {
//     flexGrow: 1,
//     backgroundColor: '#eab07ea9',
//   },
// });
// export default Expenses;
