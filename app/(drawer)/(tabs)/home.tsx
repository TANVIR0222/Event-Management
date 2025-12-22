// // import { filtericon } from '@/assets/icons/Icon';
// // import { MyAllEvent } from '@/interface/event';
// // import tw from '@/lib/tailwind';
// // import { useLazyGetAllMyEventQuery } from '@/redux/createEvent/createdEventApi';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useRouter } from 'expo-router';
// // import React, { useCallback, useEffect, useState } from 'react';
// // import {
// //   FlatList,
// //   ImageBackground,
// //   Modal,
// //   RefreshControl,
// //   SafeAreaView,
// //   ScrollView,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View
// // } from 'react-native';
// // import { SvgXml } from 'react-native-svg';
// // import { useDebounce } from 'use-debounce';

// // // --- Reusable Sub-Components ---

// // const InfoTag = ({ icon, text }: { icon: any; text: string }) => (
// //   <View
// //     style={tw`bg-white opacity-80 rounded-md px-2 py-1 flex-row items-center shadow-sm`}>
// //     <Ionicons name={icon} size={14} color="#1D0303" style={tw`mr-1.5`} />
// //     <Text style={tw`text-[#1D0303] text-[11px] font-RoboNormal`}>{text}</Text>
// //   </View>
// // );

// // const CancelConfirmationModal = ({
// //   visible,
// //   onClose,
// //   eventName,
// // }: {
// //   visible: boolean;
// //   onClose: () => void;
// //   eventName: string;
// // }) => (
// //   <Modal
// //     animationType="fade"
// //     transparent={true}
// //     visible={visible}
// //     onRequestClose={onClose}>
// //     <View style={tw`flex-1 justify-center items-center bg-black/50`}>
// //       <View style={tw`bg-white rounded-2xl p-6 items-center w-4/5`}>
// //         <Ionicons name="checkmark-circle" size={56} color="green" />
// //         <Text style={tw`text-lg font-RoboBold text-center mt-4`}>
// //           Event Cancelled!
// //         </Text>
// //         <Text style={tw`text-sm text-gray-600 text-center mt-2`}>
// //           The event {eventName} has been successfully cancelled.
// //         </Text>
// //         <TouchableOpacity
// //           onPress={onClose}
// //           style={tw`bg-[#1D0303] rounded-lg px-8 py-3 mt-6`}>
// //           <Text style={tw`text-white font-RoboMedium`}>OK</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   </Modal>
// // );

// // const OrganizerEventCard = ({
// //   event,
// //   isMenuOpen,
// //   onMenuPress,
// //   onEdit,
// //   onCancel,
// // }: {
// //   event: any;
// //   isMenuOpen: boolean;
// //   onMenuPress: () => void;
// //   onEdit: () => void;
// //   onCancel: () => void;
// // }) => {
// //   const router = useRouter();
// //   const progress = (event.registeredPlayers / event.totalPlayers) * 100;

// //   const statusStyles = {
// //     Active: { bg: 'bg-blue-600', text: 'Active' },
// //     Upcoming: { bg: 'bg-yellow-500', text: 'Upcoming' },
// //     Completed: { bg: 'bg-green-600', text: 'Completed' },
// //     pending: { bg: 'bg-red-600', text: 'Pending' },
// //   };

// //   const statusStyle = statusStyles[event.status as keyof typeof statusStyles];




