import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureException } from "@sentry/react-native";
import { getNetworkStateAsync } from "expo-network";
import Toast from "react-native-toast-message";

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        captureException(e);

        console.log("Error caching data: " + e);
        // saving error
    }
};
const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.log("Error retrieving cached data: " + e);
        captureException(e);

        // error reading value
    }
};
export async function FetchAndCache(operationName, endpoint, method, body={}) {
    try {
        let networkState = await getNetworkStateAsync();
        if (networkState.isInternetReachable){
            const response = await fetch(process.env.EXPO_PUBLIC_DATA_AB_URL + endpoint, {
                method: method,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: method === "GET" ? undefined : JSON.stringify(body)
            })
            let data = await response.json();
            let dataUsed =  {status: response.status, data: data, statusText: response.statusText}
            await storeData(operationName, dataUsed)
            return dataUsed;
        } else {
            let data = await getData(operationName)
            if(data !== null){
                return JSON.parse(data)
            } else {
                Toast.show({type: "error", text1: "Network Connection Error"})
            }
        }
    } catch (e) {
        console.error("FAC error: " + e);
        captureException(e);

    }

}
