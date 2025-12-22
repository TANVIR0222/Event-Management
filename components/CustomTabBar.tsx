import { CreateActiveIcon, CreateIcon, HomeActiveIcon, Homeicon, PerformenceActiveIcon, PerformenceIcon, ProfileActiveIcon, ProfileIcon, TransactionActiveIcon, TransactionIcon } from "@/assets/icons/Icon";
import tw from "@/lib/tailwind";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const organizationtabs = [
    { name: "/home", label: "Home", activeicon: <SvgXml xml={HomeActiveIcon} />, inactiveicon: <SvgXml xml={Homeicon} /> },
    { name: "/createevent", label: "Create", activeicon: <SvgXml xml={CreateActiveIcon} />, inactiveicon: <SvgXml xml={CreateIcon} /> },
    { name: "/transaction", label: "Transaction", activeicon: <SvgXml xml={TransactionActiveIcon} />, inactiveicon: <SvgXml xml={TransactionIcon} /> },
    { name: "/performence", label: "Performance", activeicon: <SvgXml xml={PerformenceActiveIcon} />, inactiveicon: <SvgXml xml={PerformenceIcon} /> },
    { name: "/profile", label: "Profile", activeicon: <SvgXml xml={ProfileActiveIcon} />, inactiveicon: <SvgXml xml={ProfileIcon} /> },
] as const;

export default function CustomTabBar() {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname === "/" || pathname === "/(drawer)/(tabs)") {
            router.replace("/home");
        }
    }, [pathname, router]);

    return (
        <View
            style={tw`flex-row bg-white border-t ${Platform.OS === "ios" ? "h-[120px]" : "h-[90px]"} border-t-gray-300 py-[18px] justify-around items-center`}
        >
            {organizationtabs.map((tab) => {

                const isActive = pathname === tab.name || pathname.startsWith(tab.name + "/");

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => router.push(tab.name as any)}
                        style={tw`items-center justify-center`}
                    >
                        {isActive ? tab.activeicon : tab.inactiveicon}

                        <Text style={tw`text-xs ${isActive ? 'text-primary' : 'text-gray-500'} mt-0.5 font-bold`}>
                            {tab.label}
                        </Text>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}