import {Platform} from 'react-native';
import AppleHealthKit from 'react-native-health';
import GoogleFit, {Scopes} from 'react-native-google-fit';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
    ],
    // write: [AppleHealthKit.Constants.Permissions.Steps],
  },
};

const initFitness = async () => {
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
};

export default initFitness;
