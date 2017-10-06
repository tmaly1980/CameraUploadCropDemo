/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet, Alert,
  Text, TouchableOpacity, Image,
  View, Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob'

export default class App extends Component {
  state = {
    image: null,
    progress: null,
    uploading: false
  }

  camera() {
    ImagePicker.openCamera({
      width: 1000, // desired crop width <-- CUSTOMIZE
      height: 1000, // desired crop height <-- CUSTOMIZE
      includeBase64: true,
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState({ image, uploading: false })
    });
  }

  upload () { 
    const url = 'http://192.168.0.2:6000' // IP/URL of server upload script <-- CUSTOMIZE

    console.log("UPLOADING...")
    console.log(this.state.image)
    this.setState({ uploading: true })

    RNFetchBlob.config({timeout: 10000}).fetch('POST', url, {
      'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'file', filename : 'file', type: this.state.image.mime, data: RNFetchBlob.wrap(this.state.image.path) } // this.state.image.data},
    ]).uploadProgress((written, total) => {
      console.log('uploaded', written / total)
      const progress = parseInt((written / total) * 100)
      this.setState({ progress })
    }).then((resp) => {
      console.log('response=')
      console.log(resp)
      this.setState({ uploading: false, image: false })
      Alert.alert('Upload successful response', resp.data)
    }).catch((err) => {
      console.log('Could not upload')
      console.error(err)
      this.setState({ uploading: false })
      // ...
    })
  }

  render() {
    return (
    <View style={styles.container}>

      <View style={styles.preview}>
        { this.state.image ? (
          <View style={styles.imageRow}>
            <Image style={styles.image} resizeMode='contain' source={{uri: 'data:'+this.state.image.mime+';base64,'+this.state.image.data}} />
          </View>
        ) : (<Text>Please take a photo first</Text>)}
      </View>
      { this.state.uploading ? (
        <Text>Uploading.... { this.state.progress }%</Text>
      ) : (
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => this.camera()}><Text style={styles.buttonText}>TAKE PHOTO</Text></TouchableOpacity>
        { this.state.image ? 
          (<TouchableOpacity style={styles.button} onPress={() => this.upload()}><Text style={styles.buttonText}>UPLOAD PHOTO</Text></TouchableOpacity>) : null }
      </View>
      )}
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
    backgroundColor: '#ccc',
    width: Dimensions.get('window').width - 25,
    margin: 10
  },
  imageRow: {
    flex: 1
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width
  }
});

AppRegistry.registerComponent('CameraUploadCropDemo41', () => CameraUploadCropDemo41);
