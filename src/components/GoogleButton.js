import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleButton = ({setUser}) => {
  GoogleSignin.configure({
    androidClientId:
      '81514394714-atof3fa38e3khdhc89gtumoqu3187b69.apps.googleusercontent.com',
    iosClientId:
      '11981908921-4rc2cbllll4t04j59mio6b3e77k9kn52.apps.googleusercontent.com',
  });

  const onButtonPress = () => {
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              console.log('user logged in');
              console.log(userInfo);
              setUser(userInfo);
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
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={onButtonPress}
    />
  );
};

export default GoogleButton;
