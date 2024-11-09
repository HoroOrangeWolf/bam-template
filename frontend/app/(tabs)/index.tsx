import {SafeAreaView, Image, StyleSheet, Text, TextInput, View, Button} from 'react-native';

import React, {useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {ThemedView} from "@/components/ThemedView";
import axios, {AxiosError} from "axios";

import Constants from "expo-constants";

const { manifest2 } = Constants;

console.log('TT', manifest2)

const uri = `http://${'10.100.7.113'}:8085`;

export default function HomeScreen() {
  const [login, setLogin] =  useState('');
  const [password, setPassword] =  useState('');
  const [res, setResponse] = useState<string>();

  const handleSubmit = () => {
      setResponse(undefined);
      axios.post(`${uri}/secured/login`, {login, password})
          .then((res)=>{
              console.log('Logged user', res);
              setResponse(JSON.stringify(res.data));
          })
          .catch((err: any)=>{
              console.error('Error', JSON.stringify(err));
              setResponse(err?.response?.data);
          })
  }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <View>
                    {res && (
                        <Text>
                            {res}
                        </Text>
                    )}
                    <Text>
                        Login
                    </Text>
                    <TextInput value={login} onChangeText={setLogin} style={{borderWidth: 1, borderStyle: 'solid'}} />
                    <Text>
                        Password
                    </Text>
                    <TextInput value={password} onChangeText={setPassword} style={{borderWidth: 1, borderStyle: 'solid'}} />
                    <Button title={'Login'} onPress={handleSubmit}/>
                </View>
            </ThemedView>
        </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
