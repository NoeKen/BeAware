import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'native-base';
import React, {useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';
import light from '../../constants/theme/light';
import ListDetails from '../../containers/ListDetails';
import moment from 'moment';

const ListItem = ({item, navigation}) => {
  // const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  // Alert.alert('ListItem:', item.title);

  // const handleNotification =(item)=>{

  //   // PushNotification.cancelAllLocalNotifications();
  //   PushNotification.cancelAllLocalNotifications({});

  //   PushNotification.localNotification({
  //     channelId: "test-channel",
  //     title:"you clicked on "+ item.title,
  //     message: 'ceci est une notification test',
  //     bigText:"this is list you've created since "+item.created_at + 'with title: '+item.title,
  //     id: '123',
  //     ticker: "My Notification Ticker",
  //     largeIcon: "ic_launcher",
  //     smallIcon: "ic_launcher",
  //     color:'#00cef3'
  //   });
  //   PushNotification.localNotificationSchedule({
  //     //... You can use all the options from localNotifications
  //     channelId: "test-channel",
  //     title:"you clicked on "+ item.title,
  //     message: "My Notification Message", // (required)
  //     date: new Date(Date.now() + 10 * 1000), // in 60 secs
  //     allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

  //     /* Android Only Properties */
  //     repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  //   });
  // }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // setVisible(!visible)
        navigation.navigate('ListDetails', {item: item});
      }}>
      <View style={styles.firstLine}>
        <Text style={styles.text} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          {item.total_price} XCFA
        </Text>
      </View>
      <View style={styles.secondLine}>
        <Text style={styles.date} numberOfLines={1}>
        {moment(item?.created_at).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.time} numberOfLines={1}>
        {moment(item?.created_at).format('hh:mm:ss a')}
        </Text>
      </View>

      {/* {visible&&<ListDetails />} */}
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    // fontWeight: 'bold',
    color: light.textColor,
    flex: 0.65,
    fontSize: light.subTitleFontSize,
    fontFamily: light.subTitleFontFamily,
  },
  price: {
    fontSize: light.textFontSize,
    fontFamily: light.subTitleFontFamily,
    color: light.brandSecond,
    // flex: 0.35,
    fontWeight:'800',
    overflow: 'hidden',
    textAlign: 'center',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  secondLine: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  date:{
    fontSize: light.minFontSize,
    fontFamily: light.textFontFamily,
    color: light.inactiveTab,
  },
  time:{
    fontSize: light.minFontSize,
    fontFamily: light.textFontFamily,
    color: light.inactiveTab,
  },
});
