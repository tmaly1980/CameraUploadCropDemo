/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text, TouchableOpacity, Image,
  View, Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class App extends Component {
  state = {
    image: null
  }
  camera() {
    ImagePicker.openCamera({
      width: 1000, // crop width
      height: 1000, // crop height
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState({ image })
    });
  }
  render() {
    return (
    <View style={styles.container}>

      <View style={styles.preview}>
        { this.state.image ? (
          <View style={styles.imageRow}>
            <Image style={styles.image} resizeMode='contain' source={require(this.state.image.path)} />
          </View>
        ) : (<Text>Please take a photo first</Text>)}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => this.camera()}><Text style={styles.buttonText}>TAKE PHOTO</Text></TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#33CC33',
    padding: 10
  },
  buttonText: {
    color: '#000'
  },
  preview: {
    flex: 1,
    backgroundColor: '#0f0',
    width: Dimensions.get('window').width - 25,
    margin: 10
  },
  imageRow: {
    width: 200,
    height: 200
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});

AppRegistry.registerComponent('CameraUploadCropDemo41', () => CameraUploadCropDemo41);