// //   return (
// //     <TouchableOpacity onPress={() => router.push(`/eventDetails/OrganizationEventDetails?status=${event.status}`)}>
// //       <ImageBackground
// //         source={require('@/assets/images/event2.png')}
// //         style={tw`w-full h-56 rounded-2xl overflow-hidden mb-6`}
// //         resizeMode="cover">
// //         <View style={tw`flex-1 justify-between p-3 bg-black/30`}>
// //           {/* Top Section: Title & Options */}
// //           <View style={tw`flex-row justify-between items-start`}>
// //             <Text style={tw`text-white text-lg font-RoboBold w-4/5`}>
// //               {event.title}
// //             </Text>
// //             <View>
// //               <TouchableOpacity onPress={onMenuPress} style={tw`p-1`}>
// //                 <Ionicons name="ellipsis-vertical" size={20} color="white" />
// //               </TouchableOpacity>
// //               {isMenuOpen && (
// //                 <View
// //                   style={tw`absolute top-8 right-0 bg-white rounded-lg shadow-xl z-10 w-36`}>
// //                   <TouchableOpacity
// //                     onPress={onEdit}
// //                     style={tw`p-3 flex-row items-center border-b border-gray-200`}>
// //                     <Ionicons
// //                       name="create-outline"
// //                       size={16}
// //                       color="black"
// //                       style={tw`mr-2`}
// //                     />
// //                     <Text>Edit Event</Text>
// //                   </TouchableOpacity>
// //                   <TouchableOpacity
// //                     onPress={onCancel}
// //                     style={tw`p-3 flex-row items-center`}>
// //                     <Ionicons
// //                       name="trash-outline"
// //                       size={16}
// //                       color="red"
// //                       style={tw`mr-2`}
// //                     />
// //                     <Text style={tw`text-red-500`}>Cancel Event</Text>
// //                   </TouchableOpacity>
// //                 </View>
// //               )}
// //             </View>
// //           </View>

// //           {/* Middle Section: Info Tags */}
// //           <View>
// //             <View style={tw`flex-row flex-wrap gap-2`}>
// //               <InfoTag icon="calendar-outline" text={event.date} />
// //               <InfoTag icon="location-outline" text={event.location} />
// //               <InfoTag icon="people-outline" text={event.type} />
// //             </View>
// //             <View style={tw`mt-2`}>
// //               <InfoTag
// //                 icon="time-outline"
// //                 text={`Sat, Aug 30, 2025 ${event.time}`}
// //               />
// //             </View>
// //           </View>

// //           {/* Bottom Section: Progress & Status */}
// //           <View>
// //             <Text style={tw`text-white text-xs mb-1`}>
// //               {event.registeredPlayers}/{event.totalPlayers} players registered
// //             </Text>
// //             <View style={tw`w-full bg-gray-300 rounded-full h-1.5`}>
// //               <View
// //                 style={tw.style(`bg-red-500 h-1.5 rounded-full`, {
// //                   width: `${progress}%`,
// //                 })}
// //               />
// //             </View>
// //             <View style={tw`flex-row justify-between items-center mt-2`}>
// //               <View style={tw`flex-row items-center`}>
// //                 <Text style={tw`text-white text-sm font-RoboMedium`}>
// //                   {event.entryFee} entry
// //                 </Text>
// //                 <View style={tw`w-1 h-1 bg-white rounded-full mx-2`} />
// //                 <Text style={tw`text-white text-sm font-RoboMedium`}>
// //                   {event.prize} prize
// //                 </Text>
// //               </View>
// //               <View style={tw`px-3 py-1.5 rounded-full ${statusStyle.bg}`}>
// //                 <Text style={tw`text-white text-xs font-RoboBold`}>
// //                   {statusStyle.text}
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>
// //         </View>
// //       </ImageBackground>
// //     </TouchableOpacity>
// //   );
// // };



// // // --- Main Screen ---
// // const OrganizerHomeScreen: React.FC = () => {
// //   const router = useRouter();
// //   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
// //   const [isCancelModalVisible, setCancelModalVisible] = useState(false);
// //   const [cancelledEventTitle, setCancelledEventTitle] = useState('');

// //   const [search, setSearch] = useState<string>('');

// //   const [posts, setPosts] = useState<MyAllEvent[]>([]);
// //   const [page, setPage] = useState(1);
// //   const [hasMore, setHasMore] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [loadingMore, setLoadingMore] = useState(false);
// //   const [debouncedSearch] = useDebounce(search, 500);




// //   const [fetchPosts, { isLoading }] = useLazyGetAllMyEventQuery();

// //   // -------------------- Load Posts --------------------
// //   const loadPosts = useCallback(
// //     async (pageNum = 1, isRefresh = false, searchValue = '') => {
// //       try {
// //         const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue }).unwrap();
// //         console.log(res);

