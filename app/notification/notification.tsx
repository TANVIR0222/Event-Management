import tw from '@/lib/tailwind';
import { useLazyGetAllNotificationsQuery } from '@/redux/notificationsApi/notificationsApi';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const NotificationItem = ({ item }: { item: any }) => (
  <View style={tw`bg-gray-100 rounded-2xl p-4 mb-4`}>
    <View style={tw`flex-row justify-between items-start`}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={tw`w-24 h-9 rounded`}
        resizeMode="cover"
      />
      <Text style={tw`text-xs text-gray-500`}>{item.time}</Text>
    </View>
    <Text style={tw`text-base text-primary mt-3`}>{item.text}</Text>
  </View>
);



// --- Main Screen ---
const NotificationScreen: React.FC = () => {


  const notifications = [
    {
      id: '1',
      text: 'Andrew just joined weekend soccer tournament.',
      time: 'Now',
      imageUrl: 'https://placehold.co/91x35/1D0303/FFFFFF?text=Event',
    },
    {
      id: '2',
      text: 'Robert completed the challenge',
      time: '2 mins ago',
      imageUrl: 'https://placehold.co/91x35/064145/FFFFFF?text=Challenge',
    },
    {
      id: '3',
      text: 'Your team "Dhaka Dudes" has a new match scheduled.',
      time: '1 hour ago',
      imageUrl: 'https://placehold.co/91x35/6A3838/FFFFFF?text=Match',
    },
  ];

  // ---------------state -------------------
  const [posts, setPosts] = useState<Notification[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);


  // ---------------api -------------------
  const [fetchPosts, { isLoading }] = useLazyGetAllNotificationsQuery();


  // Load posts function
  const loadPosts = async (pageNum = 1, isRefresh = false,) => {
    try {
      const res = await fetchPosts({ page: pageNum, per_page: 10 }).unwrap();
      const newPosts = res?.data?.data ?? [];

      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }

      const currentPage = res?.data?.current_page ?? 0;
      const lastPage = res?.data?.last_page ?? 0;

      setHasMore(currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  //---------------------- join challenge -----------
  // const handleJoin = useCallback(
  //     async (groupId: number) => {
  //         const showToast = (type: "success" | "error", message: string) => {
  //             Toast.show({
  //                 type,
  //                 text2: message,
  //                 visibilityTime: 2000,

  //             });
  //         };

  //         try {
  //             Alert.alert(
  //                 "Join Challenge",
  //                 "Do you want to join this group?",
  //                 [
  //                     { text: "Deny" },
  //                     {
  //                         text: "Accept",
  //                         onPress: async () => {
  //                             try {
  //                                 const res = await joinGroup(groupId).unwrap();
  //                                 if (res?.status) {
  //                                     // showToast("success", "You joined the challenge successfully 🎉");
  //                                     // router.replace("/(tab)/groups");
  //                                 }
  //                             } catch (err: any) {
  //                                 // showToast("error", err?.errors?.[0] ?? "Something went wrong");
  //                                 // router.replace("/(tab)/groups");
  //                             }
  //                         },
  //                     },
  //                 ]
  //             );
  //         } catch (err: any) {
  //             showToast("error", err?.errors?.[0] ?? "Something went wrong");
  //         }
  //     },
  //     [joinGroup]
  // );

  console.log(posts);




  // Pull-to-refresh handler
  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(1, true);
  };

  // Load more handler
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };

  // Initial load
  useEffect(() => {
    loadPosts();
    // reset();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 mt-6 bg-white`}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={tw`p-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`p-1`}>
          <Ionicons name="arrow-back" size={24} color="#1D0303" />
        </TouchableOpacity>
        <Text
          style={tw`text-3xl font-RoboBold text-primary text-center flex-1 -ml-8`}>
          Notifications
        </Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-24 px-5`}>


        {/* Notification List */}
        {notifications.map(item => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </ScrollView>

    </SafeAreaView>
  );
};

export default NotificationScreen;
