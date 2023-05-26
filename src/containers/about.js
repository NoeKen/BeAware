import {Content, Text, View} from 'native-base';
import React, {useState} from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/UI/header';
import {Divider} from 'react-native-paper';
import light from '../constants/theme/light';
import RemixIcon from 'react-native-remix-icon';

const About = ({navigation}) => {
  const [uri, setUrl] = useState('https://www.ultradominon.com/ds/');
  return (
    <>
      <SafeAreaView>
        <Header iLeft={'arrow-back'} title={'About'} />
      </SafeAreaView>
      <Content style={styles.container}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>About beAware</Text>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.text}>
              <Text style={styles.accent}>beAware</Text> is an application
              optimized for managing personal financial resources. Optimized for
              use without an internet connection, the beAware app allows you to
              easily manage your finances, allowing you to have an organized
              record of your daily expenses. beAware offers you a range of
              simple, intuitive and easy-to-use tools in a user-friendly
              interface: {'\n'}
              <Text style={styles.accent}> * Creation of expenses:</Text>
              recorded your expenses as and when you consume them;
              {'\n'} <Text style={styles.accent}>* Accounting:</Text> the
              application automatically records the amount already consumed
              based on the recorded expenses; {'\n'}{' '}
              <Text style={styles.accent}>* Group classification:</Text>{' '}
              organize your spending by group, to see which area you
              spend/invest the most in; {'\n'}{' '}
              <Text style={styles.accent}>* Creation of lists:</Text> You can
              also create lists specific to an event or as you wish, such as for
              example the shopping list of the household market, by
              automatically having the financial accumulation of purchased
              items; {'\n'} <Text style={styles.accent}>* Printing:</Text> You
              can also print/download in pdf a particular list, or all lists in
              one document; {'\n'} The app allows you to use without the need
              for an internet connection. So you don’t have to worry about being
              connected or not. Then what are you waiting for? Download the
              'beAware' app right now to start discovering and enjoying its
              multiple benefits right now
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>About Digital Studios</Text>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.text}>
              This app is promoted by{' '}
              <Text style={styles.accent}>DIGITAL STUDIOS</Text>, a technology
              solution company which is interested in building technological
              tools to ease the functioning of other businesses. Our mission is
              to help other companies take full advantage of technological tools
              to ease their processes and increase their efficiency. At Digital
              Studios, we pride ourselves on delivering quality software
              development services that meet the unique needs of our clients
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Contact Digital Studios</Text>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.sectionContent}>
            <Text style={{textAlign: 'justify'}}>
              You can contact us by visiting our website: {'\n'}
            </Text>
            <TouchableOpacity
              style={{marginTop: -10}}
              onPress={async () => {
                await Linking.openURL('https://www.ultradominon.com/ds');
                // await Linking.openSettings();
                // navigation.navigate('Webview', {url: uri})
              }}>
              <Text style={styles.link}>https://www.ultradominon.com/ds</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>You can also follow us on </Text>
              <TouchableOpacity
              onPress={()=>Linking.openURL('https://www.facebook.com/uddigitalstudios?mibextid=ZbWKwL')}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.link}> Facebook</Text>
                <RemixIcon
                  name="facebook-circle-fill"
                  size={20}
                  color={light.brandPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{height: 30}} />
      </Content>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionContainer: {
    marginVertical: 5,
  },
  sectionContent: {
    paddingHorizontal: 12,
    borderLeftWidth: 2,
    marginLeft: 12,
    borderLeftColor: light.placeholder,
    marginBottom: 12,
  },
  divider: {
    backgroundColor: light.placeholder,
    flex: 1,
    height: 2,
    marginEnd: 12,
  },
  accent: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    color: light.brandPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  text: {
    textAlign: 'justify',
    lineHeight: 25,
    fontSize: 14,
  },
});
