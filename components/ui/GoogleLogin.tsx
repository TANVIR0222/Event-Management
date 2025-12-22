import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
// import { useSocialLoginMutation } from '../redux/authApi/authApiSlice'
import { googleicon } from "@/assets/icons/Icon"
import tw from "@/lib/tailwind"
import { useSocialLoginMutation } from "@/redux/authApi/authApiSlice"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function GoogleLogin() {

    const [socialLogin] = useSocialLoginMutation()
    const [role, setRole] = useState<string>('');


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('role');
            setRole(value as string);

            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            console.log(e);

            // error reading value
        }
    };
    getData();


    // sign in google
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "155156964790-bg116hiv4vv47tdadnc4l69mmq8jan2l.apps.googleusercontent.com",
            offlineAccess: true,
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            // Original data
            const data = {
                google_id: response?.data?.user?.id,
                email: response?.data?.user?.email,
                full_name: response?.data?.user?.name,
                avatar: response?.data?.user?.photo, // uri
                role: role,
            };

            // Create FormData
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === "avatar" && data.avatar) {
                    // avatar is a uri, so we need name and type
                    formData.append("avatar", {
                        uri: data.avatar,
                        name: "avatar.jpg",
                        type: "image/jpeg",
                    } as any);
                } else {
                    formData.append(key, data[key]);
                }
            });

            // RTK Query call with FormData
            const res = await socialLogin(formData).unwrap();


            if (res?.status) {
                await AsyncStorage.setItem('role', res?.user?.role);
                router.replace('/(drawer)/(tabs)')
            }


        } catch (error) {

            console.log(error);

        }
    };


    return (
        <View>
            <TouchableOpacity
                style={tw`bg-white rounded-xl border border-[#C5B2B2] py-3 flex-row items-center justify-center`}
                onPress={() => signIn()}

            >
                <SvgXml xml={googleicon} />
                <Text style={tw`text-primary text-base font-semibold font-RoboMedium ml-3`}>
                    Continue with Google
                </Text>
            </TouchableOpacity>
        </View>
    )
}