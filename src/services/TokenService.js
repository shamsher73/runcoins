import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import Config from 'react-native-config';

const sendFcmToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('token is NODE_TOKEN_URL', Config.NODE_TOKEN_URL);
    await axios.post(Config.NODE_TOKEN_URL, {token});
  } catch (err) {
    //Do nothing
    console.log(err.response.data);
    return;
  }
};

export default sendFcmToken;
