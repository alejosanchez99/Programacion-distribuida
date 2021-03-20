import { isEmpty } from 'lodash';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { updateProfile } from "../../utils/actions";

export function ChangeDisplayNameForm({ displayName, setShowModal, toastRef, setReloadUser }) {
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const result = await updateProfile({ displayName: newDisplayName });

        if (!result.statusResponse) {
            setError("Error al actualizar nombres y apellidos, intenta nuevamente");
            return;
        }

        setReloadUser(true);
        toastRef.current.show("Se ha actualizado nombres y apellidos.", 3000);
        setShowModal(false);
    }

    const validateForm = () => {
        setError(null);

        if (isEmpty(newDisplayName)) {
            setError("Debe ingresar nombres y apellidos.");
            return false;
        }

        if (newDisplayName === displayName) {
            setError("Debe ingresar nombres y apellidos diferentes a los actuales.");
            return false;
        }

        return true;
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa nombres y apellidos"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
            />
            <Button
                title="Cambiar nombres y apellidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})
