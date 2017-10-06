# CameraUploadCropDemo
React Native demo for photo upload and cropping

## Installation
1) Run `yarn install` to install packages
2) Run `react-native link` to link packages
3) For iOS, open XCode to run on iPhone device, or for Android, open Android Studio 

## Dependencies
This sample project uses these packages/dependencies:

https://github.com/ivpusic/react-native-image-crop-picker: Photo picker and cropper
https://github.com/wkh237/react-native-fetch-blob: File transfer of photo from mobile app to backend 

Follow the install instructions within those packages for proper linking and native building

## Demo component
The demo component resides in App.js . To copy to your custom project, add the above dependencies to your package.json 
(via `yarn add react-native-fetch-blob react-native-image-crop-picker`) and follow setup instructions for their native
code integration.

You may need to enable 'Arbitrary Loads' to your Info.plist under 'App Transport Security' if you plan on using non-secure http:// addresses.

## Upload demo server
A demo upload backend has been provided in `phpUpload`. Simply run it from your top level folder via: `php -S 192.168.0.2:6000 -t phpUpload` 
(with your actual IP address provided)
