import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {getPixelRGBA} from 'react-native-pixel-color';
import * as ImageCropPicker from 'react-native-image-crop-picker';
import {Image as ImageCompressor} from 'react-native-compressor';
import ImageColors from 'react-native-image-colors';
import hexRgb from 'hex-rgb';
import * as ImageManipulator from 'react-native-image-manipulator';
import OpenCV from 'react-native-opencv3';

const SkinDetector = () => {
  const [image, setImage] = useState(null);
  const [isSkinDetected, setIsSkinDetected] = useState(false);

  const pickImage = async () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    }).then(async image => {
      const result = await ImageCompressor.compress(image.path, {
        maxHeight: 400,
        maxWidth: 400,
        quality: 1,
      });
      setImage(result);
      detectSkin(result);
    });
  };
  const detectSkin = async uri => {
    console.log('inside detect skin', uri);
    const result = await ImageColors.getColors(uri, {
      fallback: '#228B22',
      cache: true,
      key: uri,
    });
    if (result) {
      const rgbPrimary = hexRgb(result?.primary);
      const rgbBackground = hexRgb(result?.background);
      console.log('rgb of primary', rgbPrimary);
      console.log('rgb of background', rgbBackground);
      if (
        (rgbPrimary?.red > 95 &&
          rgbPrimary?.green > 40 &&
          rgbPrimary?.blue > 20 &&
          Math.max(rgbPrimary?.red, rgbPrimary?.green, rgbPrimary?.blue) -
            Math.min(rgbPrimary?.red, rgbPrimary?.green, rgbPrimary?.blue) >
            15 &&
          Math.abs(rgbPrimary?.red - rgbPrimary?.green) > 15 &&
          rgbPrimary?.red > rgbPrimary?.green &&
          rgbPrimary?.red > rgbPrimary?.blue) ||
        (rgbBackground?.red > 95 &&
          rgbBackground?.green > 40 &&
          rgbBackground?.blue > 20 &&
          Math.max(
            rgbBackground?.red,
            rgbBackground?.green,
            rgbBackground?.blue,
          ) -
            Math.min(
              rgbBackground?.red,
              rgbBackground?.green,
              rgbBackground?.blue,
            ) >
            15 &&
          Math.abs(rgbBackground?.red - rgbBackground?.green) > 15 &&
          rgbBackground?.red > rgbBackground?.green &&
          rgbBackground?.red > rgbBackground?.blue)
      ) {
        setIsSkinDetected(true);
      } else {
        setIsSkinDetected(false);
      }
    } else {
    }
    console.log('inside detect skin result', result);

    // primary: '#6C5A4E',
    // platform: 'ios',
    // secondary: '#000000',
    // detail: '#000000',
    // background: '#BB987A'

    // const pixelColor = await getPixelRGBA(uri, 0, 0);
    // console.log('pixelColor', pixelColor);
    // const [red, green, blue] = pixelColor.slice(0, 3);
    // console.log('red, green, blue', red, green, blue);
    // if (
    //   red > 95 &&
    //   green > 40 &&
    //   blue > 20 &&
    //   Math.max(red, green, blue) - Math.min(red, green, blue) > 15 &&
    //   Math.abs(red - green) > 15 &&
    //   red > green &&
    //   red > blue
    // ) {
    //   setIsSkinDetected(true);
    // } else {
    //   setIsSkinDetected(false);
    // }

    // open cv

    // const imgMat = await cv.imreadAsync(path);
    // const hsvMat = new Mat();
    // cv.cvtColor(imgMat, hsvMat, cv.COLOR_RGBA2RGB, 0);
    // cv.cvtColor(hsvMat, hsvMat, cv.COLOR_RGB2HSV, 0);
    // const skinMask = new Mat();
    // cv.inRange(
    //   hsvMat,
    //   new cv.Scalar(0, 20, 70),
    //   new cv.Scalar(25, 255, 255),
    //   skinMask,
    // );
    // const skinColor = cv.mean(hsvMat, skinMask);
    // setIsSkinDetected(skinColor);
  };
  return (
    <View style={styles.container}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{uri: image}} style={styles.image} />}
      {isSkinDetected && <Text style={styles.text}>Skin detected!</Text>}
      {!isSkinDetected && <Text style={styles.text}>No skin detected</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
export default SkinDetector;
