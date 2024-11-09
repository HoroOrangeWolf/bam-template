import {StyleSheet, Text, TextInput, View, Button, FlatList, Switch} from 'react-native';

import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<string[]>([]);
    const [encryptedNotes, setEncryptedNotes] = useState<string[]>([]);
    const [encrypted, setEncrypted] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const fetch = async () => {
            const rawNotes= await AsyncStorage.getItem('unencrypted-notes');

            if (!rawNotes) {
                return
            }

            setNotes((buff)=>([...buff, ...JSON.parse(rawNotes)]));
        }

        fetch()
            .catch(console.error)
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const rawNotes= await SecureStore.getItemAsync('encrypted-notes', {
                requireAuthentication: true
            });

            if (!rawNotes) {
                return
            }

            setNotes((buff)=>([...buff,...JSON.parse(rawNotes)]))
        }

        fetch()
            .catch(console.error)
    }, []);

    const addNote = async () => {
       try {
           if (!note.trim()) {
               return;
           }

           setNote('');

           if (encrypted) {
               const mergedNotes = [...encryptedNotes, note]
               setEncryptedNotes(mergedNotes);
               console.log('TEST');
               await SecureStore.setItemAsync('encrypted-notes', JSON.stringify(mergedNotes), {
                   requireAuthentication: true
               });

               return;
           }

           const mergedNotes = [...notes, note]
           setNotes(mergedNotes);

           await AsyncStorage.setItem('unencrypted-notes', JSON.stringify(mergedNotes));
       } catch (e) {
           console.error('Error',e)
       }
    };

    return (
        <View style={styles.container}>
            <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()}/>
            <Text style={styles.title}>Notatki</Text>

            <TextInput
                style={styles.input}
                placeholder="Wpisz swoją notatkę..."
                value={note}
                onChangeText={setNote}
            />
            <View style={styles.switchContainer}>
                <Text>Czy zaszyfrować notatkę?</Text>
                <Switch
                    value={encrypted}
                    onValueChange={()=>setEncrypted(!encrypted)}
                />
            </View>
            <Button title="Dodaj notatkę" onPress={addNote}/>
            <FlatList
                data={[...notes, ...encryptedNotes]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Text style={styles.note}>{item}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
    },
    note: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});