// //         const newPosts = res?.data?.data ?? [];

// //         if (isRefresh || pageNum === 1) {
// //           setPosts(newPosts);
// //         } else {
// //           setPosts((prev) => [...prev, ...newPosts]);
// //         }

// //         setHasMore(res?.data?.current_page < res?.data?.last_page);
// //         setPage(res?.data?.current_page + 1);
// //       } catch (err) {
// //         console.log('Fetch Error:', err);
// //       } finally {
// //         setRefreshing(false);
// //         setLoadingMore(false);
// //       }
// //     },
// //     [fetchPosts]
// //   );

// //   useEffect(() => {
// //     setRefreshing(true);
// //     setHasMore(true);
// //     setPage(1);

// //     loadPosts(1, true, debouncedSearch);
// //   }, [debouncedSearch, loadPosts]);

// //   // -------------------- Handlers --------------------
// //   const handleRefresh = useCallback(() => {
// //     setRefreshing(true);
// //     loadPosts(1, true, debouncedSearch);
// //   }, [loadPosts, debouncedSearch]);

// //   const handleLoadMore = () => {
// //     if (!loadingMore && hasMore) {
// //       setLoadingMore(true);
// //       loadPosts(page, false, debouncedSearch);
// //     }
// //   };



// //   return (
// //     <SafeAreaView style={tw`flex-1 bg-white`}>

// //       <CancelConfirmationModal
// //         visible={isCancelModalVisible}
// //         onClose={() => setCancelModalVisible(false)}
// //         eventName={cancelledEventTitle}
// //       />
// //       <View style={tw`p-4 items-center mt-6`}>
// //         <Text style={tw`text-3xl font-RoboBold text-[#1D0303]`}>My Events</Text>
// //       </View>
// //       <View style={tw`flex-row mb-6 px-4`}>
// //         <View
// //           style={tw`flex-1 flex-row items-center border border-[#6A3838] rounded-xl h-10 px-3`}>
// //           <Ionicons name="search-outline" size={20} color="#6A3838" />
// //           <TextInput
// //             style={tw`flex-1 ml-2 text-base`}
// //             placeholder="Search..."
// //             placeholderTextColor="#1D030380"
// //           />
// //         </View>
// //         <TouchableOpacity
// //           style={tw`  justify-center items-center ml-3`}>
// //           <SvgXml xml={filtericon} />
// //         </TouchableOpacity>



// //       </View>

// //       <FlatList
// //                 data={posts}
// //                 keyExtractor={(item, index) => String(index)}
// //                 renderItem={<OrganizerEventCard
// //             event={event}
// //             isMenuOpen={openMenuId === event.id}
// //             onMenuPress={() => setOpenMenuId(openMenuId === event.id ? null : event.id)}
// //             onEdit={() => {
// //               setOpenMenuId(null);
// //               router.push(`/eventDetails/editEvent`);
// //             }}
// //             onCancel={() => {
// //               setOpenMenuId(null);
// //               setCancelledEventTitle(event.title);
// //               setCancelModalVisible(true);
// //             }}
// //           />}
// //                 contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
// //                 showsVerticalScrollIndicator={false}
// //                 onEndReached={handleLoadMore}
// //                 onEndReachedThreshold={0.5}
// //                 refreshControl={
// //                   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={['#D6DF22']} />
// //                 }
// //                 initialNumToRender={10}
// //                 maxToRenderPerBatch={10}
// //                 windowSize={5}
// //                 removeClippedSubviews={true}
// //               />
// //     </SafeAreaView>
// //   );
// // };

// // export default OrganizerHomeScreen;


// import { filtericon } from '@/assets/icons/Icon';
// import { MyAllEvent } from '@/interface/event';
// import { formatDate, makeImage } from '@/lib/lib';
// import tw from '@/lib/tailwind';
// import { useDeleteMyEventMutation, useLazyGetAllMyEventQuery } from '@/redux/createEvent/createdEventApi';
// import { Ionicons } from '@expo/vector-icons';
// import { router, useRouter } from 'expo-router';
// import { useCallback, useEffect, useState } from 'react';
// import {
//   FlatList,
//   ImageBackground,
//   Modal,
//   RefreshControl,
//   SafeAreaView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SvgXml } from 'react-native-svg';
// import { useDebounce } from 'use-debounce';

