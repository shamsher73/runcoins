import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoogleButton = ({setUser}) => {
  GoogleSignin.configure({
    androidClientId: Config.ANDROID_CLIENT_ID,
    iosClientId: Config.IOS_CLIENT_ID,
  });

  const register = async userInfo => {
    const admin_secret = Config.HASURA_ADMIN_SECRET;
    const url = Config.HASURA_URL;
    const query = `mutation($userId: String!, $userEmail: String) {
      insert_users(objects: [{
        id: $userId, email: $userEmail, last_seen: "now()"
      }], on_conflict: {constraint: users_pkey, update_columns: [last_seen, email]}
      ) {
        affected_rows
      }
    }`;

    const variables = {userId: userInfo.id, userEmail: userInfo.email};

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': admin_secret,
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });
  };

  const onButtonPress = () => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('loggedUser', jsonValue);
      } catch (e) {
        // saving error
      }
    };

    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              register(userInfo.user);
              setUser(userInfo.user);
              storeData(userInfo.user);

            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };
  return (
    <View style={{justifyContent: 'center', height: '100%'}}>
      <GoogleSigninButton
        style={{width: 192, height: 48, alignSelf: 'center'}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onButtonPress}
      />
    </View>
  );
};

export default GoogleButton;
