import tw from '@/lib/tailwind';
import { useUserGetProfileQuery } from '@/redux/authApi/authApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, StatusBar, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


const AnimatedImage = Animated.createAnimatedComponent(Image);


const SplashScreen: React.FC = () => {

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const { data, isLoading } = useUserGetProfileQuery();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = data?.data?.token;
        const role = data?.data?.user?.role;
        console.log('index-role', role);

        if (token && role) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user_role_id', role);
        }

        const savedToken = await AsyncStorage.getItem('token');



        // Run animation
        opacity.value = withTiming(1, { duration: 1200 });
        scale.value = withTiming(1, { duration: 1000 });

        // Navigate after animation
        setTimeout(() => {
          if (savedToken) {
            router.replace('/(drawer)/(tabs)');
          } else {
            router.replace('/onboarding/thirdOnboarding');
          }
        }, 1500);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/onboarding/thirdOnboarding');
      }
    };

    if (!isLoading) {
      checkAuth();
    }
  }, [data, isLoading, opacity, scale]);


  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />

      {/* Splash logo container */}
      <View style={tw`flex-1 justify-center items-center`}>
        <AnimatedImage
          style={[tw`w-[274px] h-[107px]`, animatedStyle]}
          source={require('@/assets/images/logo.png')}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

