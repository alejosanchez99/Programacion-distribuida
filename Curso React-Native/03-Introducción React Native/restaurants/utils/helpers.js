import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';


export function validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email)
}

export const loadImageFromGallery = async (array) => {
    const response = { status: false, image: null };
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
    if(resultPermissions.status === "denied"){
        Alert.alert("Debes de darle permiso para acceder a las imagenes del teléfono.");
        return response; 
    }

    console.log("entro");

    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    });
    
    if(result.cancelled){
        return response;
    }

    response.status = true;
    response.image = result.uri;

    return response;
}

export const fileToBlob = async(path) => {
    const file = await fetch(path);
    const blob = await file.blob();
}