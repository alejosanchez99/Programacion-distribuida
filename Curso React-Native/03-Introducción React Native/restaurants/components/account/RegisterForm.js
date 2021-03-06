import { size } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

import { validateEmail } from "../../utils/helpers";
import { registerUser } from "../../utils/actions";
import Loading from '../Loading';

export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onChange = (e, type) => {
        setFormData({
            ...formData, [type]:
                e.nativeEvent.text
        });
    }

    const doRegisterUser = async () => {
        if (!validateData()) {
            return;
        }

        setLoading(true);

        const result = await registerUser(formData.email, formData.password);

        setLoading(false);

        if (!result.statusResponse) {
            setErrorEmail(result.error);
            return;
        }

        navigation.navigate("account");
    }

    const validateData = () => {
        setErrorConfirm("");
        setErrorEmail("");
        setErrorPassword("");

        let isValid = true;

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email válido.");
            isValid = false;
        }

        if (size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña de al menos 6 caracteres.");
            isValid = false;
        }

        if (size(formData.confirmPassword) < 6) {
            setConfirmPassword("Debes ingresar una confirmación de contraseña de al menos 6 caracteres.");
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            setConfirmPassword("La contraseña y la confirmación no son iguales.");
            setErrorConfirm("La contraseña y la confirmación no son iguales.");
            isValid = false;
        }

        return isValid;
    }

    return (
        <View style={styles.form}>
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
            <Input
                placeholder="Confirmar tu contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showConfirmPassword}
                errorMessage={errorConfirm}
                defaultValue={formData.confirmPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => { setConfirmPassword(!showConfirmPassword); }}

                    />
                }
                onChange={(e) => onChange(e, "confirmPassword")}
            />

            <Button
                title="Registrar nuevo usuario"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={() => doRegisterUser()}
            />
            <Loading isVisible={loading} text="Creando cuenta" />
        </View>
    )
}


const defaultFormValues = () => {
    return {
        email: "",
        password: "",
        confirmPassword: ""
    };
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