// /* -------------------- Reusable UI -------------------- */

// const InfoTag = (({ icon, text }: { icon: any; text: string }) => (
//   <View style={tw`bg-white/80 rounded-md px-2 py-1 flex-row items-center`}>
//     <Ionicons name={icon} size={14} color="#1D0303" style={tw`mr-1.5`} />
//     <Text style={tw`text-[#1D0303] text-[11px] font-RoboNormal`}>{text}</Text>
//   </View>
// ));

// const CancelConfirmationModal = ({
//   visible,
//   onClose,
//   eventName,
// }: {
//   visible: boolean;
//   onClose: () => void;
//   eventName: string;
// }) => (
//   <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
//     <View style={tw`flex-1 items-center justify-center bg-black/50`}>
//       <View style={tw`bg-white rounded-2xl p-6 w-4/5 items-center`}>
//         <Ionicons name="checkmark-circle" size={56} color="green" />
//         <Text style={tw`text-lg font-RoboBold mt-4`}>Event Cancelled</Text>
//         <Text style={tw`text-sm text-gray-600 text-center mt-2`}>
//           The event "{eventName}" has been successfully cancelled.
//         </Text>
//         <TouchableOpacity onPress={onClose} style={tw`bg-[#1D0303] mt-6 px-8 py-3 rounded-lg`}>
//           <Text style={tw`text-white font-RoboMedium`}>OK</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>
// );

// /* -------------------- Event Card -------------------- */

// const getStatusBg = (status?: string) => {
//   switch (status) {
//     case 'Active':
//       return 'bg-blue-600';
//     case 'Upcoming':
//       return 'bg-yellow-500';
//     case 'Completed':
//       return 'bg-green-600';
//     case 'Pending Payment':
//       return 'bg-red-600';
//     case 'Event Over':
//       return 'bg-yellow-600';
//     default:
//       return 'bg-gray-400';
//   }
// };


// const OrganizerEventCard = (({
//   event,
//   isMenuOpen,
//   onMenuPress,
//   onEdit,
//   onCancel,
// }: {
//   event: MyAllEvent;
//   isMenuOpen: boolean;
//   onMenuPress: () => void;
//   onEdit: () => void;
//   onCancel: () => void;
// }) => {
//   const router = useRouter();
//   const progress = Math.min(
//     100,
//     Math.round((event?.number_of_player_required / event?.number_of_team_required) * 100)
//   );

//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={() => router.push(`/eventDetails/OrganizationEventDetails?id=${event?.id}`)}>
//       <ImageBackground
//         source={{
//           uri: makeImage(event?.image_url),
//         }}
//         resizeMode="cover"
//         style={tw`h-56 mb-6 rounded-2xl overflow-hidden`}>
//         <View style={tw`flex-1 justify-between p-3 bg-black/30`}>
//           {/* Header */}
//           <View style={tw`flex-row justify-between`}>
//             <Text numberOfLines={2} style={tw`text-white text-lg font-RoboBold w-4/5`}>
//               {event.title}
//             </Text>
//             <View>
//               <TouchableOpacity onPress={onMenuPress}>
//                 <Ionicons name="ellipsis-vertical" size={20} color="white" />
//               </TouchableOpacity>
//               {isMenuOpen && (
//                 <View style={tw`absolute top-7 right-0 bg-white rounded-lg shadow-xl w-36 z-10`}>
//                   <TouchableOpacity onPress={onEdit} style={tw`p-3 flex-row items-center border-b`}>
//                     <Ionicons name="create-outline" size={16} style={tw`mr-2`} />
//                     <Text>Edit</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={onCancel} style={tw`p-3 flex-row items-center`}>
//                     <Ionicons name="trash-outline" size={16} color="red" style={tw`mr-2`} />
//                     <Text style={tw`text-red-500`}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           </View>

