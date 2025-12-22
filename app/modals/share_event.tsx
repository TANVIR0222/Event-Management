import { cross } from '@/assets/icons/Icon'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'

const Share_event: React.FC = () => {
  return (

    <View style={tw` justify-center items-center bg-gray-100`}>

      <View style={tw`w-[361px] h-[177px] bg-white rounded-[14px] relative`}>


        <Text style={tw`absolute left-[21px] top-[21px] text-[#1D0303] text-[16px] font-semibold leading-[22.4px]`}>
          Share Event
        </Text>

        <TouchableOpacity onPress={() => router.back()} style={tw`absolute left-[326px] top-[28px]`}>
          <SvgXml height={18} width={18} xml={cross} />
        </TouchableOpacity>

        <Text style={tw`absolute left-[21px] top-[65px] w-[185px] text-[#1D0303] text-[11px] font-normal leading-[15.4px]`}>
          Share this event with your friends!
        </Text>

        <Text style={tw`absolute left-[21px] top-[90px] w-[96px] text-[#1D0303] text-[13px] font-semibold leading-[18.2px]`}>
          Gulshan Padel
        </Text>

        <View style={tw`absolute left-[21px] top-[118px] w-[320px] h-[30px]`}>

          <View style={tw`w-full h-full bg-[#B6B6B6] opacity-10 rounded-[6px] absolute`} />

          <Text
            numberOfLines={1}
            style={tw`absolute left-[8px] top-[7px] w-[199px] text-[#B5B5B5] text-[11px] font-normal leading-[15.4px]`}
          >
            https://paidgo.app/gulshanpadel/3
          </Text>

          <TouchableOpacity
            style={tw`absolute right-0 top-0 w-[62px] h-[30px] bg-[#1D0303] rounded-tr-[6px] rounded-br-[6px] justify-center items-center`}
          >
            <Text style={tw`text-white text-[11px] font-semibold leading-[15.4px]`}>
              Copy
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default Share_event