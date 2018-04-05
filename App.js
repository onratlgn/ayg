import React from 'react';
import { StyleSheet, Text, View, Button, Alert,TouchableOpacity} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
//import DropdownAlert from 'react-native-dropdownalert';
import { Image } from 'react-native';
import {Player} from 'react-native-audio-toolkit';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100}}
          source={require('./aygaz.png')}
        />
      </View>
    );
  }
}

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

const client = new Client({ uri: 'ws://iot.eclipse.org:80/ws', clientId: 'clientId', storage: myStorage });

client.connect()
.then(() => {
  // Once a connection has been made, make a subscription and send a message.
  console.log('onConnect');
  return client.subscribe('aygaz');
})
client.on('messageReceived', (message) => {
  console.log(message.payloadString);
  Alert.alert(
    "Siparişi Onayla ?",
    message.payloadString,
    [
      {text: 'İptal', onPress: () => console.log('Denied'), style: 'cancel'},
      {text: 'Onay', onPress: () => console.log('Confirmed')},
    ],
    { cancelable: false }
  )
});

//https://github.com/testshallpass/react-native-dropdownalert


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
