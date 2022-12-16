/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import GoogleButton from './src/components/GoogleButton';
import Home from './src/screens/Home';
import AppleHealthKit from 'react-native-health';

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
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
        {user ? <Home /> : <GoogleButton setUser={setUser} />}
      </View>
    </SafeAreaView>
  );
};

export default App;
