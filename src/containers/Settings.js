import { Container, Content, Icon, Picker, Text, Title, View } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../components/UI/header';
import light from '../constants/theme/light';

const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Container>
      {/* <SafeAreaView style={styles.header}>
        <Icon name="arrow-back" style={styles.header.icon} />
        <Title style={styles.header.title}>Settings</Title>
      </SafeAreaView> */}

      <Header title={'Settings'}/>
      
      <Content style={styles.content}>
        <View style={styles.itemContainer}>
          <Text>Language</Text>

          <Text>en</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text>Theme</Text>
          <Text>light</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text>Create a marathon</Text>
        </View>
        <Picker
          style={{
            borderLeftWidth: 1,
            borderColor: light.inactiveTab,
            textAlign: 'right',
            fontFamily: 'Montserrat-Regular',
            width: '60%',
            alignSelf: 'flex-end',
            fontSize: 14,
          }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </Content>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 55,
    borderBottomWidth: 0.5,
    borderBottomColor: light.inactiveTab,
    alignItems: 'center',
    paddingLeft: 16,
    elevation: 0.5,
    shadowColor: light.brandPrimary,
    shadowRadius: 10,
    shadowOffset: {width: 5, height: 10},
    icon: {
      color: light.brandPrimary,
      marginEnd: 16,
    },
    title: {
      color: light.brandPrimary,
    },
  },
  content: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
});
