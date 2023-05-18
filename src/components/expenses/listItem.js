import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'native-base';
import React, {useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';
import light from '../../constants/theme/light';
import ListDetails from '../../containers/ListDetails';

const ListItem = ({item,navigation}) => {
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
      <Text style={styles.text} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.price} numberOfLines={1}>
        {item.total_price} XCFA
      </Text>

      {/* {visible&&<ListDetails />} */}
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    flex: 0.65,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: light.brandSecond,
    // flex: 0.35,
    overflow: 'hidden',
    textAlign: 'center',
  },
});
