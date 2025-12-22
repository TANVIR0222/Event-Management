import MainButton from '@/components/Mainbutton';
import tw from '@/lib/tailwind';
import { useResendOTPMutation, useUserVerifyOTPMutation } from '@/redux/authApi/authApiSlice';

import { Ionicons } from '@expo/vector-icons'; // Using Expo's vector icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const OtpVerify: React.FC = () => {
  const [code, setCode] = useState('');
  const codeDigits = 6; // Number of digits in the OTP
  const { email, from } = useLocalSearchParams<{ email: string; from: string }>()
  const [verify_otp_verify, { isLoading }] = useUserVerifyOTPMutation();


  // Ref to focus the hidden text input
  const textInputRef = useRef<TextInput>(null);
  const [resed_otp_email] = useResendOTPMutation();

  const handlePress = () => {
    textInputRef.current?.focus();
  };

  const handleRestOTP = async () => {
    try {
      const res = await resed_otp_email({ email: email }).unwrap()
      if (res?.status) {
        Alert.alert(
          "Success",
          "OTP has been sent successfully, check your email"
        );
        setCode("")
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  }



  const handleNavigate = async () => {



    if (code.length === 6) {

      try {
        const res = await verify_otp_verify({ otp: code }).unwrap();
        console.log(res?.data?.token);
        console.log(res?.data?.user?.role);
        await AsyncStorage.setItem('token', res?.data?.token);
        if (res?.status) {

          // Save token
          // storage.set("token", res?.data?.token);

          // Determine destination based on role or source

          if (from === "reset-password") {
            router.push('/auth/CreateNewPassword');
          } else {
            router.push("/(drawer)/(tabs)")
          }

          // Navigate to destination
          // router.push(destination);
        }

      } catch (error: any) {
        alert(error?.message)
      }
    } else {
      Alert.alert("OTP Error", "Please enter a valid 6-digit OTP code.");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        {/* Header with Back Button */}
        <View style={tw`absolute top-12 left-5 z-10`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
            <Ionicons name="arrow-back" size={24} color="#1D0303" />
          </TouchableOpacity>
        </View>

        {/* Main container */}
        <View style={tw`flex-1 justify-center px-8`}>
          <Text
            style={tw`text-3xl font-RoboBold text-primary text-center mb-4`}>
            Verification Code
          </Text>
          <Text
            style={tw`text-sm font-RoboNormal text-primary text-center mb-12`}>
            We sent a reset link to contact@dscode.com enter 6 digit code that
            is mentioned in the email
          </Text>

          {/* OTP Input Section */}
          <Pressable onPress={handlePress} style={tw`w-full`}>
            <View
              style={tw`flex-row justify-between items-center w-full`}
              pointerEvents="none">
              {Array.from({ length: codeDigits }).map((_, index) => {
                const digit = code[index] || '';
                const isFocused = index === code.length;

                return (
                  <View
                    key={index}
                    style={tw.style(
                      `w-12 h-12 border border-[#C5B2B2] rounded-lg justify-center items-center`,
                      isFocused && `border-primary border-2`
                    )}>
                    <Text style={tw`text-xl text-center text-primary`}>
                      {digit}
                    </Text>
                  </View>
                );
              })}
            </View>
            <TextInput
              ref={textInputRef}
              style={tw`absolute w-px h-px -top-full opacity-0`} // Hide the input
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={codeDigits}
              autoFocus={true}
            />
          </Pressable>
          <TouchableOpacity
            style={tw`items-end`}
            onPress={() => handleRestOTP()}
          >
            <Text style={tw` text-gray-400 text-base  font-bold`}>
              Resend
            </Text>
          </TouchableOpacity>

          {/* Enter Button */}
          {/* <TouchableOpacity
            style={tw`bg-primary rounded-xl py-3.5 items-center mt-12`}
            onPress={handleNavigate}>
            <Text style={tw`text-white text-base font-RoboMedium`}>Enter</Text>
          </TouchableOpacity> */}
          <MainButton handleNavigate={handleNavigate} isLoading={isLoading} title="Enter" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerify;
