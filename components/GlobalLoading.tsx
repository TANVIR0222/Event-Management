import tw from '@/lib/tailwind'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function GlobalLoading() {
    return (
        <View style={tw`flex-1 items-center justify-center bg-white `} >
            <ActivityIndicator size="large" color="#000" />
        </View>
    )
}