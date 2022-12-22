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
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import GoogleButton from './src/components/GoogleButton';
import Home from './src/screens/Home';
import {ApolloProvider} from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';
import sendFcmToken from './src/services/TokenService';
import initFitness from './src/services/FitnessService';

const App: () => Node = () => {
  const [user, setUser] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [client, setClient] = useState(null);
  useEffect(() => {
    sendFcmToken();
    initFitness();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const clientApollo = makeApolloClient('');
      await setClient(clientApollo);
    };
    fetchSession();
  }, []);

  const backgroundStyle = {
    backgroundColor: '#E47DFD',
    height: '100%',
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
        {user ? <Home user={user} /> : <GoogleButton setUser={setUser} />}
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
