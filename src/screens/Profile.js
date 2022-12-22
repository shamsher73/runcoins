import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const Profile = ({user, balance}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.balance}>
          <Text>Balance ${balance}</Text>
        </View>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          {user.photo ? (
            <Image
              style={styles.image}
              source={{
                uri: user.photo,
              }}
            />
          ) : (
            <View style={styles.textAvatar}>
              <Text style={styles.textStyle}>{user.name.charAt(0)}</Text>
            </View>
          )}
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Name:{user.name}</Text>
                <Text style={styles.modalText}>Email:{user.email}</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: user.photo,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance: {
    width: 100,
    height: 50,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    fontSize: 24,
  },
});

export default Profile;
