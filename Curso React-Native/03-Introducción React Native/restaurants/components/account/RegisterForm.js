import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    return (
        <View style={styles.form}>
            <Input
                placeholder="Ingresa tu email"
                containerStyle={styles.input}
            />
            <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" :"eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => {setShowPassword(!showPassword);}}
                    />
                }
            />
            <Input
                placeholder="Confirmar tu contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showConfirmPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showConfirmPassword ? "eye-off-outline" :"eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => {setConfirmPassword(!showConfirmPassword);}}

                    />
                }
            />

            <Button
                title="Registrar nuevo usuario"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
    },
    input: {
        width: "100%"
    },
    buttonContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    button: {
        backgroundColor: "#442484",
        borderRadius: 40
    },
    icon: {
        color: "#c1c1c1"
    }
})
