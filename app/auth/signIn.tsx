import MainButton from '@/components/Mainbutton';
import GoogleLogin from '@/components/ui/GoogleLogin';
import { LoginApiPayloade } from '@/lib/auth-interface/authType';
import tw from '@/lib/tailwind';
import { useUserLoginMutation } from '@/redux/authApi/authApiSlice';
import { LoginSchema } from '@/schema/auth-schema';
import { Ionicons } from '@expo/vector-icons'; // Using Expo's vector icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// A simple component to recreate the Google icon


const SignIn: React.FC = () => {
  const router = useRouter();


  const { role } = useLocalSearchParams<{ role?: string }>();
  const [userLogin, { isLoading }] = useUserLoginMutation();


  // Handler for the login button press
  const handleLogin = async (values: LoginApiPayloade) => {

    try {

      const res = await userLogin(values).unwrap();
      console.log(res);
      await AsyncStorage.setItem('token', res?.data?.token);
      await AsyncStorage.setItem('role', res?.data?.user?.role);
      router.replace(`/(drawer)/(tabs)`)

    } catch (error) {
      console.log(error);

    }

    // console.log('Login attempt with:', { email, password });
    // router.replace(`/(drawer)/(tabs)?role=${role}`);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        {/* Back Button */}
        <View style={tw`absolute top-12 left-5 z-10`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
            <Ionicons name="arrow-back" size={24} color="#1D0303" />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-1 justify-center px-8`}>
          <Text style={tw`text-3xl font-RoboBold text-primary text-center mb-10`}>
            Welcome Back
          </Text>

          {/* FORM START */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {/* Email Input */}
                <View style={tw`w-full mb-4`}>
                  <Text style={tw`text-base font-RoboNormal text-primary mb-2`}>
                    Email
                  </Text>
                  <TextInput
                    style={tw`border border-[#C5B2B2] rounded-xl h-12 px-4 text-base`}
                    placeholder="Enter your email"
                    placeholderTextColor="#B6B6B6"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && (
                    <Text style={tw`text-red-500 text-sm mt-1`}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={tw`w-full`}>
                  <Text style={tw`text-base font-RoboNormal text-primary mb-2`}>
                    Password
                  </Text>
                  <TextInput
                    style={tw`border border-[#C5B2B2] rounded-xl h-12 px-4 text-base`}
                    placeholder="Enter your password"
                    placeholderTextColor="#B6B6B6"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <Text style={tw`text-red-500 text-sm mt-1`}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Forget Password */}
                <TouchableOpacity
                  onPress={() => router.push("/auth/forgotPasswrod")}
                  style={tw`self-end mt-2`}
                >
                  <Text style={tw`text-sm font-RoboNormal text-primary`}>
                    Forget Password?
                  </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <MainButton handleNavigate={() => handleSubmit()} isLoading={isLoading} title="Log in" />
              </>
            )}
          </Formik>
          {/* FORM END */}

          {/* Divider */}
          <View style={tw`flex-row items-center my-6`}>
            <View style={tw`flex-1 h-px bg-gray-200`} />
            <Text style={tw`mx-4 text-sm font-RoboNormal text-primary`}>OR</Text>
            <View style={tw`flex-1 h-px bg-gray-200`} />
          </View>

          {/* Google Button */}
          <GoogleLogin />

          {/* Register */}
          <View style={tw`flex-row justify-center mt-6`}>
            <Text style={tw`text-base font-RoboNormal text-primary`}>
              You don’t have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/auth/signUp",
                  params: { role: role?.toUpperCase() },
                })
              }
            >
              <Text style={tw`text-base font-semibold font-RoboBold text-primary`}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
