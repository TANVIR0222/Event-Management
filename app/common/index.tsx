import { MyFormValues } from "@/interface/event";
import tw from "@/lib/tailwind";
import { useUserPasswordChangeMutation } from "@/redux/authApi/authApiSlice";
import { changePasswordValidationSchema } from "@/schema/auth-schema";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [userPasswordChange, { isLoading }] =
        useUserPasswordChangeMutation();

    const toggleVisibility = (field: "current" | "new" | "confirm") =>
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const handleSuccess = (resetForm: () => void) => {
        resetForm();
        Alert.alert("Success", "Password changed successfully", [
            {
                text: "OK",
                onPress: () => router.replace("/(drawer)/(tabs)/profile"),
            },
        ]);
    };

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleKeyboardShow = (event: any) => {
        setIsKeyboardVisible(true);
    };

    const handleKeyboardHide = (event: any) => {
        setIsKeyboardVisible(false);
    };


    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                {/* Header */}
                <View style={tw`flex-row items-center p-4`}>
                    {/* Left */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={tw`w-10`}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1D0303" />
                    </TouchableOpacity>

                    {/* Center */}
                    <View style={tw`flex-1 items-center`}>
                        <Text style={tw`text-2xl font-RoboBold text-[#1D0303]`}>
                            Update Password
                        </Text>
                    </View>

                    {/* Right (balance) */}
                    <View style={tw`w-10`} />
                </View>

                <Formik<MyFormValues>
                    initialValues={{
                        current_password: '',
                        password: '',
                        password_confirmation: '',
                    }}
                    validationSchema={changePasswordValidationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const res = await userPasswordChange(values).unwrap();
                            if (res?.status) handleSuccess(resetForm);
                        } catch (error) {
                            Alert.alert('Error', 'Failed to change password. Please try again.');
                        }
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={tw`flex-grow justify-between px-5 `}
                        >
                            {/* Form */}
                            <View>
                                <View style={tw`items-center mt-6 mb-4`}>
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={60}
                                        color="#1D0303"
                                    />
                                </View>

                                {[
                                    {
                                        label: 'Current Password',
                                        field: 'current_password',
                                        secure: !show.current,
                                        toggle: () => toggleVisibility('current'),
                                        showIcon: show.current,
                                    },
                                    {
                                        label: 'New Password',
                                        field: 'password',
                                        secure: !show.new,
                                        toggle: () => toggleVisibility('new'),
                                        showIcon: show.new,
                                    },
                                    {
                                        label: 'Confirm Password',
                                        field: 'password_confirmation',
                                        secure: !show.confirm,
                                        toggle: () => toggleVisibility('confirm'),
                                        showIcon: show.confirm,
                                    },
                                ].map(({ label, field, secure, toggle, showIcon }) => (
                                    <View key={field} style={tw`mb-4`}>
                                        <Text style={tw`text-black text-base mb-2`}>
                                            {label}
                                        </Text>

                                        <View
                                            style={tw`flex-row items-center border border-[#888888] rounded-lg px-3 py-1`}
                                        >
                                            <TextInput
                                                secureTextEntry={secure}
                                                style={tw`flex-1 h-10 text-base text-black`}
                                                placeholder="* * * * * * *"
                                                onChangeText={handleChange(field)}
                                                onBlur={handleBlur(field)}
                                                value={(values as any)[field]}
                                            />
                                            <Feather
                                                onPress={toggle}
                                                name={showIcon ? 'eye-off' : 'eye'}
                                                size={18}
                                                style={tw`text-[#888888]`}
                                            />
                                        </View>

                                        {touched[field as keyof typeof touched] &&
                                            errors[field as keyof typeof errors] && (
                                                <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                                                    {errors[field as keyof typeof errors]}
                                                </Text>
                                            )}
                                    </View>
                                ))}
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                disabled={isLoading}
                                style={tw`${isLoading ? 'opacity-60' : ''} bg-red-500 p-3 rounded flex-row justify-center items-center mt-6`}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={tw`text-white text-center`}>
                                        Change Password
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
