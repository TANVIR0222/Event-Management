import { filtericon } from '@/assets/icons/Icon';
import Infotag from '@/components/ui/Infotag';
import { EventItem } from '@/interface/discover';
import { discover_filters } from '@/lib/data/all-data';
import { formatDate } from '@/lib/lib';
import tw from '@/lib/tailwind';
import { useLazyGetAllDiscoverQuery } from '@/redux/discover/discoverApi';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { useDebounce } from 'use-debounce';




// Bottom Navigation Bar Component


// --- Main Screen ---
const HomeScreen: React.FC = () => {

  const [active, setActive] = useState<string>("Upcoming");
  const [search, setSearch] = useState<string>('');

  const [posts, setPosts] = useState<EventItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);




  const [fetchPosts, { isLoading }] = useLazyGetAllDiscoverQuery();

  // -------------------- Load Posts --------------------
  const loadPosts = useCallback(
    async (pageNum = 1, isRefresh = false, searchValue = '') => {
      try {
        const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue, filter: active }).unwrap();

        const newPosts = res?.data?.data ?? [];

        if (isRefresh || pageNum === 1) {
          setPosts(newPosts);
        } else {
          setPosts((prev) => [...prev, ...newPosts]);
        }

        setHasMore(res?.data?.current_page < res?.data?.last_page);
        setPage(res?.data?.current_page + 1);
      } catch (err) {
        console.log('Fetch Error:', err);
      } finally {
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [fetchPosts, active]
  );

  useEffect(() => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);

    loadPosts(1, true, debouncedSearch);
  }, [debouncedSearch, active, loadPosts]);

  // -------------------- Handlers --------------------
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(1, true, debouncedSearch);
  }, [loadPosts, debouncedSearch]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadPosts(page, false, debouncedSearch);
    }
  };


  const PlayerEventCard = ({ item }: { item: EventItem }) => {
    return (

      <ImageBackground
        source={{
          uri: item?.image_url
        }}
        style={tw`w-full h-64 rounded-2xl overflow-hidden mb-6`}
        resizeMode="cover">
        <View style={tw`flex-1 justify-between p-3 bg-black/20`}>

          <View style={tw`flex-row justify-between items-start`}>
            <Text style={tw`text-white text-lg font-RoboBold w-3/4`}>
              {item?.title}
            </Text>
            <Text
              style={tw`bg-[#1D0303] text-white text-sm font-RoboMedium rounded-lg px-2 py-1`}>
              {item?.sport_name}
            </Text>
          </View>

          <View style={tw`self-center bg-white/40 rounded-xl p-2 w-5/6`}>
            <Text style={tw`text-center text-xs font-RoboNormal text-primary`}>
              Guaranteed Prize
            </Text>
            <Text style={tw`text-center text-lg font-RoboBold text-[#450606]`}>
              ${item?.prize_amount}
            </Text>
          </View>

          <View>
            <View style={tw`flex-row flex-wrap gap-2 mb-2`}>
              <Infotag icon="calendar-outline" text={formatDate(item?.ending_date)} />
              <Infotag icon="people-outline" text={`${item?.number_of_player_required_in_a_team}`} />
              <Infotag icon="person-outline" text={item?.sport_type} />
              {/* <Infotag icon="cash-outline" text={event.entryFee} /> */}
              <Infotag icon="shield-checkmark-outline" text="Refund Protected" />
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-white text-sm font-RoboBold`}>
                {item?.joined} / {item?.max} spots left
              </Text>
              <TouchableOpacity
                onPress={() => router.push({
                  pathname: '/eventDetails/PlayerEventDetails',
                  params: { id: item?.id }
                })}
                style={tw`bg-[#F33333] rounded-lg px-4 py-2 border `}>
                <Text style={tw`text-white text-md font-RoboBold font-semibold`}>
                  Join Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>


    )
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={tw`pb-4 px-5`}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`mt-8 mb-4`}>
          <View style={tw`flex-row items-center mb-1`}>
            <Ionicons name="location-outline" size={18} color="#1D0303" />
            <Text style={tw`text-base font-RoboNormal text-primary ml-1`}>
              Dhaka, Bangladesh
            </Text>
          </View>
          <Text style={tw`text-3xl font-RoboBold text-primary`}>
            Find Your Game
          </Text>
          <Text style={tw`text-sm font-RoboNormal text-primary mt-1`}>
            Friday, August 22, 2025
          </Text>
        </View>

        {/* Search and Filter */}
        <View style={tw`flex-row mb-6`}>
          <View
            style={tw`flex-1 flex-row items-center border border-[#6A3838] rounded-xl h-10 px-3`}>
            <Ionicons name="search-outline" size={20} color="#6A3838" />
            <TextInput
              style={tw`flex-1 ml-2 `}
              placeholder="Search..."
              placeholderTextColor="#1D030380"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity
            style={tw`  justify-center items-center ml-3`}>
            <SvgXml xml={filtericon} />
          </TouchableOpacity>



        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`flex-row mb-4 flex-1`}
        >
          {discover_filters.map((item) => {
            const isActive = active === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setActive(item)}
                style={[
                  tw`justify-center items-center ml-3 rounded-lg px-4 py-2`,
                  isActive
                    ? tw`bg-[#1D0303]`
                    : tw`bg-transparent border border-primary`,
                ]}
              >
                <Text
                  style={[
                    tw`text-sm font-RoboMedium`,
                    isActive
                      ? tw`text-white`
                      : tw`text-primary font-semibold`,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Event List */}
        {/* {events.map((event, index) => (
          <PlayerEventCard key={index} event={event} />
        ))} */}
        <FlatList
          data={posts}
          keyExtractor={(item, index) => String(index)}
          renderItem={PlayerEventCard}
          contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={['#D6DF22']} />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
        />
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;
