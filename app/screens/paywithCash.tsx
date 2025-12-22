// import tw from "@/lib/tailwind";
// import React from 'react';
// import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// // --- Icon Placeholders ---
// // In a real app, replace these with SVG icons or an icon library like react-native-vector-icons.
// const LocationIcon = ({ color }: { color: string }) => (
//     <View style={tw`w-3.5 h-3.5 bg-[${color}] mr-2`} />
// );
// const ClockIcon = ({ color }: { color: string }) => (
//     <View style={tw`w-3.5 h-3.5 bg-[${color}] mr-2`} />
// );
// const WarningIcon = () => (
//     <View style={tw`w-5 h-5 bg-[#EAB000] rounded-full mr-3`} />
// );


// // --- Reusable Branch Card Component ---
// interface BranchCardProps {
//     branchName: string;
//     address: string;
//     hours: string;
//     isSelected?: boolean;
// }

// const BranchCard: React.FC<BranchCardProps> = ({ branchName, address, hours, isSelected = false }) => {
//     const textColor = isSelected ? '#1E293B' : '#3F0505';

//     return (
//         <TouchableOpacity style={tw`bg-[#E8E7E7]/50 rounded-xl p-4`}>
//             <Text style={tw`text-[${textColor}] text-[19px] font-semibold leading-[26.6px]`}>
//                 {branchName}
//             </Text>
//             <View style={tw`flex-row items-center mt-3`}>
//                 <LocationIcon color={textColor} />
//                 <Text style={tw`text-[${textColor}] text-[11px] font-normal leading-[15.4px]`}>
//                     {address}
//                 </Text>
//             </View>
//             <View style={tw`flex-row items-center mt-2`}>
//                 <ClockIcon color={textColor} />
//                 <Text style={tw`text-[${textColor}] text-[11px] font-normal leading-[15.4px]`}>
//                     {hours}
//                 </Text>
//             </View>
//         </TouchableOpacity>
//     );
// };


// // --- Main Screen Component ---
// const PayWithCash = () => {
//     // Note: This component assumes the 'Poppins' font family is configured globally.
//     return (
//         <SafeAreaView style={tw`flex-1 bg-white`}>
//             <ScrollView contentContainerStyle={tw`p-5`}>
//                 <Text style={tw`text-primary text-[19px] font-normal leading-[26.6px] mb-4`}>
//                     Cash Payment Branches
//                 </Text>

//                 {/* Warning Box */}
//                 <View style={tw`bg-yellow-400/10 rounded-lg p-4 flex-row items-center mb-6`}>
//                     <WarningIcon />
//                     <Text style={tw`text-[#EAB000] text-[13px] leading-[18.2px] flex-1`}>
//                         Cash must be paid at least 2 days before the event start date to confirm your slot.
//                     </Text>
//                 </View>

//                 {/* Branch List */}
//                 <View style={tw`gap-y-5`}>
//                     <BranchCard
//                         branchName="Gulshan Branch"
//                         address="123 Gulshan Avenue, Dhaka"
//                         hours="10:00 AM - 6:00 PM"
//                         isSelected={true} // Example of a selected card
//                     />
//                     <BranchCard
//                         branchName="Dhanmondi Branch"
//                         address="456 Dhanmondi 27, Dhaka"
//                         hours="11:00 AM - 7:00 PM"
//                     />
//                 </View>
//             </ScrollView>

//             {/* Confirm Button */}
//             <View style={tw`px-5 py-4 border-t border-gray-200`}>
//                 <TouchableOpacity style={tw`bg-primary rounded-xl py-3.5 items-center justify-center`}>
//                     <Text style={tw`text-white text-base font-semibold leading-[22.4px]`}>
//                         Confirm Cash Payment
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default PayWithCash;

import { Clockicon, location } from "@/assets/icons/Icon";
import GlobalLoading from "@/components/GlobalLoading";
import tw from "@/lib/tailwind";
import { useGetAllBranchQuery } from "@/redux/discover/discoverApi";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// You will need to install and configure react-native-maps for this to work
// npm install react-native-maps
import MapView, { Marker } from 'react-native-maps';
import { SvgXml } from "react-native-svg";

// --- Icon Placeholders ---


