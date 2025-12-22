import GlobalLoading from '@/components/GlobalLoading';
import { formatDate } from '@/lib/lib';
import tw from '@/lib/tailwind';
import { useGetViewEventQuery, useJoinSingleEventMutation, useJoinTeamEventMutation } from '@/redux/discover/discoverApi';
import { useFollowToggleMutation } from '@/redux/follow/followApi';
import { useGetMyAllTeamQuery } from '@/redux/myProfile/myprofile';
import { Ionicons } from '@expo/vector-icons'; // Using Expo's vector icons
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const InfoRow = ({ icon, text }: { icon: any; text: string }) => (
  <View style={tw`flex-row items-center`}>
    <Ionicons name={icon} size={14} color="#1D0303" style={tw`w-5`} />
    <Text style={tw`text-xs font-RoboNormal text-black ml-1`}>{text}</Text>
  </View>
);

// --- Main Screen ---
const PlayerEventDetails: React.FC = () => {

  const { id } = useLocalSearchParams<{ id: string }>();

  // --- Hooks ---
  const [selectTeam, setSelectTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [teamId, setTeamId] = useState<string>();

  console.log(teamId);


  // --- RTK ---
  const { data, isLoading } = useGetViewEventQuery({ id });
  const [followToggle, { isLoading: followLoading }] = useFollowToggleMutation();
  const { data: myTeams } = useGetMyAllTeamQuery();
  const [joinSingleEvent, { isLoading: joinLoading }] = useJoinSingleEventMutation();
  const [joinTeamEvent, { isLoading: joinTeamLoading }] = useJoinTeamEventMutation();



  const view_data = data?.data;

  // console.log(view_data?.is_follow);


  // Fix: Destructure the object in the parameters
  const handleJoinEvent = async ({ id, status }: { id: string; status: string }) => {
    try {
      console.log(status);

      // Note: You should use the 'id' passed into the function 
      // instead of relying on the global 'view_data' variable again
      // const res = await joinSingleEvent({ id }).unwrap();
      // console.log(res);

      if (status === "single") {
        const res = await joinSingleEvent({ id }).unwrap();
        console.log(res);
        // router.push({
        //   pathname: "/eventDetails/OrganizationEventDetails",
        //   params: { id },
        // });
      } else {
        if (teamId === undefined) {
          alert("Please select a team");
        } else {
          const res = await joinTeamEvent({ id, team_id: teamId }).unwrap();
          console.log(res);
          // router.push({
          //   pathname: "/eventDetails/OrganizationEventDetails",
          //   params: { id },
          // });
        }

      }
    } catch (error) {
      console.log("Error joining event:", error);
    }
  };



  const handleFollowToggle = async () => {
    try {
      const res = await followToggle({ id: String(view_data?.organizer?.id) }).unwrap();
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  };



  return isLoading ? <GlobalLoading /> : (
    <SafeAreaView style={tw`flex-1 bg-white`}>

      {/* Custom Header */}
      <View style={tw`px-5 pt-4 pb-3 border-b border-gray-200 mt-4`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`absolute top-4 left-5 z-10 p-1`}>
          <Ionicons name="arrow-back" size={24} color="#1D0303" />
        </TouchableOpacity>
        <Text style={tw`text-center text-2xl font-RoboBold text-primary`}>
          {view_data?.title}
        </Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-24 px-5`}>
        {/* Organizer Info */}
        <View style={tw`mt-4`}>
          <Text style={tw`text-base font-RoboNormal text-primary`}>Event Organizer:</Text>
          <View style={tw`flex-row items-center justify-between mt-2`}>
            <View style={tw`flex-row items-center`}>
              <Image source={{
                uri: view_data?.organizer?.avatar_url
              }} style={tw`w-7 h-7 rounded-full`} />
              <Text style={tw`text-sm font-RoboNormal text-primary ml-2`}>{view_data?.organizer?.full_name}</Text>
            </View>
            {
              view_data?.is_follow ?
                <TouchableOpacity onPress={handleFollowToggle} style={tw`bg-[#DD2A7B] ${followLoading ? 'opacity-50' : ''} rounded-lg px-4 py-2`}>
                  <Text style={tw`text-white text-xs font-RoboBold`}>Unfollow</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={handleFollowToggle} style={tw`bg-[#DD2A7B] ${followLoading ? 'opacity-50' : ''} rounded-lg px-4 py-2`}>
                  <Text style={tw`text-white text-xs font-RoboBold`}>Follow</Text>
                </TouchableOpacity>

            }
          </View>


        </View>

        {/* Event Image */}
        <Image source={{
          uri: view_data?.image_url
        }} style={tw`w-full h-40 rounded-xl my-4`} />

        {/* Event Details Grid */}
        <View style={tw`flex-row flex-wrap justify-between gap-y-2`}>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="football-outline" text={`${view_data?.sport_name}`} />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="location-outline" text={`${view_data?.location}`} />
          </View>
          <View style={tw`w-full`}>
            <InfoRow icon="calendar-outline" text={`${formatDate(view_data?.starting_date as string)} to ${formatDate(view_data?.ending_date as string)} `} />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="people-outline" text={`${view_data?.number_of_team_required} /${view_data?.number_of_player_required} players`} />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="cash-outline" text={`$${view_data?.entry_fee} entry fee`} />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="trophy-outline" text={`$${view_data?.prize_amount} prize`} />
          </View>
        </View>

        <View style={tw`h-px bg-gray-200 my-5`} />

        {/* Description */}
        <View>
          <Text style={tw`text-lg font-RoboBold text-primary`}>Description</Text>
          <Text style={tw`text-sm font-RoboNormal text-black mt-2 leading-5`}>
            {view_data?.description}
          </Text>
        </View>

        {/* Rules & Guidelines */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-RoboBold text-primary`}>Rules & Guidelines</Text>
          <View style={tw`bg-gray-100 rounded-lg p-3 mt-2`}>
            <Text style={tw`text-xs text-black leading-5`}>
              {view_data?.rules_guidelines}
            </Text>
          </View>
        </View>

        {

          view_data?.sport_type === 'team' && <View style={tw`mt-6`}>
            <Text style={tw`text-lg font-RoboBold text-primary`}>
              Select Your Team
            </Text>

            {/* Dropdown Button */}
            <TouchableOpacity
              onPress={() => setSelectTeam(prev => !prev)}
              style={tw`bg-gray-100 rounded-lg h-12 px-3 flex-row justify-between items-center mt-2`}
            >
              <Text style={tw`text-sm font-RoboMedium text-primary`}>
                {selectedTeam ? selectedTeam.name : '-- Choose a team --'}
              </Text>
              <Ionicons
                name={selectTeam ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={20}
                color="#1D0303"
              />
            </TouchableOpacity>

            {/* Dropdown List */}
            {selectTeam &&
              myTeams?.data?.map((team: any) => (
                <TouchableOpacity
                  key={team.id}
                  onPress={() => {
                    setSelectedTeam(team);
                    setSelectTeam(false);
                    setTeamId(team.id);
                  }}
                  style={tw`bg-gray-100 rounded-lg px-3 py-2 mt-2`}
                >
                  <Text style={tw`text-sm font-RoboMedium text-primary`}>
                    {team.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

        }

        <View style={tw`h-px bg-gray-200 my-5`} />

        {/* Payment Info & Actions */}
        <View>
          <Text style={tw`text-xs text-gray-500`}>
            The entry fee of ${view_data?.entry_fee} will be deducted from your wallet and held in escrow by Paidego.
          </Text>
          <View style={tw`flex-row justify-end items-center mt-4`}>
            <TouchableOpacity onPress={() => router.back()} style={tw`border border-primary rounded-lg px-6 py-3 mr-3`}>
              <Text style={tw`text-xs font-RoboBold text-primary`}>Cancel</Text>
            </TouchableOpacity>
            {view_data?.is_join ?
              // <TouchableOpacity onPress={() => router.push('/modals/choosePayment_method')} style={tw`bg-[#1D0303] rounded-lg px-6 py-3`}>
              <TouchableOpacity onPress={() => router.push({
                pathname: "/eventDetails/eventOverview",
                params: { id },
              })} style={tw`bg-[#1D0303] rounded-lg px-6 py-3`}>
                <Text style={tw`text-white text-xs font-RoboBold`}>View Details</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => {
                // Team required validation
                if (view_data?.sport_type === 'team' && !teamId) {
                  Alert.alert('Select Team', 'Please select a team.');
                  return;
                }

                // Navigate
                router.push({
                  pathname: "/modals/choosePayment_method",
                  params: {
                    id: String(view_data?.id),
                    status: String(view_data?.sport_type),
                    team_id: teamId ? String(teamId) : '',
                  },
                });
              }}
                style={tw`bg-[#1D0303] rounded-lg px-6 py-3`}>
                {/* // <TouchableOpacity onPress={() => handleJoinEvent({ id: String(view_data?.id), status: String(view_data?.sport_type) })} style={tw`bg-[#1D0303] rounded-lg px-6 py-3`}> */}
                <Text style={tw`text-white text-xs font-RoboBold`}>Pay ${view_data?.entry_fee} & Join</Text>
              </TouchableOpacity>}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayerEventDetails;
