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

const futch = (url, opts={}, onProgress) => {
  console.log(url, opts)
  return new Promise( (res, rej)=>{
      var xhr = new XMLHttpRequest();
      xhr.open(opts.method || 'get', url);
      for (var k in opts.headers||{})
          xhr.setRequestHeader(k, opts.headers[k]);
      xhr.onload = e => res(e.target);
      xhr.onerror = rej;
      if (xhr.upload && onProgress)
          xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
      xhr.send(opts.body);
  });
}

export default class App extends Component {
  state = {
    image: null,
    progress: null,
    uploading: false
  }

  camera() {
    ImagePicker.openCamera({
      width: 1000, // desired crop width
      height: 1000, // desired crop height
      includeBase64: true,
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState({ image, uploading: false })
    });
  }

  upload () {
    const url = 'http://mytown.dev/reactNativeUpload' // 'http://192.168.0.2:6000' // IP/URL of server upload script

    const data = new FormData();
    // data.append('file', {
    //   uri: this.state.image.path,
    //   type: this.state.image.mime,
    //   name: 'file'
    // });
    futch(url, {
      method: 'post',
      // body: data
      body: { name : 'file', filename : 'file', data: this.state.image.data},
    }, (progressEvent) => {
      const progress = parseInt(progressEvent.loaded / progressEvent.total * 100);
      console.log(progress);
      this.setState({ uploading: true, progress })

    }).then(res => {
      console.log(res)
      this.setState({ uploading: false })
    }).catch(err => {
      console.error(err)
      this.setState({ uploading: false })
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
