import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  Platform,
  LogBox,
  StyleSheet,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SkinDetector from './src/screens/skinDetector';
// ignore warnings
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Wrapper>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={{flex: 1}}>
          {/* <Text>Hello</Text> */}
          <SkinDetector />
        </View>
      </GestureHandlerRootView>
    </Wrapper>
  );
}

const Wrapper = ({children}) => {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={[styles.container, styles.containerWhiteBackground]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  return (
    <View style={[styles.container, styles.containerWhiteBackground]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWhiteBackground: {
    backgroundColor: '#fff',
  },
});
