import { payicon, selectwiner } from '@/assets/icons/Icon';
import { formatDate, makeImage } from '@/lib/lib';
import tw from '@/lib/tailwind';
import {
  useDeleteMyEventMutation,
  useViewMySingleEventQuery
} from '@/redux/createEvent/createdEventApi';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';

/* ---------- Reusable ---------- */
const InfoRow = ({ icon, text }: { icon: any; text: string }) => (
  <View style={tw`flex-row items-center`}>
    <Ionicons name={icon} size={14} color="#1D0303" style={tw`w-5`} />
    <Text style={tw`text-xs font-RoboNormal text-black ml-1`}>{text}</Text>
  </View>
);

/* ---------- Main ---------- */
const OrganizationEventDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useViewMySingleEventQuery({ id });
  const event = data?.data;

  const [deleteEvent, { isLoading }] = useDeleteMyEventMutation();

  const [visible, setVisible] = useState(false);

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent({ id }).unwrap();
      setVisible(false);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`p-4 mt-4 flex-row items-center border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`p-2 mr-2`}>
          <Ionicons name="arrow-back" size={24} color="#1D0303" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-RoboBold text-[#1D0303] flex-1 text-center -ml-8`}>
          {event?.title}
        </Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-4 mb-12 px-5`}>
        {/* Image */}
        <Image
          source={{ uri: makeImage(event?.image_url) }}
          style={tw`w-full h-40 rounded-xl my-4`}
        />

        {/* Details */}
        <View style={tw`flex-row flex-wrap justify-between gap-y-2`}>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="football-outline" text={`${event?.sport_type}`} />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="location-outline" text={`${event?.location}`} />
          </View>
          <View style={tw`w-full`}>
            <InfoRow
              icon="calendar-outline"
              text={`${formatDate(event?.starting_date)} - ${formatDate(
                event?.ending_date
              )} ${event?.time}`}
            />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow
              icon="people-outline"
              text={`${event?.number_of_team_required}/${event?.number_of_player_required} players`}
            />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="cash-outline" text={`$${event?.entry_fee} entry fee`} />
          </View>
          <View style={tw`w-[48%]`}>
            <InfoRow icon="trophy-outline" text={`$${event?.prize_amount} Prize`} />
          </View>
        </View>

        <View style={tw`h-px bg-gray-200 my-5`} />

        {/* Status */}
        <View style={tw`flex-row`}>
          <View style={tw`px-3 py-1.5 rounded-full bg-blue-600`}>
            <Text style={tw`text-white text-xs font-RoboBold`}>
              {event?.status}
            </Text>
          </View>
        </View>

        {/* Pay */}
        {event?.status === 'Pending Payment' && (
          <TouchableOpacity
            onPress={() => router.push('/(drawer)/(tabs)/transaction')}
            style={tw`bg-[#028400] rounded-lg px-4 py-2 mt-4`}>
            <View style={tw`flex-row items-center justify-center`}>
              <SvgXml xml={payicon} style={tw`mr-2`} />
              <Text style={tw`text-white text-lg font-semibold`}>Pay</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Winner */}
        {event?.status === 'Completed' && (
          <TouchableOpacity
            onPress={() => router.push('/eventDetails/eventOverview')}
            style={tw`bg-[#3396F3] rounded-lg px-4 py-2 mt-4`}>
            <View style={tw`flex-row items-center justify-center`}>
              <SvgXml xml={selectwiner} style={tw`mr-2`} />
              <Text style={tw`text-white text-lg font-semibold`}>
                Select Winner
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Description */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-RoboBold text-[#1D0303]`}>
            Description
          </Text>
          <Text style={tw`text-sm font-RoboNormal text-black mt-2`}>
            {event?.description}
          </Text>
        </View>

        {/* Rules */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-RoboBold text-[#1D0303]`}>
            Rules & Guidelines
          </Text>
          <View style={tw`bg-gray-100 rounded-lg p-3 mt-2`}>
            <Text style={tw`text-xs text-black`}>
              {event?.rules_guidelines}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={tw`px-5 py-3 mt-6 flex-row justify-end`}>
          {event?.status === 'Pending Payment' && (
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={tw`border border-[#1D0303] rounded-lg px-6 py-3 mr-3`}>
              <Text style={tw`text-xs font-RoboBold text-[#1D0303]`}>
                Delete
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => router.push(`/eventDetails/eventOverview?id=${event?.id}`)}
            style={tw`bg-[#1D0303] rounded-lg px-6 py-3 mr-3`}>
            <Text style={tw`text-white text-xs font-RoboBold`}>
              View Event
            </Text>
          </TouchableOpacity>

          {event?.status === 'Pending Payment' && (
            <TouchableOpacity
              onPress={() =>
                router.push(`/eventDetails/editEvent?id=${event?.id}`)
              }
              style={tw`bg-[#1D0303] rounded-lg px-6 py-3`}>
              <Text style={tw`text-white text-xs font-RoboBold`}>
                Edit Event
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Delete Modal */}
      <Modal transparent animationType="fade" visible={visible}>
        <View style={tw`flex-1 items-center justify-center bg-black/50`}>
          <View style={tw`bg-white rounded-2xl p-6 w-4/5`}>
            <Text style={tw`text-lg font-RoboBold text-center`}>
              Cancel Event?
            </Text>
            <Text style={tw`text-sm text-gray-600 text-center mt-2`}>
              Are you sure you want to cancel "{event?.title}"?
            </Text>

            <View style={tw`flex-row justify-between mt-6`}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={tw`px-5 py-2 rounded-lg bg-gray-200`}>
                <Text>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isLoading}
                onPress={handleDeleteEvent}
                style={tw`px-5 py-2 rounded-lg bg-red-600`}>
                <Text style={tw`text-white`}>
                  {isLoading ? 'Deleting...' : 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrganizationEventDetails;
