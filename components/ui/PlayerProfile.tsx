import { instaicon } from '@/assets/icons/Icon'
import tw from '@/lib/tailwind'
import { useUserGetProfileQuery } from '@/redux/authApi/authApiSlice'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'
import GlobalLoading from '../GlobalLoading'


const StatItem = ({ value, label }: { value: string; label: string }) => (
    <View style={tw`items-center`}>
        <Text style={tw`text-2xl font-RoboBold text-[#1D0303]`}>{value}</Text>
        <Text style={tw`text-xs font-RoboNormal text-gray-600 mt-1`}>{label}</Text>
    </View>
);

const InfoCard = ({ title, children, buttonText, onButtonPress }: { title: string, children: React.ReactNode, buttonText?: string, onButtonPress?: () => void }) => (
    <View style={tw`bg-[#E8E7E7]/20  rounded-2xl p-4 w-full mb-5`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-base font-RoboMedium text-[#1D0303]`}>{title}</Text>
            {buttonText && (
                <TouchableOpacity onPress={onButtonPress} style={tw`bg-[#1D0303] rounded-md px-3 py-1`}>
                    <Text style={tw`text-white text-xs font-RoboMedium`}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
        {children}
    </View>
);

const ListItem = ({ icon, iconBg, title, subtitle, actionText }: { icon: any, iconBg: string, title: string, subtitle?: string, actionText?: string }) => (
    <>
        <View style={tw`flex-row items-center justify-between py-2`}>
            <View style={tw`flex-row items-center`}>
                <View style={tw`w-8 h-8 rounded-full justify-center items-center mr-3 ${iconBg}`}>
                    <Ionicons name={icon} size={16} color="#03AA00" />
                </View>
                <View>
                    <Text style={tw`text-sm font-RoboNormal text-black`}>{title}</Text>
                    {subtitle && <Text style={tw`text-[10px] text-gray-500`}>{subtitle}</Text>}
                </View>
            </View>
            {actionText && (
                <TouchableOpacity style={tw`border border-[#1D0303] rounded-lg px-3 py-1`}>
                    <Text style={tw`text-[11px] font-RoboMedium text-[#1D0303]`}>{actionText}</Text>
                </TouchableOpacity>
            )}
        </View>
        <View style={tw`h-px bg-gray-200 my-1`} />
    </>
);


const PlayerProfile = () => {

    const { data, isLoading } = useUserGetProfileQuery();

    const player_profile = data?.data?.user

    return isLoading ? <GlobalLoading /> : (
        <View>
            <ScrollView contentContainerStyle={tw`pb-4 items-center px-5`}>
                {/* Profile Info */}
                <View style={tw`items-center mt-4`}>
                    <Image source={{
                        uri: player_profile?.avatar_url
                    }} style={tw`w-32 h-32 rounded-full mb-4`} />
                    <Text style={tw`text-2xl font-RoboBold text-[#1D0303]`}>{player_profile?.full_name}</Text>
                    <Text style={tw`text-base text-gray-500`}>{player_profile?.user_name}</Text>
                    <TouchableOpacity style={tw`bg-transparent border border-[#F58529] rounded-full px-4 py-2 mt-4 flex-row items-center gap-2`}>
                        <SvgXml xml={instaicon} />
                        <Text style={tw`text-[#8134AF] font-bold text-lg font-RoboBold`}>Follow Me</Text>
                    </TouchableOpacity>
                </View>
                {/* nothing */}

                {/* Followers/Following */}
                <View style={tw`bg-white shadow-lg rounded-lg flex-row justify-around p-4 my-6 w-full max-w-xs`}>
                    <TouchableOpacity onPress={() => router.push("/profile/followingList")} style={tw`items-center`}>
                        <Text style={tw`text-xl font-RoboMedium`}>1.2k</Text>
                        <Text style={tw`text-sm text-gray-500`}>Following</Text>
                    </TouchableOpacity>
                    <View style={tw`h-full w-px bg-gray-200`} />
                    <TouchableOpacity onPress={() => router.push('/profile/followerList')} style={tw`items-center`}>
                        <Text style={tw`text-xl font-RoboMedium`}>2.2k</Text>
                        <Text style={tw`text-sm text-gray-500`}>Followers</Text>
                    </TouchableOpacity>
                </View>

                {/* Player Stats */}
                <InfoCard title="Player Stats">
                    <View style={tw`flex-row justify-around pt-2`}>
                        <StatItem value="12" label="Events Joined" />
                        <StatItem value="$850" label="Total Winnings" />
                        <StatItem value="#3" label="Top Rank" />
                    </View>

                    {/* Profile Actions */}
                    <View style={tw`mx-5 gap-3`}>
                        <TouchableOpacity onPress={() => router.push('/modals/report_user')} style={tw`w-full bg-[#FFF4E5] border border-[#D46A00] rounded-[14px] py-3 items-center`}>
                            <Text style={tw`text-[#D46A00] text-[16px] font-semibold`}>Report Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/modals/delete_user')} style={tw`w-full bg-[#FEE6E6] rounded-[14px] py-3 items-center`}>
                            <Text style={tw`text-[#DA0000] text-[16px] font-semibold`}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </InfoCard>
            </ScrollView>
        </View>
    )
}

export default PlayerProfile