//           {/* Info */}
//           <View>
//             <View style={tw`flex-row flex-wrap gap-2`}>
//               <InfoTag icon="calendar-outline" text={event?.title} />
//               <InfoTag icon="location-outline" text={event?.location} />
//               <InfoTag icon="people-outline" text={event?.sport_type} />
//             </View>
//             <View style={tw`mt-2`}>
//               <InfoTag icon="time-outline" text={`${formatDate(event?.starting_date), formatDate(event?.starting_date)} - ${event?.time}`} />
//             </View>
//           </View>

//           {/* Footer */}
//           <View>
//             <Text style={tw`text-white text-xs mb-1`}>
//               {event?.number_of_player_required}/{event?.number_of_team_required} players
//             </Text>
//             <View style={tw`bg-gray-300 h-1.5 rounded-full`}>
//               <View style={tw.style('bg-red-500 h-1.5 rounded-full', { width: `${progress}%` })} />
//             </View>
//             <View style={tw`flex-row justify-between items-center mt-2`}>
//               <Text style={tw`text-white text-sm font-RoboMedium`}>
//                 {event?.entry_fee} entry   {event?.prize_amount} price
//               </Text>
//               <View
//                 style={tw.style(
//                   'px-3 py-1.5 rounded-full',
//                   getStatusBg(event?.status)
//                 )}
//               >
//                 <Text style={tw`text-white text-xs font-RoboBold`}>
//                   {event?.status ?? 'Unknown'}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ImageBackground>
//     </TouchableOpacity>
//   );
// });

// /* -------------------- Screen -------------------- */

// const OrganizerHomeScreen = () => {
//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
//   const [search, setSearch] = useState('');
//   const [debouncedSearch] = useDebounce(search, 500);

//   const [posts, setPosts] = useState<MyAllEvent[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [cancelTitle, setCancelTitle] = useState('');
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [deleteEvent, { isLoading }] = useDeleteMyEventMutation();

//   const [fetchPosts] = useLazyGetAllMyEventQuery();

//   const loadPosts = useCallback(
//     async (pageNum = 1, refresh = false) => {
//       const res = await fetchPosts({ page: pageNum, per_page: 10, search: debouncedSearch }).unwrap();
//       const list = res?.data?.data ?? [];

//       setPosts(prev => (refresh ? list : [...prev, ...list]));
//       setHasMore(res.data.current_page < res.data.last_page);
//       setPage(res.data.current_page + 1);
//       setRefreshing(false);
//     },
//     [debouncedSearch, fetchPosts]
//   );

//   useEffect(() => {
//     setRefreshing(true);
//     loadPosts(1, true);
//   }, [debouncedSearch, loadPosts]);


//   // -------------------- handle delete event --------------------

//   const handleDeleteEvent = async (eventId: string) => {
//     try {
//       const res = await deleteEvent({ id: eventId }).unwrap();
//       console.log(res);

//       loadPosts(1, true);
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <CancelConfirmationModal
//         visible={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         eventName={cancelTitle}
//       />

//       <Text style={tw`text-3xl font-RoboBold text-center my-6`}>My Events</Text>

//       {/* Search */}
//       <View style={tw`flex-row px-4 mb-4`}>
//         <View style={tw`flex-1 flex-row items-center border rounded-xl h-10 px-3`}>
//           <Ionicons name="search-outline" size={20} />
//           <TextInput
//             value={search}
//             onChangeText={setSearch}
//             placeholder="Search events"
//             style={tw`flex-1 ml-2`}
//           />
//         </View>
//         <TouchableOpacity style={tw`ml-3 justify-center`}>
//           <SvgXml xml={filtericon} />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={posts}
//         keyExtractor={(item) => String(item.id)}
//         renderItem={({ item }) => (
//           <OrganizerEventCard
//             event={item}
//             isMenuOpen={openMenuId === String(item.id)}
//             onMenuPress={() => setOpenMenuId(prev => (prev === String(item.id) ? null : String(item.id)))}
//             onEdit={() => router.push(`/eventDetails/editEvent?id=${item.id}`)}
//             onCancel={() => {
//               setCancelTitle(item.title);
//               setShowCancelModal(true);
//               setOpenMenuId(null);
//             }}
//           />
//         )}
//         contentContainerStyle={{ paddingHorizontal: 12 }}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadPosts(1, true)} />}
//         onEndReached={() => hasMore && loadPosts(page)}
//         onEndReachedThreshold={0.4}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default OrganizerHomeScreen;


