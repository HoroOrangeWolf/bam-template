import {useColorScheme} from "@/hooks/useColorScheme";
import {Button, StyleSheet, Text, TextInput, View,Image} from "react-native";
import React, {useState} from "react";
import axios from "axios";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {ThemedView} from "@/components/ThemedView";
import {router, useNavigation} from "expo-router";
import {Manifest} from "@expo/config-plugins/build/android";
import * as FileSystem from 'expo-file-system';

import Constants from "expo-constants";

const { manifest2 } = Constants;

// const uri = `http://${manifest2.extra.expoGo.debuggerHost.split(':')[0]}:8085`;
//
// console.log(FileSystem.documentDirectory)

export default function TabLayout() {
    const [login, setLogin] =  useState('');
    const [password, setPassword] =  useState('');
    const [res, setResponse] = useState<string>();

    const handleSubmit = () => {
        setResponse(undefined);
        router.navigate('/(tabs)')
        // axios.post(`${uri}/secured/login`, {login, password})
        //     .then((res)=>{
        //         console.log('Logged user', res);
        //         router.navigate('/(tabs)')
        //         setResponse(JSON.stringify(res.data));
        //     })
        //     .catch((err: any)=>{
        //         console.error('Error', JSON.stringify(err));
        //         setResponse(err?.response?.data);
        //     })
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
                <View style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 11
                }}>
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
