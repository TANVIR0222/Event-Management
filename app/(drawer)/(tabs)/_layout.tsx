import CustomTabBar from "@/components/CustomTabBar";
import PlayerCustomTabBar from "@/components/ui/PlayerCustomTabBar";
import tw from "@/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StatusBar, View } from "react-native";

export default function TabLayout() {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false); // loading done
        }
    };

    useEffect(() => {
        loadRole();
    }, []);

    // const isLoading = true;

    // SHOW LOADING UNTIL ROLE LOADED
    if (loading) {
        return (
            <View style={tw`flex-1 justify-center bg-white items-center`}>
                <StatusBar barStyle="dark-content" />

                {/* Splash logo container */}
                <View style={tw`flex-1 relative justify-center items-center`}>
                    <Image
                        style={[tw`w-[274px] h-[107px]`]}
                        source={require('@/assets/images/logo.png')}
                        resizeMode="contain"
                    />
                    <View style={tw`absolute bottom-20 `}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                </View>
            </View>

        );
    }

    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: "none" },
            }}
            tabBar={() =>
                role === "PLAYER"
                    ? <PlayerCustomTabBar />
                    : <CustomTabBar />
            }
        />
    );
}