import { filtericon } from '@/assets/icons/Icon';
import { MyAllEvent } from '@/interface/event';
import { formatDate, makeImage } from '@/lib/lib';
import tw from '@/lib/tailwind';
import {
  useDeleteMyEventMutation,
  useLazyGetAllMyEventQuery,
} from '@/redux/createEvent/createdEventApi';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useDebounce } from 'use-debounce';

/* -------------------- Reusable UI -------------------- */

const InfoTag = ({ icon, text }: { icon: any; text: string }) => (
  <View style={tw`bg-white/80 rounded-md px-2 py-1 flex-row items-center`}>
    <Ionicons name={icon} size={14} color="#1D0303" style={tw`mr-1.5`} />
    <Text style={tw`text-[#1D0303] text-[11px] font-RoboNormal`}>{text}</Text>
  </View>
);

const CancelConfirmationModal = ({
  visible,
  eventName,
  loading,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  eventName: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <Modal transparent animationType="fade" visible={visible}>
    <View style={tw`flex-1 items-center justify-center bg-black/50`}>
      <View style={tw`bg-white rounded-2xl p-6 w-4/5`}>
        <Text style={tw`text-lg font-RoboBold text-center`}>
          Cancel Event?
        </Text>
        <Text style={tw`text-sm text-gray-600 text-center mt-2`}>
          Are you sure you want to cancel "{eventName}"?
        </Text>

        <View style={tw`flex-row justify-between mt-6`}>
          <TouchableOpacity
            onPress={onClose}
            style={tw`px-5 py-2 rounded-lg bg-gray-200`}>
            <Text>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            onPress={onConfirm}
            style={tw`px-5 py-2 rounded-lg bg-red-600`}>
            <Text style={tw`text-white`}>
              {loading ? 'Deleting...' : 'Confirm'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

/* -------------------- Helpers -------------------- */

const getStatusBg = (status?: string) => {
  switch (status) {
    case 'Active':
      return 'bg-blue-600';
    case 'Upcoming':
      return 'bg-yellow-500';
    case 'Completed':
      return 'bg-green-600';
    case 'Pending Payment':
      return 'bg-red-600';
    case 'Event Over':
      return 'bg-yellow-600';
    default:
      return 'bg-gray-400';
  }
};

/* -------------------- Card -------------------- */

const OrganizerEventCard = ({
  event,
  isMenuOpen,
  onMenuPress,
  onEdit,
  onCancel,
}: {
  event: MyAllEvent;
  isMenuOpen: boolean;
  onMenuPress: () => void;
  onEdit: () => void;
  onCancel: () => void;
}) => {
  const router = useRouter();

  const progress = Math.min(
    100,
    Math.round(
      (event?.number_of_player_required /
        event?.number_of_team_required) * 100
    )
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push(`/eventDetails/OrganizationEventDetails?id=${event?.id}`)
      }>
      <ImageBackground
        source={{ uri: makeImage(event?.image_url) }}
        resizeMode="cover"
        style={tw`h-56 mb-6 rounded-2xl overflow-hidden`}>
        <View style={tw`flex-1 justify-between p-3 bg-black/30`}>
          {/* Header */}
          <View style={tw`flex-row justify-between`}>
            <Text numberOfLines={2} style={tw`text-white text-lg font-RoboBold w-4/5`}>
              {event?.title}
            </Text>
            <View>
              <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="ellipsis-vertical" size={20} color="white" />
              </TouchableOpacity>
              {isMenuOpen && (
                <View style={tw`absolute top-7 right-0 bg-white rounded-lg shadow-xl w-36 z-10`}>
                  <TouchableOpacity onPress={onEdit} style={tw`p-3 border-b`}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onCancel} style={tw`p-3`}>
                    <Text style={tw`text-red-500`}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Info */}
          <View>
            <View style={tw`flex-row flex-wrap gap-2`}>
              <InfoTag icon="calendar-outline" text={formatDate(event?.starting_date)} />
              <InfoTag icon="location-outline" text={event?.location} />
              <InfoTag icon="people-outline" text={event?.sport_type} />
            </View>
            <View style={tw`mt-2`}>
              <InfoTag icon="time-outline" text={event?.time} />
            </View>
          </View>

          {/* Footer */}
          <View>
            <Text style={tw`text-white text-xs mb-1`}>
              {event?.number_of_player_required}/{event?.number_of_team_required} players
            </Text>
            <View style={tw`bg-gray-300 h-1.5 rounded-full`}>
              <View
                style={tw.style('bg-red-500 h-1.5 rounded-full', {
                  width: `${progress}%`,
                })}
              />
            </View>
            <View style={tw`flex-row justify-between items-center mt-2`}>
              <Text style={tw`text-white text-sm`}>
                {event?.entry_fee} entry • {event?.prize_amount} prize
              </Text>
              <View
                style={tw.style(
                  'px-3 py-1.5 rounded-full',
                  getStatusBg(event?.status)
                )}>
                <Text style={tw`text-white text-xs font-RoboBold`}>
                  {event?.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

/* -------------------- Screen -------------------- */

const OrganizerHomeScreen = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [cancelTitle, setCancelTitle] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [posts, setPosts] = useState<MyAllEvent[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [deleteEvent, { isLoading }] = useDeleteMyEventMutation();
  const [fetchPosts] = useLazyGetAllMyEventQuery();

  const loadPosts = useCallback(
    async (pageNum = 1, refresh = false) => {
      const res = await fetchPosts({
        page: pageNum,
        per_page: 10,
        search: debouncedSearch,
      }).unwrap();

      const list = res?.data?.data ?? [];

      setPosts(prev => (refresh ? list : [...prev, ...list]));
      setHasMore(res.data.current_page < res.data.last_page);
      setPage(res.data.current_page + 1);
      setRefreshing(false);
    },
    [debouncedSearch, fetchPosts]
  );

  useEffect(() => {
    setRefreshing(true);
    loadPosts(1, true);
  }, [debouncedSearch, loadPosts]);

  const handleDeleteEvent = async () => {
    if (!selectedEventId) return;

    try {
      await deleteEvent({ id: selectedEventId }).unwrap();
      setPosts(prev => prev.filter(e => e.id !== selectedEventId));
      setShowCancelModal(false);
      setSelectedEventId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CancelConfirmationModal
        visible={showCancelModal}
        eventName={cancelTitle}
        loading={isLoading}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleDeleteEvent}
      />

      <Text style={tw`text-3xl font-RoboBold text-center my-6`}>
        My Events
      </Text>

      {/* Search */}
      <View style={tw`flex-row px-4 mb-4`}>
        <View style={tw`flex-1 flex-row items-center border rounded-xl h-10 px-3`}>
          <Ionicons name="search-outline" size={20} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search events"
            style={tw`flex-1 ml-2`}
          />
        </View>
        <TouchableOpacity style={tw`ml-3 justify-center`}>
          <SvgXml xml={filtericon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => String(item?.id)}
        renderItem={({ item }) => (
          <OrganizerEventCard
            event={item}
            isMenuOpen={openMenuId === String(item?.id)}
            onMenuPress={() =>
              setOpenMenuId(prev =>
                prev === String(item?.id) ? null : String(item?.id)
              )
            }
            onEdit={() =>
              router.push(`/eventDetails/editEvent?id=${item?.id}`)
            }
            onCancel={() => {
              setCancelTitle(item?.title);
              setSelectedEventId(item?.id);
              setShowCancelModal(true);
              setOpenMenuId(null);
            }}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadPosts(1, true)}
          />
        }
        onEndReached={() => hasMore && loadPosts(page)}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrganizerHomeScreen;