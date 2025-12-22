
// import GlobalLoading from '@/components/GlobalLoading';
// import tw from '@/lib/tailwind';
// import { useGetMyProfileQuery } from '@/redux/myProfile/myprofile';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const EditProfileScreen = () => {
//   const router = useRouter();
//   const [fullName, setFullName] = React.useState('');
//   const [userName, setUserName] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [phoneNumber, setPhoneNumber] = React.useState('');
//   const [instaId, setInstaId] = React.useState('');

//   const handleSaveChanges = () => {
//     // Handle save profile changes logic here
//   };

//   const { data, isLoading } = useGetMyProfileQuery();

//   console.log(data);

//   const user_info = data?.data?.user_info


//   const inputStyle = tw`border border-gray-300 rounded-lg h-12 px-4 text-base`;

//   return isLoading ? <GlobalLoading /> : (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <StatusBar barStyle="dark-content" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//       >
//         {/* Header */}
//         <View style={tw`p-4 flex-row items-center`}>
//           <TouchableOpacity onPress={() => router.back()} style={tw`p-1`}>
//             <Ionicons name="arrow-back" size={24} color="#1D0303" />
//           </TouchableOpacity>
//           <Text
//             style={tw`text-2xl font-RoboBold text-[#1D0303] text-center flex-1 -ml-8`}
//           >
//             Edit Profile
//           </Text>
//         </View>

//         <ScrollView contentContainerStyle={tw`pb-24`}>
//           {/* Profile Picture Section */}
//           <View style={tw`items-center mt-4 mb-8`}>
//             <View>
//               <Image
//                 source={{
//                   uri: user_info?.avatar_url,
//                 }}
//                 style={tw`w-32 h-32 rounded-full`}
//               />
//               <TouchableOpacity
//                 style={tw`absolute bottom-0 right-0 bg-[#1D0303] w-8 h-8 rounded-full justify-center items-center`}
//               >
//                 <Ionicons name="camera-outline" size={16} color="white" />
//               </TouchableOpacity>
//             </View>

//             <Text style={tw`text-base text-gray-500`}>{user_info?.user_name}</Text>
//           </View>

//           {/* Form Fields */}
//           <View style={tw`px-5`}>
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>
//                 Full Name
//               </Text>
//               <TextInput
//                 style={inputStyle}
//                 placeholder="Enter your full name"
//                 value={user_info?.full_name}
//                 onChangeText={setFullName}
//                 autoCapitalize="words"
//                 returnKeyType="next"
//               />
//             </View>

//             <View style={tw`mb-4`}>
//               <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>
//                 User Name
//               </Text>
//               <TextInput
//                 style={inputStyle}
//                 placeholder="Enter your user name"
//                 value={user_info?.user_name}
//                 onChangeText={setUserName}
//                 autoCapitalize="none"
//                 returnKeyType="next"
//               />
//             </View>

//             <View style={tw`mb-4`}>
//               <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>
//                 Address
//               </Text>
//               <TextInput
//                 style={inputStyle}
//                 placeholder="Enter your address"
//                 value={user_info?.address}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 returnKeyType="next"
//               />
//             </View>


//             <View style={tw`mb-6`}>
//               <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>
//                 Phone Number
//               </Text>
//               <TextInput
//                 style={inputStyle}
//                 placeholder="Enter your phone number"
//                 keyboardType="phone-pad"
//                 value={user_info?.phone_number}
//                 onChangeText={setPhoneNumber}
//               />
//             </View>

//             {/* Save Changes Button */}
//             <View style={tw`px-5`}>
//               <TouchableOpacity
//                 onPress={handleSaveChanges}
//                 style={tw`bg-[#1D0303] rounded-xl py-4 items-center`}
//               >
//                 <Text style={tw`text-white text-base font-RoboBold`}>
//                   Save Changes
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default EditProfileScreen;


