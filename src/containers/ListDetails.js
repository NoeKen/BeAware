import {Container, Content, Text, View} from 'native-base';
import React, {useCallback, useMemo, useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import light from '../constants/theme/light';
import Header from '../components/UI/header';

const ListDetails = ({route}) => {
  const {item} = route.params;
  console.log(item);
  // ref
  const bottomSheetRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <Container style={styles.container}>
      <SafeAreaView>
        <Header iLeft={'arrow-back'} title={item.title + ' list'} />
      </SafeAreaView>
      <Content style={{}} >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
          overflow: 'scroll',
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius:5,
          backgroundColor:light.brandLight,
          elevation:5,
          height:40,
          paddingHorizontal:10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: light.inactiveTab,
            fontSize: 16,
            fontWeight: '900',
          }}>
          Total Price
        </Text>

        <Text
          style={{
            color: light.brandSecond,
            fontSize: 16,
            fontWeight: '900',
          }}>
          {item.total_price} XCFA
        </Text>
      </View>
      {/* <Text style={styles.title}>{item.title}</Text> */}
      {item.list.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: light.placeholder,
              paddingVertical: 5,
              overflow: 'scroll',
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: light.inactiveTab,
                fontSize: 16,
                fontWeight: '900',
              }}>
              {item.name}
            </Text>

            <Text
              style={{
                color: light.brandSecond,
                fontSize: 16,
                fontWeight: '900',
              }}>
              {item.price} XCFA
            </Text>
          </View>
        );
      })}
      {/* <View style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
      </View> */}
      </Content>
    </Container>
  );
};

export default ListDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
