import { createFormatDate, formatTimeFromParam } from '@/lib/lib';
import tw from '@/lib/tailwind';
import { useCreateEventMutation } from '@/redux/createEvent/createdEventApi';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Reusable Form Components ---


type Prize = {
  place: string;
  percentage: string;
  percentage_amount: number;
  additional_prize: string;
};

const FormInput: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  multiline?: boolean;
  numberOfLines?: number;
}> = ({ label, placeholder, value, onChangeText, keyboardType = 'default', multiline = false, numberOfLines = 1 }) => (
  <View style={tw`mb-5`}>
    <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>{label}</Text>
    <TextInput
      style={tw.style(
        `border  border-[#6A3838] rounded-xl px-4 text-base`,
        multiline ? 'h-24 pt-3' : 'h-12'
      )}
      placeholder={placeholder}
      placeholderTextColor="#1D0303b3"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType as any}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  </View>
);

const PickerInput = ({ label, placeholder, value, onTapped }: { label: string; placeholder: string; value: string; onTapped: any }) => (
  <View style={tw`mb-5`}>
    <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>{label}</Text>
    <TouchableOpacity onPress={onTapped} style={tw`border border-[#6A3838] rounded-xl h-12 px-4 flex-row justify-between items-center`}>
      <Text style={tw.style(value ? 'text-[#1D0303]' : 'text-[#1D0303b3]', 'text-sm')}>{value || placeholder}</Text>
      <Ionicons name="chevron-down-outline" size={20} color="#1D0303" />
    </TouchableOpacity>
  </View>
);

const PrizeInput = ({
  place,
  percentage,
  setPercentage,
  calculatedAmount,
  extraTextValue,
  onExtraTextChange,
}: {
  place: string;
  percentage: string;
  setPercentage: (text: string) => void;
  calculatedAmount: number;
  extraTextValue: string;
  onExtraTextChange: (text: string) => void;
}) => {
  const [showExtraInput, setShowExtraInput] = useState(false);

  console.log(calculatedAmount,
    extraTextValue,);


  return (
    <View style={tw`mb-4`}>
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <Text style={tw`text-sm text-[#1D0303]`}>{place}</Text>

        <View style={tw`flex-row items-center border border-[#6A3838] rounded-lg h-9 w-30`}>
          <TextInput
            style={tw`flex-1 px-3 py-2 text-sm text-center`}
            value={percentage}
            onChangeText={setPercentage}
            keyboardType="number-pad"
          />
          <Text style={tw`text-lg text-gray-500 pr-3`}> % </Text>
        </View>

        <TouchableOpacity
          style={tw`bg-[#1D0303] rounded-lg h-9 w-30 items-center justify-center`}
          onPress={() => setShowExtraInput(prev => !prev)}
        >
          <Text style={tw`text-sm text-white`}>Add Text</Text>
        </TouchableOpacity>

        <Text style={tw`text-sm font-RoboMedium text-[#1D0303]`}>
          ${calculatedAmount.toFixed(2)}
        </Text>
      </View>

      {showExtraInput && (
        <TextInput
          style={tw`border border-gray-300 rounded-lg h-10 px-3 text-sm mb-2`}
          placeholder="Enter text"
          value={extraTextValue}
          onChangeText={onExtraTextChange}
        />
      )}
    </View>
  );
};


const SelectionModal = ({ visible, options, onSelect, onClose }: { visible: boolean; options: string[]; onSelect: (option: string) => void; onClose: () => void; }) => (
  <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={tw`flex-1 justify-center items-center bg-black/50`} onPress={onClose}>
      <View style={tw`bg-white rounded-xl w-4/5`}>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={tw`p-4 border-b border-gray-200`} onPress={() => onSelect(option)}>
            <Text style={tw`text-center`}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  </Modal>
);

