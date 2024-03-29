/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import GoogleButton from './src/components/GoogleButton';
import Home from './src/screens/Home';
import AppleHealthKit from 'react-native-health';
import {ApolloProvider} from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const App: () => Node = () => {

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('token is', token);
      await axios.post('http://127.0.0.1:3000/register', {token});
    } catch (err) {
      //Do nothing
      console.log(err.response.data);
      return;
    }
  };

  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.StepCount,
      ],
      // write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  };

  const [user, setUser] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [client, setClient] = useState(null);
  useEffect(() => {
    sendFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const fetchSession = async () => {
      const clientApollo = makeApolloClient('');
      await setClient(clientApollo);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (Platform.OS === 'ios') {
        AppleHealthKit.initHealthKit(permissions, (error: string) => {
          /* Called after we receive a response from the system */
          if (error) {
            console.log('[ERROR] Cannot grant permissions!');
          }
        });
      } else {
        await GoogleFit.checkIsAuthorized();
        if (!GoogleFit.isAuthorized) {
          const options = {
            scopes: [
              Scopes.FITNESS_ACTIVITY_READ,
              Scopes.FITNESS_ACTIVITY_WRITE,
              Scopes.FITNESS_BODY_READ,
              Scopes.FITNESS_BODY_WRITE,
            ],
          };
          GoogleFit.authorize(options)
            .then(authResult => {
              if (authResult.success) {
                console.log('AUTH_SUCCESS');
              } else {
                console.log('AUTH_DENIED', authResult.message);
              }
            })
            .catch(() => {
              console.log('AUTH_ERROR');
            });
        }
      }
      // You can await here

      // ...
    }
    fetchData();
  }, []);

  const backgroundStyle = {
    backgroundColor: '#E47DFD',
  };

  if (!client) {
    return <></>;
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <View
          style={{
            height: '100%',
          }}>
          {user ? <Home user={user} /> : <GoogleButton setUser={setUser} />}
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
