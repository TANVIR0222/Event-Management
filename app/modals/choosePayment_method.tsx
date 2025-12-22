import tw from "@/lib/tailwind";
import { useJoinSingleEventMutation, useJoinTeamEventMutation } from "@/redux/discover/discoverApi";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


// --- Main Screen ---
const CreateNewTeamScreen: React.FC = () => {

    const { id, status, team_id } = useLocalSearchParams<{ id: string, status: string, team_id: string }>();

    // console.log(all_params);


    // --- Hooks ---


    // --- RTK ---
    const [joinSingleEvent, { isLoading: joinLoading }] = useJoinSingleEventMutation();
    const [joinTeamEvent, { isLoading: joinTeamLoading }] = useJoinTeamEventMutation();




    // console.log(view_data?.is_follow);


    // Fix: Destructure the object in the parameters
    const handleJoinEvent = async () => {
        try {
            console.log(status);

            // Note: You should use the 'id' passed into the function 
            // instead of relying on the global 'view_data' variable again
            // const res = await joinSingleEvent({ id }).unwrap();
            // console.log(res);

            if (status === "single") {
                const res = await joinSingleEvent({ id }).unwrap();
                console.log(res);
                router.push({
                    pathname: "/eventDetails/eventOverview",
                    params: { id },
                });
            } else {
                const res = await joinTeamEvent({ id, team_id: team_id }).unwrap();
                console.log(res);
                router.push({
                    pathname: "/eventDetails/eventOverview",
                    params: { id },
                });

            }
        } catch (error) {
            console.log("Error joining event:", error);
        }
    };


    return (
        <View style={tw`bg-white text-white p-4 rounded-t-2xl`}>
            <View style={tw`flex-row justify-between items-center bg-gray-200 rounded-full self-center h-[5px] w-[80px]`} />
            <View style={tw`py-4`}>

                <Text style={tw`text-2xl font-medium text-primary`}>Choose Payment Method </Text>
                <View style={tw`p-3 bg-orange-100 mt-2 rounded-md`}>
                    <Text style={tw`text-lg text-primary`}>⚠️ Important:</Text>
                    <Text style={tw`text-sm text-primary`} >Paying *online** secures your spot immediately.</Text>
                    <Text>Choosing *cash payment** places you on the waiting list until your payment is verified.
                        You might *lose your spot** if the event fills up before your cash payment is confirmed.</Text>
                </View>
                <Text style={tw`text-sm  text-primary mt-2`}>Select how you'd like to pay the $25 entry fee for "Dhaka Football League ".</Text>

                <View style={tw`mt-4 flex-row gap-4 w-full`}>
                    {/* Wallet Payment */}
                    <TouchableOpacity
                        disabled={joinLoading || joinTeamLoading}
                        onPress={() => handleJoinEvent()}
                        style={tw`flex-1 bg-primary border-2 border-black rounded-lg p-3 items-center justify-center`}
                    >
                        {/* <TouchableOpacity
                        onPress={() => router.push("/modals/Payment_Modal")}
                        style={tw`flex-1 bg-primary border-2 border-black rounded-lg p-3 items-center justify-center`}
                    > */}
                        <Text style={tw`text-black text-center text-md font-RoboBold`}>
                            {joinLoading || joinTeamLoading ? 'Loading...' : `Pay Wallet\n(Secure Slot)`}
                        </Text>
                    </TouchableOpacity>

                    {/* Cash Payment */}
                    <TouchableOpacity
                        onPress={() => router.push("/screens/paywithCash")}
                        style={tw`flex-1 bg-[#1D0303] border-2 border-black rounded-lg p-3 items-center justify-center`}
                    >
                        <Text style={tw`text-white text-center text-md font-RoboBold`}>
                            Pay With Cash{'\n'}(Tentative)
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
};

export default CreateNewTeamScreen;
