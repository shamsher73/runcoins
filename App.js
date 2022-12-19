/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import GoogleButton from './src/components/GoogleButton';
import Home from './src/screens/Home';
import AppleHealthKit from 'react-native-health';
import {ApolloProvider} from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';

const App: () => Node = () => {
  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.StepCount,
      ],
      // write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  };

  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
    }
  });

  const [user, setUser] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [client, setClient] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      const clientApollo = makeApolloClient('');
      await setClient(clientApollo);
    };
    fetchSession();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            height: '100%',
          }}>
          {user ? <Home user={user}/> : <GoogleButton setUser={setUser} />}
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
