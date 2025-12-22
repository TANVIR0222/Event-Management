import { makeImage } from '@/lib/lib';
import tw from '@/lib/tailwind';
import { useGetNearMeAllEventsQuery } from '@/redux/nearme/nearmeApi';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

const MapEventCard = ({ event }: { event: any }) => {

  // console.log(event);

  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/eventDetails/PlayerEventDetails',
        params: { id: event?.id },
      })}
      style={tw`bg-white rounded-lg shadow-lg w-48 mr-4 overflow-hidden`}>
      <Image source={{ uri: makeImage(event?.image) }} style={tw`w-full h-24`} />
      <View style={tw`p-3`}>
        <Text style={tw`font-RoboMedium text-sm text-primary`}>
          {event.title}
        </Text>
        <Text style={tw`font-RoboNormal text-xs text-gray-500 mt-1`}>
          {event.distance_km} km away
        </Text>
      </View>
    </TouchableOpacity>
  )
};


// --- Main Screen ---
const NearMeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();



  const [location, setLocation] = useState<{ latitude: number; longitude: number }>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);

  console.log(location);




  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        // 1️Ask permission once
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // 2️ Get current location
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        console.log('Current Location:', coords);

        // 3️Save to state
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      } catch (error) {
        console.log('Location error:', error);
        setErrorMsg('Failed to get location');
      }
    };

    getCurrentLocation();
  }, []);


  const { data } = useGetNearMeAllEventsQuery({
    latitude: Number(location?.latitude),
    longitude: Number(location?.longitude),
    search: debouncedSearch
  });

  // console.log(data);

  const view_events = data?.data?.events;
  // console.log(view_events);
  const mapRef = useRef<MapView | null>(null);



  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={tw`flex-1`}>
          {/* MapView */}

          <MapView
            ref={mapRef}
            style={tw`flex-1`}
          // initialRegion={initialRegion}
          >
            {/* Current Location */}
            <Marker
              coordinate={{
                latitude: Number(data?.data?.current.latitude),
                longitude: Number(data?.data?.current.longitude),
              }}
              title="You are here"
            >
              <Ionicons name="navigate-circle" size={30} color="green" />
            </Marker>

            {/* Event Markers */}
            {view_events?.map(event =>
              event.latitude && event.longitude ? (
                <Marker
                  key={event.id}
                  coordinate={{
                    latitude: Number(event.latitude),
                    longitude: Number(event.longitude),
                  }}
                  title={event.title}
                />
              ) : null
            )}
          </MapView>


          {/* Search Bar */}
          <View style={[tw`absolute  left-5 right-5 z-10`, {
            top: top
          }]}>
            <View
              style={tw`bg-white rounded-full h-12 px-4 flex-row items-center shadow-xl`}>
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                placeholder="Search by sport, location or prize"
                style={tw`flex-1 ml-2 text-base`}
                // onChange={setSearch}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>

          {/* Bottom Cards (will move UP when keyboard opens) */}
          <View style={tw`absolute bottom-0 left-0 right-0 pb-4`}>
            <ScrollView
              horizontal
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`px-5`}>
              {/* {dummyEvents.map(event => (
                <MapEventCard key={event.id} event={event} />
              ))} */}
              {
                view_events?.map(event => (
                  <MapEventCard key={event.id} event={event} />
                ))
              }
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

export default NearMeScreen;

