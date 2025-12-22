import { DiscoverActiveIcon, Discovericon, LeaderboardActiveIcon, LeaderboardIcon, NearMeActiveIcon, NearMeIcon, ProfileActiveIcon, ProfileIcon, TransactionActiveIcon, TransactionIcon } from "@/assets/icons/Icon";
import tw from "@/lib/tailwind";
import { router, usePathname } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";


const playertabs = [
    { name: "/", label: "Discover", activeicon: <SvgXml xml={DiscoverActiveIcon} />, inactiveicon: <SvgXml xml={Discovericon} /> },
    { name: "/nearme", label: "Near Me", activeicon: <SvgXml xml={NearMeActiveIcon} />, inactiveicon: <SvgXml xml={NearMeIcon} /> },
    { name: "/transaction", label: "Transaction", activeicon: <SvgXml xml={TransactionActiveIcon} />, inactiveicon: <SvgXml xml={TransactionIcon} /> },
    { name: "/leaderboard", label: "Leaderboard", activeicon: <SvgXml xml={LeaderboardActiveIcon} />, inactiveicon: <SvgXml xml={LeaderboardIcon} /> },
    { name: "/profile", label: "Profile", activeicon: <SvgXml xml={ProfileActiveIcon} />, inactiveicon: <SvgXml xml={ProfileIcon} /> },
] as const;

export default function PlayerCustomTabBar() {
    const pathname = usePathname();


    return (
        <View
            style={tw`flex-row bg-white border-t border-t-gray-300 py-[18px] justify-around items-center`}
        >
            {playertabs?.map((tab) => {
                const isActive = pathname === tab.name;

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