// --- Reusable Branch Card Component ---
interface BranchCardProps {
    branchName: string;
    address: string;
    hours: string;
    isSelected?: boolean;
    index: number;
    onPress: () => void;
}

const BranchCard: React.FC<BranchCardProps> = ({
    branchName,
    address,
    hours,
    isSelected = false,
    index,
    onPress,
}) => {
    const isEven = index % 2 === 0;

    // 🔹 Background only depends on odd / even
    const bgColor = isEven ? 'bg-green-300' : 'bg-yellow-100';

    // 🔹 Border only depends on selected
    const borderColor = isSelected ? 'border-green-600' : 'border-transparent';

    const textColor = 'text-slate-700';

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={tw`${bgColor} ${borderColor} border-2 rounded-xl p-4`}
        >
            <Text style={tw`${textColor} text-[19px] font-semibold`}>
                {branchName}
            </Text>

            <View style={tw`flex-row items-center mt-3`}>
                <SvgXml xml={location} />
                <Text style={tw`${textColor} text-[11px] ml-2`}>
                    {address}
                </Text>
            </View>

            <View style={tw`flex-row items-center mt-2`}>
                <SvgXml xml={Clockicon} />
                <Text style={tw`${textColor} text-[11px] ml-2`}>
                    {hours}
                </Text>
            </View>
        </TouchableOpacity>
    );
};



// --- Main Screen Component ---
const PayWithCash = () => {
    // Note: This component assumes the 'Poppins' font family is configured globally.
    const [selectedBranchId, setSelectedBranchId] = React.useState<number | null>(null);


    const { data, isLoading } = useGetAllBranchQuery();


    return (
        <View style={tw`flex-1  `}>
            {/* MapView acts as the background */}

            <MapView
                style={tw`absolute top-0 left-0 right-0 bottom-0`}
                initialRegion={{
                    latitude: 23.8103, // Coordinates for Dhaka
                    longitude: 90.4125,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {/* Add markers for the branches */}
                <Marker coordinate={{ latitude: 23.7925, longitude: 90.4078 }} title="Gulshan Branch" />
                <Marker coordinate={{ latitude: 23.7547, longitude: 90.3756 }} title="Dhanmondi Branch" />
            </MapView>

            {/* Bottom Sheet Container for Content */}
            <View style={tw`absolute bottom-0 left-0 right-0 h-[60%] bg-white rounded-t-3xl shadow-lg`}>
                <View style={tw` p-2  flex-row  items-center`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`p-1`}>
                        <Ionicons name="arrow-back" size={24} color="#1D0303" />
                    </TouchableOpacity>

                </View>
                <ScrollView contentContainerStyle={tw`px-5 py-3 pb-0`}>
                    <Text style={tw`text-primary text-[19px] font-normal leading-[26.6px] mb-4`}>
                        Cash Payment Branches
                    </Text>

                    {/* Warning Box */}
                    <View style={tw`bg-yellow-400/10 rounded-lg p-4 flex-row items-center mb-6`}>
                        {/* <WarningIcon /> */}
                        <Text style={tw`text-[#EAB000] text-[13px] leading-[18.2px] flex-1`}>
                            Cash must be paid at least 2 days before the event start date to confirm your slot.
                        </Text>
                    </View>

                    {/* Branch List */}
                    <View style={tw`gap-y-5`}>
                        {isLoading ? (
                            <GlobalLoading />
                        ) : (
                            data?.data?.map((branch) => (
                                <BranchCard
                                    key={branch.id}
                                    branchId={branch.id}
                                    branchName={branch.name}
                                    address={branch.address}
                                    hours={branch.working_hour}
                                    isSelected={selectedBranchId === branch.id}
                                    onPress={() => setSelectedBranchId(branch.id)}
                                />
                            ))
                        )}
                    </View>

                </ScrollView>

                {/* Confirm Button fixed at the bottom of the sheet */}
                <View style={tw`px-5 py-4 mt-auto border-t border-gray-200 mb-2`}>
                    <TouchableOpacity style={tw`bg-[#1D0303] rounded-xl py-3.5 items-center justify-center`}>
                        <Text style={tw`text-white text-base font-semibold leading-[22.4px]`}>
                            Confirm Cash Payment
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PayWithCash;