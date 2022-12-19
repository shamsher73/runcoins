import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';

const GoogleButton = ({setUser}) => {
  GoogleSignin.configure({
    androidClientId:
      '81514394714-atof3fa38e3khdhc89gtumoqu3187b69.apps.googleusercontent.com',
    iosClientId:
      '11981908921-4rc2cbllll4t04j59mio6b3e77k9kn52.apps.googleusercontent.com',
  });

  const register = async userInfo => {
    const admin_secret = 'myadminsecretkey';
    const url = 'http://localhost:8080/v1/graphql';
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
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              register(userInfo.user);
              setUser(userInfo.user);
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