import GlobalLoading from '@/components/GlobalLoading';
import tw from '@/lib/tailwind';
import { useUserGetProfileQuery } from '@/redux/authApi/authApiSlice';
import { useUpdatedProfileMutation } from '@/redux/myProfile/myprofile';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const EditProfileScreen = () => {
  const router = useRouter();

  const [fullName, setFullName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [image, setImage] = React.useState<any>(null); // selected image

  const [updatedProfile, { isLoading: isUpdating }] = useUpdatedProfileMutation();

  const { data, isLoading } = useUserGetProfileQuery();
  const user_info = data?.data?.user

  React.useEffect(() => {
    if (user_info) {
      setFullName(user_info.full_name || '');
      setUserName(user_info.user_name || '');
      setAddress(user_info.address || '');
      setPhoneNumber(user_info.phone_number || '');
      setImage({ uri: user_info.avatar_url } as any);
    }
  }, [user_info]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // console.log(image);


  const handleSaveChanges = async () => {
    const formData = new FormData();

    formData.append('full_name', fullName);
    formData.append('user_name', userName);
    formData.append('address', address);
    formData.append('phone_number', phoneNumber);

    if (image && image.uri && !image.uri.startsWith('http')) {
      const fileName = image.uri.split('/').pop();
      const match = /\.(\w+)$/.exec(fileName!);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('avatar', {
        uri: image.uri,
        name: fileName,
        type,
      } as any);
    }

    // Example: send to backend
    try {
      const res = await updatedProfile(formData).unwrap();
      console.log(res);

      // Alert.alert('Success', 'Profile updated successfully!');
    } catch (err) {
      console.log(err);

      // Alert.alert('Error', 'Something went wrong while updating profile');
    }
  };

  const inputStyle = tw`border border-gray-300 rounded-lg h-12 px-4 text-base`;

  if (isLoading) return <GlobalLoading />;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={tw`p-4 flex-row items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-1`}>
            <Ionicons name="arrow-back" size={24} color="#1D0303" />
          </TouchableOpacity>
          <Text
            style={tw`text-2xl font-RoboBold text-[#1D0303] text-center flex-1 -ml-8`}
          >
            Edit Profile
          </Text>
        </View>

        <ScrollView contentContainerStyle={tw`pb-24`}>
          {/* Profile Picture Section */}
          <View style={tw`items-center mt-4 mb-8`}>
            <View>
              <Image
                source={image ? { uri: image.uri } : require('@/assets/images/carton.png')}
                style={tw`w-32 h-32 rounded-full`}
              />
              <TouchableOpacity
                onPress={pickImage}
                style={tw`absolute bottom-0 right-0 bg-[#1D0303] w-8 h-8 rounded-full justify-center items-center`}
              >
                <Ionicons name="camera-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={tw`text-base text-gray-500`}>{userName}</Text>
          </View>

          {/* Form Fields */}
          <View style={tw`px-5`}>
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>Full Name</Text>
              <TextInput
                style={inputStyle}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>User Name</Text>
              <TextInput
                style={inputStyle}
                placeholder="Enter your user name"
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>
                Email
              </Text>
              <TextInput
                style={tw`border border-gray-300 rounded-lg h-12 px-4 text-base`}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
            <View style={tw`mb-6`}>
              <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>
                Password
              </Text>
              <TextInput
                style={tw`border border-gray-300 rounded-lg h-12 px-4 text-base`}
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={tw`mb-6`}>
              <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>Phone Number</Text>
              <TextInput
                style={inputStyle}
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>

            {/* Save Changes Button */}
            <View style={tw`px-5`}>
              <TouchableOpacity
                onPress={handleSaveChanges}
                disabled={isUpdating}
                style={tw`bg-[#1D0303] rounded-xl py-4 items-center flex-row justify-center ${isLoading ? 'opacity-70' : ''
                  }`}
              >
                {isUpdating ? (
                  <View style={tw`flex-row gap-4 items-center`}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={tw`text-white text-base font-RoboBold`}>
                      Save Changes
                    </Text>
                  </View>
                ) : (
                  <Text style={tw`text-white text-base font-RoboBold`}>
                    Save Changes
                  </Text>
                )}
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
