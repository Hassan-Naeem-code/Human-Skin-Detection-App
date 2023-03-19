import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {getPixelRGBA} from 'react-native-pixel-color';

const SkinDetector = () => {
  const [image, setImage] = useState(null);
  const [isSkinDetected, setIsSkinDetected] = useState(false);
  useEffect(() => {
    (async () => {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      detectSkin(result.uri);
    }
  };
  const detectSkin = async uri => {
    const pixelColor = await getPixelRGBA(uri, 0, 0);
    const [red, green, blue] = pixelColor.slice(0, 3);
    if (
      red > 95 &&
      green > 40 &&
      blue > 20 &&
      Math.max(red, green, blue) - Math.min(red, green, blue) > 15 &&
      Math.abs(red - green) > 15 &&
      red > green &&
      red > blue
    ) {
      setIsSkinDetected(true);
    } else {
      setIsSkinDetected(false);
    }
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
