import { instaicon } from '@/assets/icons/Icon'
import tw from '@/lib/tailwind'
import { useGetOrganizerProfileQuery } from '@/redux/organizer/organizerApi'
import { router } from 'expo-router'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
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


const OrganizerProfile = () => {

    const { data, isLoading } = useGetOrganizerProfileQuery()


    const organizer_profile = data?.data?.user_info
    const organizer_follower_info = data?.data?.follower_info
    const organizer_events_status = data?.data?.events_status
    const events = data?.data?.recent_events


    return isLoading ? <GlobalLoading /> : (
        <ScrollView contentContainerStyle={tw`pb-4 items-center px-5`}>
            {/* Profile Info */}
            <View style={tw`items-center mt-4`}>
                <Image source={{
                    uri: organizer_profile?.avatar_url
                }} style={tw`w-32 h-32 rounded-full mb-4`} />
                <Text style={tw`text-2xl font-RoboBold text-[#1D0303]`}>{organizer_profile?.full_name}</Text>
                <Text style={tw`text-base text-gray-500`}>{organizer_profile?.user_name}</Text>
                <TouchableOpacity style={tw`bg-transparent border border-[#F58529] rounded-full px-4 py-2 mt-4 flex-row items-center gap-2`}>
                    <SvgXml xml={instaicon} />
                    <Text style={tw`text-[#8134AF] font-bold text-lg font-RoboBold`}>Follow Me</Text>
                </TouchableOpacity>
            </View>
            {/* nothing */}

            {/* Followers/Following */}
            <View style={tw`bg-white shadow-lg rounded-lg flex-row justify-around p-4 my-6 w-full max-w-xs`}>
                <TouchableOpacity onPress={() => router.push("/profile/followingList")} style={tw`items-center`}>
                    <Text style={tw`text-xl font-RoboMedium`}>0</Text>
                    <Text style={tw`text-sm text-gray-500`}>Following</Text>
                </TouchableOpacity>
                <View style={tw`h-full w-px bg-gray-200`} />
                <TouchableOpacity onPress={() => router.push('/profile/followerList')} style={tw`items-center`}>
                    <Text style={tw`text-xl font-RoboMedium`}>{organizer_follower_info?.followers}</Text>
                    <Text style={tw`text-sm text-gray-500`}>Followers</Text>
                </TouchableOpacity>
            </View>

            {/* Player Stats */}
            <InfoCard title="Player Stats">
                <View style={tw`flex-row justify-around pt-2`}>
                    <StatItem value={`${organizer_events_status?.total_events}`} label="Events Joined" />
                    <StatItem value={`${organizer_events_status?.completed}`} label="Completed" />
                    <StatItem value={`${organizer_events_status?.upcoming}`} label="Upcoming" />
                    <StatItem value={`${organizer_events_status?.canceled}`} label="Canceled" />

                </View>
            </InfoCard>

            <View style={tw`bg-white rounded-lg shadow-md w-full p-4 mb-5`}>
                <Text style={tw`text-lg font-semibold mb-3`}>Recent Events</Text>
                {events?.length ? (
                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-200`} />}
                        renderItem={({ item }) => (
                            <View style={tw`flex-row justify-between py-2 items-center`}>
                                <Text style={tw`text-base`}>{item.title}</Text>
                                <Text
                                    style={tw`text-sm font-semibold px-3 py-1 rounded-full bg-[#E6FEE6] text-[rgba(3,170,0,1)]`}
                                >
                                    {item.status}
                                </Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={tw`text-gray-400 text-center py-4`}>No recent events found</Text>
                )}
            </View>



            {/* Profile Actions */}
            <View style={tw`flex-row mx-5 gap-3 mt-4`}>
                {/* Report Profile Button */}
                {/* <TouchableOpacity
                    onPress={() => router.push('/modals/report_user')}
                    style={tw`flex-1 bg-[#FFF4E5] border border-[#D46A00] rounded-[14px] py-3 items-center`}
                >
                    <Text style={tw`text-[#D46A00] text-base font-semibold`}>Report Profile</Text>
                </TouchableOpacity> */}

                {/* Delete Account Button */}
                <TouchableOpacity
                    onPress={() => router.push('/modals/delete_user')}
                    style={tw`flex-1 bg-[#FEE6E6] rounded-[14px] py-3 items-center`}
                >
                    <Text style={tw`text-[#DA0000] text-base font-semibold`}>Delete Account</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
    )
}

export default OrganizerProfile