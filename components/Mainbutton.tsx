import tw from '@/lib/tailwind'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

interface ButtonProps {
    handleNavigate: () => void,
    isLoading: boolean,
    title: string
}

const MainButton = ({
    handleNavigate,
    isLoading,
    title
}: ButtonProps) => {
    return (
        <View style={tw``}>

            <TouchableOpacity
                style={tw`border border-[#C5B2B2] rounded-xl py-3 items-center mt-6`}
                onPress={() => handleNavigate()}
                disabled={isLoading}
            >
                {isLoading ? (
                    <View style={tw`flex-row items-center justify-center  gap-3`} >
                        <ActivityIndicator size="small" color="#000" />
                        <Text style={tw`text-primary text-base font-bold font-RoboMedium`}>
                            {title}
                        </Text>
                    </View>
                ) : (

                    <Text style={tw`text-primary text-base font-bold font-RoboMedium`}>
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default MainButton