// --- Main Screen ---
const CreateEventScreen: React.FC = () => {


  const [createEvent, { isLoading }] = useCreateEventMutation();


  const [formState, setFormState] = useState({
    title: '', description: '', sport_type: '', sport_name: '',
    starting_date: new Date(), ending_date: new Date(), time: new Date(), location: '',
    number_of_player_required: '', entry_fee: '', prize_amount: '',
    rules_guidelines: '', image: null as string | null,
    prize1st: '50', prize2nd: '30', prize3rd: '20',
    number_of_team_required: '', number_of_player_required_in_a_team: ''
  });
  const [warning, setWarning] = useState<number | undefined>();


  const [prizes, setPrizes] = useState<Prize[]>([
    { place: '1st Place', percentage: formState.prize1st, percentage_amount: 0, additional_prize: '' },
    { place: '2nd Place', percentage: formState.prize2nd, percentage_amount: 0, additional_prize: '' },
    { place: '3rd Place', percentage: formState.prize3rd, percentage_amount: 0, additional_prize: '' },
  ]);


  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < prizes.length; i++) {
      sum += parseFloat(prizes[i].percentage || '0');
    }
    setWarning(sum)
  }, [prizes]);



  useEffect(() => {
    const totalPrize = parseFloat(formState.prize_amount) || 0;

    setPrizes(prev =>
      prev.map(p => ({
        ...p,
        percentage_amount:
          totalPrize * (parseFloat(p.percentage || '0')) / 100,
      }))
    );
  }, [
    formState.prize_amount,
    prizes.map(p => p.percentage).join(','),
  ]);




  //  percentage change and  , calculatedAmount auto update 
  const updatePrize = (index: number, field: keyof Prize, value: string) => {
    const updated = [...prizes];
    updated[index][field] = value;

    setPrizes(updated);
  };



  // const [prizeCalculations, setPrizeCalculations] = useState({ first: 0, second: 0, third: 0 });
  const [showDatePicker, setShowDatePicker] = useState({ start: false, end: false, time: false });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState({ type: '', options: [] as string[] });



  const handleInputChange = (field: string, value: any) => {
    setFormState(prevState => ({ ...prevState, [field]: value }));
  };

  const onDateChange = (event: any, selectedDate: Date | undefined, field: 'start' | 'end' | 'time') => {
    const currentDate = selectedDate || (field === 'time' ? formState.time : formState.starting_date);
    setShowDatePicker({ start: false, end: false, time: false });
    if (field === 'start') handleInputChange('starting_date', currentDate);
    if (field === 'end') handleInputChange('ending_date', currentDate);
    if (field === 'time') handleInputChange('time', currentDate);
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      handleInputChange('image', result.assets[0].uri);
    }
  };

  const openPickerModal = (type: 'sport_type') => {
    const options = ['single', 'team']
    setModalOptions({ type, options });
    setModalVisible(true);
  };

  console.log(formatTimeFromParam(formState?.time));



  const handleCreateEvent = async () => {
    const formData = new FormData();

    formData.append("title", formState.title);
    formData.append("description", formState.description);
    // formData.append("sport_type", "single");
    formData.append("sport_type", formState.sport_type);
    formData.append("sport_name", formState?.sport_name);
    formData.append("starting_date", createFormatDate(formState.starting_date));
    formData.append("ending_date", createFormatDate(formState.ending_date));
    formData.append("time", formatTimeFromParam(formState?.time));
    formData.append("location", formState.location);

    if (formState.sport_type === "single") {
      formData.append(
        "number_of_player_required",
        formState.number_of_player_required
      );
    } else {
      formData.append(
        "number_of_player_required_in_a_team",
        formState.number_of_player_required_in_a_team
      );
      formData.append(
        "number_of_team_required",
        formState.number_of_team_required
      );
    }




    formData.append("entry_fee", formState.entry_fee);
    formData.append("prize_amount", formState.prize_amount);
    formData.append("rules_guidelines", formState?.rules_guidelines);

    // image
    if (formState.image) {
      formData.append("image", {
        uri: formState.image,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any);
    }

    // prize_distribution array
    formData.append(
      "prize_distribution",
      JSON.stringify(
        prizes.map(p => ({
          place: p.place,
          percentage: Number(p.percentage),
          additional_prize: p.additional_prize,
          percentage_amount: Number(p.percentage_amount),
        }))
      )
    );


    try {
      const res = await createEvent(formData).unwrap();
      console.log("Response:", res);
    } catch (err) {
      console.error("Error:", err);
    }
  };




  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <View style={tw`p-4 flex-row items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-1`}>
            <Ionicons name="arrow-back" size={24} color="#1D0303" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-RoboBold text-[#1D0303] text-center flex-1 -ml-8`}>
            Create New Event
          </Text>
        </View>

        <ScrollView contentContainerStyle={tw`p-5`}>
          <FormInput label="Event Title" placeholder="Enter event title" value={formState.title} onChangeText={(val) => handleInputChange('title', val)} />
          <FormInput label="Description" placeholder="Describe your event" value={formState.description} onChangeText={(val) => handleInputChange('description', val)} multiline numberOfLines={4} />

          {/* <PickerInput label="Sport Type" placeholder="Select a sport" value={formState.sportType} onTapped={() => openPickerModal('sportType')} /> */}
          <FormInput label="Sport Name" placeholder="Enter sport name" value={formState.sport_name} onChangeText={(val) => handleInputChange('sport_name', val)} keyboardType="default" />
          <PickerInput label="Sport Type" placeholder="Select member entry type" value={formState.sport_type} onTapped={() => openPickerModal('sport_type')} />

          <PickerInput label="Starting Date" placeholder="mm/dd/yyyy" value={formState.starting_date.toLocaleDateString()} onTapped={() => setShowDatePicker({ ...showDatePicker, start: true })} />
          <PickerInput label="Ending Date" placeholder="mm/dd/yyyy" value={formState.ending_date.toLocaleDateString()} onTapped={() => setShowDatePicker({ ...showDatePicker, end: true })} />
          <PickerInput label="Time" placeholder="--:-- --" value={formState.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} onTapped={() => setShowDatePicker({ ...showDatePicker, time: true })} />

          <FormInput label="Location" placeholder="Enter event location" value={formState.location} onChangeText={(val) => handleInputChange('location', val)} />





          {formState.sport_type === "single" ? (
            <FormInput
              label="Number of players Required"
              placeholder="e.g., 14"
              value={formState.number_of_player_required}
              onChangeText={(val) =>
                handleInputChange("number_of_player_required", val)
              }
              keyboardType="number-pad"
            />
          ) : (
            <>
              <FormInput
                label="Number Of Team Required"
                placeholder="e.g., 5"
                value={formState.number_of_team_required}
                onChangeText={(val) =>
                  handleInputChange("number_of_team_required", val)
                }
                keyboardType="number-pad"
              />

              <FormInput
                label="Number Of Player Required In a Team"
                placeholder="e.g., 4"
                value={formState.number_of_player_required_in_a_team}
                onChangeText={(val) =>
                  handleInputChange("number_of_player_required_in_a_team", val)
                }
                keyboardType="number-pad"
              />
            </>
          )}



          <FormInput label="Entry Fee ($)" placeholder="0.00" value={formState.entry_fee} onChangeText={(val) => handleInputChange('entry_fee', val)} keyboardType="decimal-pad" />
          <FormInput label="Prize Amount ($)" placeholder="0.00" value={formState.prize_amount} onChangeText={(val) => handleInputChange('prize_amount', val)} keyboardType="decimal-pad" />

          <ScrollView contentContainerStyle={{}}>
            <View style={tw`flex-col gap-2 mb-4`} >

              {prizes.map((prize, index) => (
                <PrizeInput
                  key={index}
                  place={prize.place}
                  percentage={prize.percentage}
                  setPercentage={(val) => updatePrize(index, 'percentage', val)}
                  calculatedAmount={prize.percentage_amount} // auto updated
                  extraTextValue={prize.additional_prize}
                  onExtraTextChange={(text) => updatePrize(index, 'additional_prize', text)}
                />
              ))}

              <View >
                {parseFloat(warning) > 100 ? (
                  <Text style={{ color: 'red', fontSize: 12 }}>
                    Percentage cannot exceed 100%
                  </Text>
                ) : parseFloat(warning) < 100 && parseFloat(warning) > 0 ? (
                  <Text style={{ color: 'orange', fontSize: 12 }}>
                    Percentage is less than 100%
                  </Text>
                ) : null}
              </View>

            </View>


          </ScrollView>

          <FormInput
            label="Rules & Guidelines"
            placeholder="List the rules for your event"
            value={formState.rules_guidelines}
            onChangeText={(val) => handleInputChange('rules_guidelines', val)}
            multiline
            numberOfLines={5}
          />

          <View style={tw`mb-8`}>
            <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>Upload Event Image</Text>
            <TouchableOpacity onPress={handleImageUpload} style={tw`border border-[#6A3838] rounded-xl h-12 px-4 flex-row items-center`}>
              <View style={tw`bg-gray-200 px-3 py-1 rounded-md`}>
                <Text style={tw`text-sm`}>Choose file</Text>
              </View>
              <Text style={tw`ml-3 text-gray-600`}>{formState.image ? 'Image Selected' : 'No file chosen'}</Text>
            </TouchableOpacity>
            {formState.image && <Image source={{ uri: formState.image }} style={tw`w-full h-48 rounded-lg mt-4`} />}
          </View>

          <TouchableOpacity onPress={() => handleCreateEvent()} style={tw`bg-[#1D0303] rounded-xl py-4 items-center`}>
            <Text style={tw`text-white text-base font-RoboBold`}>Create Event</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {showDatePicker.start && <DateTimePicker value={formState.starting_date} mode="date" display="default" onChange={(e, d) => onDateChange(e, d, 'start')} />}
      {showDatePicker.end && <DateTimePicker value={formState.ending_date} mode="date" display="default" onChange={(e, d) => onDateChange(e, d, 'end')} />}
      {showDatePicker.time && <DateTimePicker value={formState.time} mode="time" display="default" onChange={(e, d) => onDateChange(e, d, 'time')} />}
      <SelectionModal visible={modalVisible} options={modalOptions.options} onClose={() => setModalVisible(false)} onSelect={(val) => { handleInputChange(modalOptions.type, val); setModalVisible(false); }} />
    </SafeAreaView>
  );
};

export default CreateEventScreen;

