import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { closeSession } from '../../utils/actions';

export default function UserLogged() {

    const navigation = useNavigation();
    return (
        <View>
            <Text>UserLogged...</Text>
            <Button
                title="Cerrar sesión"
                onPress={() => {
                    closeSession();
                    navigation.navigate("restaurants");
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
