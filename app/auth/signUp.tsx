import tw from '@/lib/tailwind';
import { Ionicons } from '@expo/vector-icons'; // Using Expo's vector icons
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';

import MainButton from '@/components/Mainbutton';
import { useUserRegisterMutation } from '@/redux/authApi/authApiSlice';
import { SignUpSchema } from '@/schema/auth-schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUp: React.FC = () => {

  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const [role, setRole] = useState<string>('');


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('role');
      console.log('register', value);
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
  // Handler for the register button press
  const handleRegister = async (values: any) => {
    console.log(values);

    try {
      const res = await userRegister(values).unwrap();

      if (res.status) {
        router.push({
          pathname: '/auth/otpVerify',
          params: {
            from: 'register',
            email: values.email
          },
        })
      }

    } catch (error) {
      console.error('Error registering user:', error);
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

        <Formik
          initialValues={{
            full_name: '',
            user_name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            termsAccepted: false,
            role: 'PLAYER',
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <ScrollView contentContainerStyle={tw`flex-grow justify-center px-8`}>

              <Text style={tw`text-3xl font-RoboBold text-primary text-center mb-8`}>
                Create Account
              </Text>

              {/* Full Name */}
              <View style={tw`w-full mb-4 gap-2`}>
                <Text style={tw`input-label`}>Full Name</Text>
                <TextInput
                  style={tw`input rounded-xl border border-[#C5B2B2] px-4 h-12`}
                  placeholder="Enter your full name"
                  placeholderTextColor="#B6B6B6"
                  value={values.full_name}
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                />
                {touched.full_name && errors.full_name && (
                  <Text style={tw`text-red-500 text-xs ml-1`}>{errors.full_name}</Text>
                )}
              </View>

              {/* Username */}
              <View style={tw`w-full mb-4 gap-2`}>
                <Text style={tw`input-label`}>User Name</Text>
                <TextInput
                  style={tw`input rounded-xl border border-[#C5B2B2] px-4 h-12`}
                  placeholder="Enter your user name"
                  placeholderTextColor="#B6B6B6"
                  value={values.user_name}
                  onChangeText={handleChange('user_name')}
                  onBlur={handleBlur('user_name')}
                  autoCapitalize="none"
                />
                {touched.user_name && errors.user_name && (
                  <Text style={tw`text-red-500 text-xs ml-1`}>{errors.user_name}</Text>
                )}
              </View>

              {/* Email */}
              <View style={tw`w-full mb-4 gap-2`}>
                <Text style={tw`input-label`}>Email</Text>
                <TextInput
                  style={tw`input rounded-xl border border-[#C5B2B2] px-4 h-12`}
                  placeholder="Enter your email"
                  placeholderTextColor="#B6B6B6"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text style={tw`text-red-500 text-xs ml-1`}>{errors.email}</Text>
                )}
              </View>

              {/* Phone */}
              <View style={tw`w-full mb-4 gap-2`}>
                <Text style={tw`input-label`}>Phone (Optional)</Text>
                <TextInput
                  style={tw`input rounded-xl border border-[#C5B2B2] px-4 h-12`}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#B6B6B6"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={tw`w-full mb-4 gap-2`}>
                <Text style={tw`input-label`}>Password</Text>
                <TextInput
                  style={tw`input rounded-xl border border-[#C5B2B2] px-4 h-12`}
                  placeholder="Enter your password"
                  placeholderTextColor="#B6B6B6"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={tw`text-red-500 text-xs ml-1`}>{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password */}
              <View style={tw`w-full mb-4 gap-2`}>
                <Text style={tw`input-label`}>Confirm Password</Text>
                <TextInput
                  style={tw`input rounded-xl border border-[#C5B2B2] px-4 h-12`}
                  placeholder="Confirm your password"
                  placeholderTextColor="#B6B6B6"
                  value={values.password_confirmation}
                  onChangeText={handleChange('password_confirmation')}
                  onBlur={handleBlur('password_confirmation')}
                  secureTextEntry
                />
                {touched.password_confirmation && errors.password_confirmation && (
                  <Text style={tw`text-red-500 text-xs ml-1`}>{errors.password_confirmation}</Text>
                )}
              </View>

              {/* Terms & Conditions */}
              <TouchableOpacity
                style={tw`flex-row items-center my-4`}
                onPress={() =>
                  setFieldValue('termsAccepted', !values.termsAccepted)
                }
              >
                <Ionicons
                  name={values.termsAccepted ? 'checkbox' : 'checkbox-outline'}
                  size={24}
                  color="#1D0303"
                />
                <Text style={tw`ml-2 text-sm text-primary`}>
                  I accept the Terms & Conditions
                </Text>
              </TouchableOpacity>

              {touched.termsAccepted && errors.termsAccepted && (
                <Text style={tw`text-red-500 text-xs ml-1`}>{errors.termsAccepted}</Text>
              )}

              {/* Register Button */}
              <MainButton handleNavigate={() => handleSubmit()} isLoading={isLoading} title='Register' />

              {/* Login */}
              <View style={tw`flex-row justify-center mt-6`}>
                <Text style={tw`text-sm font-RoboNormal text-primary`}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/auth/signIn')}>
                  <Text style={tw`text-sm font-RoboBold text-primary`}>Login</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          )}
        </Formik>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
