import { menuicon } from '@/assets/icons/Icon';
import OrganizerProfile from '@/components/ui/OrganizerProfile';
import PlayerProfile from '@/components/ui/PlayerProfile';
import tw from '@/lib/tailwind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SvgXml } from 'react-native-svg';



// --- Main Screen ---
const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();

    const [role, setRole] = useState<string | null>(null);

    const loadRole = async () => {
        try {
            const storedRole = await AsyncStorage.getItem("role");
            if (storedRole) {
                setRole(storedRole);
            } else {
                console.log("No role found in storage");
            }
        } catch (err) {
            console.log("Error reading role:", err);
        }
    };

    useEffect(() => {
        loadRole();
    }, []);



    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <StatusBar barStyle="dark-content" />
            {/* Header */}
            <View style={tw`p-4 items-center mt-6 flex-row justify-between`}>

                <TouchableOpacity onPress={() => (navigation as any).openDrawer()}>
                    <SvgXml xml={menuicon} />
                </TouchableOpacity>
                <Text style={tw`text-3xl font-RoboBold text-[#1D0303]`}>My Profile</Text>
            </View>

            {
                role === 'PLAYER' ? (
                    <PlayerProfile />
                ) :
                    <OrganizerProfile />
            }

        </SafeAreaView>
    )
}

export default ProfileScreen