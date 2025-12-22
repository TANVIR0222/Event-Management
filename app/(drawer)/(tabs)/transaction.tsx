import GlobalLoading from '@/components/GlobalLoading';
import { TransactionRecord } from '@/interface/transactionApi';
import tw from '@/lib/tailwind';
import { useLazyGetMyTransactionQuery } from '@/redux/transaction/transactionApi';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Reusable Sub-Components ---

// Transaction List Item Component
const TransactionListItem = ({ item }: { item: any }) => {
  const isCredit = item.type === 'Winning' || item.type === 'Refund';
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600';
  const iconBgColor =
    item.type === 'Winning'
      ? 'bg-green-100'
      : item.type === 'Refund'
        ? 'bg-blue-100'
        : 'bg-red-100';
  const iconName =
    item.type === 'Winning'
      ? 'trophy'
      : item.type === 'Refund'
        ? 'refresh-circle'
        : 'arrow-up-circle';
  const iconColor =
    item.type === 'Winning'
      ? '#03AA00'
      : item.type === 'Refund'
        ? '#54A7F5'
        : '#DA0000';

  console.log(item);


  return (
    <View style={tw`flex-row items-center py-4`}>
      <View
        style={tw`w-12 h-12 rounded-full justify-center items-center mr-4 ${iconBgColor}`}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-RoboMedium text-[#1D0303]`}>
          {item?.type} : {item?.message}
        </Text>
        <Text style={tw`text-sm font-RoboNormal text-gray-500 mt-1`}>
          {item?.date}
        </Text>
      </View>
      <Text style={tw`text-sm font-RoboBold ${amountColor}`}>
        {isCredit ? '+' : '-'}{item.amount}
      </Text>
    </View>
  );
};



// --- Main Screen ---
const TransactionScreen: React.FC = () => {




  const [posts, setPosts] = useState<TransactionRecord[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalBalance, settotalBalance] = useState<number>();

  const [fetchPosts, { isLoading }] = useLazyGetMyTransactionQuery();

  const loadPosts = useCallback(
    async (pageNum = 1, refresh = false) => {
      try {
        const res = await fetchPosts({
          page: pageNum,
          per_page: 10,
        }).unwrap();

        settotalBalance(res?.data?.available_balance);


        // Path based on your JSON: res.data.transactions_histories
        const history = res?.data?.transactions_histories;
        const newList = history?.data ?? [];

        setPosts(prev => (refresh ? newList : [...prev, ...newList]));

        // Update pagination states using the history object
        setHasMore(history?.current_page < history?.last_page);
        setPage((history?.current_page ?? pageNum) + 1);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setRefreshing(false);
      }
    },
    [fetchPosts]
  );

  useEffect(() => {
    setRefreshing(true);
    loadPosts(1, true);
  }, [loadPosts]); // Removed loadPosts from dependencies to prevent infinite loops


  return isLoading ? <GlobalLoading /> : (
    <SafeAreaView style={tw`flex-1 bg-white pt-4`}>
      <StatusBar barStyle="dark-content" />
      <View style={tw`p-4 items-center`}>
        <Text style={tw`text-3xl font-RoboBold text-[#1D0303]`}>Transaction</Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-4 px-5`}>
        {/* Balance Card */}
        <View style={tw`bg-gray-100 rounded-2xl p-6 items-center my-4`}>
          <Text style={tw`text-base font-RoboNormal text-gray-700`}>Available Balance</Text>
          <Text style={tw`text-5xl font-RoboBold text-[#1D0303] my-2`}>${totalBalance}</Text>
          <View style={tw`flex-row mt-4`}>
            <TouchableOpacity style={tw`border border-[#1D0303] rounded-lg py-3 px-6 mr-4`}>
              <Text style={tw`text-sm font-RoboMedium text-[#1D0303]`}>Withdraw Earning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/modals/Payment_Modal")} style={tw`bg-[#1D0303] rounded-lg py-3 px-8`}>
              <Text style={tw`text-sm font-RoboMedium text-white`}>Deposit Funds</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View>
          <View style={tw`flex flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-2xl font-RoboBold text-[#1D0303] mb-2`}>Transactions</Text>
          </View>
          {/* {transactions.map((item, index) => (
            <TransactionListItem key={index} item={item} />
          ))} */}

          <FlatList
            data={posts}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }) => (
              <TransactionListItem key={index} item={item} />

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


        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionScreen;
