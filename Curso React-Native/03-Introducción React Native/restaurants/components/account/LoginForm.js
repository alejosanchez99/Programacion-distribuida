import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

import Loading from '../Loading';
import { validateEmail } from "../../utils/helpers";
import { loginUserWithEmailAndPassword } from '../../utils/actions';
import { isEmpty } from 'lodash';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onChange = (e, type) => {
        setFormData({
            ...formData, [type]:
                e.nativeEvent.text
        });
    }

    const doLogin = async() => {
        if (!validateData()) {
            return;
        }

        setLoading(true);

        const result = await loginUserWithEmailAndPassword(formData.email, formData.password);

        setLoading(false);

        if (!result.statusResponse) {
            setErrorEmail(result.error);
            return;
        }

        navigation.navigate("account");
    }

    const validateData = () => {
        setErrorEmail("");
        setErrorPassword("");

        let isValid = true;

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email válido.");
            isValid = false;
        }

        if (isEmpty(formData.password)) {
            setErrorPassword("Debes de ingresar tu contraseña válido.");
            isValid = false;
        }

        return isValid;
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Ingresa tu email"
                containerStyle={styles.input}
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => { setShowPassword(!showPassword); }}
                    />
                }
                onChange={(e) => onChange(e, "password")}
            />

            <Button
                title="Iniciar sesión"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text="Iniciando sesión" />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        email: "",
        password: ""
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
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
