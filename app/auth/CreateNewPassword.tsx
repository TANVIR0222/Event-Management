import MainButton from '@/components/Mainbutton';
import tw from '@/lib/tailwind';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ConfirmationValue } from '@/lib/auth-interface/authType';
import { useChangePasswordMutation } from '@/redux/authApi/authApiSlice';
import { PasswordSchema } from '@/schema/auth-schema';
import { Formik } from 'formik';


const CreateNewPassword: React.FC = () => {
  const [change_pass, { isLoading }] = useChangePasswordMutation()

  const handleSubmit = async (values: ConfirmationValue) => {
    try {
      const res = await change_pass(values).unwrap();
      if (res?.status) {
        router.push('/(drawer)/(tabs)')
      }

    } catch (error) {
      Alert.alert('Error', 'Password change failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>

        {/* Back Button */}
        <View style={tw`absolute top-12 left-5 z-10`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-2`}>
            <Ionicons name="arrow-back" size={24} color="#1D0303" />
          </TouchableOpacity>
        </View>

        <View style={tw` flex-1 justify-center px-8`}>

          <Text style={tw`text-3xl font-RoboBold text-primary text-center mb-12`}>
            Create New Password
          </Text>

          {/* Formik Form */}
          <Formik
            initialValues={{
              password: '',
              password_confirmation: '',
            }}
            validationSchema={PasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>

                {/* New Password */}
                <View style={tw`mb-5`}>
                  <Text style={tw`text-base font-RoboNormal text-primary mb-2`}>
                    New Password
                  </Text>

                  <TextInput
                    style={tw`border border-[#C5B2B2] rounded-xl h-12 px-4 text-base`}
                    placeholder="Enter new password"
                    placeholderTextColor="#B6B6B6"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />

                  {touched.password && errors.password && (
                    <Text style={tw`text-red-500 mt-1 text-sm`}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Confirm Password */}
                <View>
                  <Text style={tw`text-base font-RoboNormal text-primary mb-2`}>
                    Confirm Password
                  </Text>

                  <TextInput
                    style={tw`border border-[#C5B2B2] rounded-xl h-12 px-4 text-base`}
                    placeholder="Confirm new password"
                    placeholderTextColor="#B6B6B6"
                    secureTextEntry
                    value={values.password_confirmation}
                    onChangeText={handleChange('password_confirmation')}
                  />

                  {touched.password_confirmation && errors.password_confirmation && (
                    <Text style={tw`text-red-500 mt-1 text-sm`}>
                      {errors.password_confirmation}
                    </Text>
                  )}
                </View>

                {/* Update Password Button */}

                <MainButton handleNavigate={() => handleSubmit()} isLoading={isLoading} title="Update Password" />

              </View>
            )}
          </Formik>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateNewPassword;


{/* <MainButton handleNavigate={() => handleSubmit()} isLoading={isLoading} title="Log in" /> */ }