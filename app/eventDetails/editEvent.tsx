import GlobalLoading from '@/components/GlobalLoading';
import { createFormatDate, formatTimeFromParam } from '@/lib/lib';
import tw from '@/lib/tailwind';
import { useGetMySingleEventQuery, useUpdatedMySingleEventMutation } from '@/redux/createEvent/createdEventApi';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
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
  View
} from 'react-native';

/* ================= TYPES ================= */
type Prize = {
  place: string;
  percentage: string;
  percentage_amount: number;
  additional_prize: string;
};

/* ================= REUSABLE INPUTS ================= */
const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
}: any) => (
  <View style={tw`mb-5`}>
    <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>{label}</Text>
    <TextInput
      style={tw.style(`border border-[#6A3838] rounded-xl px-4 text-base`, multiline ? 'h-24 pt-3' : 'h-12')}
      placeholder={placeholder}
      placeholderTextColor="#1D0303b3"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  </View>
);

const PickerInput = ({ label, placeholder, value, onTapped }: any) => (
  <View style={tw`mb-5`}>
    <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>{label}</Text>
    <TouchableOpacity onPress={onTapped} style={tw`border border-[#6A3838] rounded-xl h-12 px-4 flex-row justify-between items-center`}>
      <Text style={tw.style(value ? 'text-[#1D0303]' : 'text-[#1D0303b3]', 'text-sm')}>{value || placeholder}</Text>
      <Ionicons name="chevron-down-outline" size={20} color="#1D0303" />
    </TouchableOpacity>
  </View>
);

const PrizeInput = ({ place, percentage, setPercentage, calculatedAmount, extraTextValue, onExtraTextChange }: any) => {
  const [showExtraInput, setShowExtraInput] = useState(false);
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

const SelectionModal = ({ visible, options, onSelect, onClose }: any) => (
  <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={tw`flex-1 justify-center items-center bg-black/50`} onPress={onClose}>
      <View style={tw`bg-white rounded-xl w-4/5`}>
        {options.map((option: string, index: number) => (
          <TouchableOpacity key={index} style={tw`p-4 border-b border-gray-200`} onPress={() => onSelect(option)}>
            <Text style={tw`text-center`}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  </Modal>
);

/* ================= MAIN SCREEN ================= */
const CreateEventScreen = () => {
  const { id } = useLocalSearchParams();
  const isEdit = Boolean(id);

  const { data, isLoading } = useGetMySingleEventQuery({ id }, { skip: !id });
  const eventData = data?.data?.event;

  const [updateEvent, { isLoading: isUpdating }] = useUpdatedMySingleEventMutation();

  const [formState, setFormState] = useState<any>({
    title: '',
    description: '',
    sport_type: '',
    sport_name: '',
    starting_date: new Date(),
    ending_date: new Date(),
    time: new Date(),
    location: '',
    number_of_player_required: '',
    number_of_player_required_in_a_team: '',
    number_of_team_required: '',
    entry_fee: '',
    prize_amount: '',
    rules_guidelines: '',
    image: null,
  });

  const [prizes, setPrizes] = useState<Prize[]>([
    { place: '1st Place', percentage: '50', percentage_amount: 0, additional_prize: '' },
    { place: '2nd Place', percentage: '30', percentage_amount: 0, additional_prize: '' },
    { place: '3rd Place', percentage: '20', percentage_amount: 0, additional_prize: '' },
  ]);

  const [showDatePicker, setShowDatePicker] = useState({ start: false, end: false, time: false });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState({ type: '', options: [] });

  /* ---------- AUTO FILL ---------- */
  useEffect(() => {
    if (!eventData) return;

    setFormState({
      title: eventData.title || '',
      description: eventData.description || '',
      sport_type: eventData.sport_type || '',
      sport_name: eventData.sport_name || '',
      // starting_date: createFormatDate(eventData.starting_date),
      // ending_date: createFormatDate(eventData.ending_date),
      // time: formatTimeFromParam(eventData.time),
      starting_date: new Date(eventData.starting_date),
      ending_date: new Date(eventData.starting_date),
      time: new Date(eventData.time),
      location: eventData.location || '',
      number_of_player_required: String(eventData.number_of_player_required || ''),
      number_of_player_required_in_a_team: String(eventData.number_of_player_required_in_a_team || ''),
      number_of_team_required: String(eventData.number_of_team_required || ''),
      entry_fee: eventData.entry_fee || '',
      prize_amount: eventData.prize_amount || '',
      rules_guidelines: eventData.rules_guidelines || '',
      image: eventData.image_url || null,
    });

    if (eventData.prize_distribution?.length) {
      setPrizes(
        eventData.prize_distribution.map((p: any) => ({
          place: p.place,
          percentage: String(p.percentage),
          percentage_amount: Number(p.percentage_amount),
          additional_prize: p.additional_prize || '',
        }))
      );
    }
  }, [eventData]);

  /* ---------- PRIZE CALC ---------- */
  useEffect(() => {
    const total = Number(formState.prize_amount) || 0;
    setPrizes(p =>
      p.map(x => ({ ...x, percentage_amount: (total * Number(x.percentage)) / 100 }))
    );
  }, [formState.prize_amount, prizes.map(p => p.percentage).join(',')]);


  /* ---------- HELPERS ---------- */
  const handleInputChange = (key: string, value: any) => setFormState(p => ({ ...p, [key]: value }));

  const updatePrize = (index: number, key: string, value: any) =>
    setPrizes(p => p.map((pr, i) => (i === index ? { ...pr, [key]: value } : pr)));

  const handleImageUpload = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!res.canceled) handleInputChange('image', res.assets[0].uri);
  };

  const onDateChange = (_: any, selected: Date | undefined, type: string) => {
    if (!selected) return setShowDatePicker({ start: false, end: false, time: false });
    switch (type) {
      case 'start': handleInputChange('starting_date', selected); break;
      case 'end': handleInputChange('ending_date', selected); break;
      case 'time': handleInputChange('time', selected); break;
    }
    setShowDatePicker({ start: false, end: false, time: false });
  };

  const openPickerModal = (type: string) => {
    if (type === 'sport_type') setModalOptions({ type, options: ['single', 'team'] });
    setModalVisible(true);
  };

  // console.log(formState.image);

  // console.log("--------------------", prizes);



  /* ---------- SUBMIT UPDATED EVENT ---------- */
  const handleUpdated = async () => {
    try {
      const formData = new FormData();

      // Append main fields
      formData.append("title", formState.title);
      formData.append("description", formState.description);
      formData.append("sport_type", formState.sport_type);
      formData.append("sport_name", formState.sport_name);
      formData.append("starting_date", createFormatDate(formState.starting_date));
      formData.append("ending_date", createFormatDate(formState.ending_date));
      formData.append("time", formatTimeFromParam(formState.time));
      formData.append("location", formState.location);

      if (formState.sport_type === "single") {
        formData.append("number_of_player_required", formState.number_of_player_required);
      } else {
        formData.append("number_of_player_required_in_a_team", formState.number_of_player_required_in_a_team);
        formData.append("number_of_team_required", formState.number_of_team_required);
      }

      formData.append("entry_fee", formState.entry_fee);
      formData.append("prize_amount", formState.prize_amount);
      formData.append("rules_guidelines", formState.rules_guidelines);

      // Append image if exists
      if (formState.image) {
        formData.append("image", {
          uri: formState.image,
          name: "event.jpg",
          type: "image/jpeg",
        } as any);
      }

      // Append prize_distribution array
      formData.append(
        "prize_distribution",
        JSON.stringify(
          prizes.map(p => ({
            place: p.place,
            percentage: Number(p.percentage),
            percentage_amount: Number(p.percentage_amount),
            additional_prize: p.additional_prize,
          }))
        )
      );


      console.log('---- FormData Contents UI ---', formData);


      // Send update via RTK mutation
      const res = await updateEvent({ formData, id }).unwrap();
      console.log('---- Updated Event Response ----', res);

      // Alert.alert("Success", isEdit ? "Event Updated" : "Event Created");
      // router.back();

    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update event");
    }
  };


  return isLoading ? <GlobalLoading /> : (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={tw`p-4 flex-row items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`p-1`}>
            <Ionicons name="arrow-back" size={24} color="#1D0303" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-RoboBold text-[#1D0303] text-center flex-1 -ml-8`}>
            {/* {isEdit ? 'Update Event' : 'Create New Event'} */}
            Update Event
          </Text>
        </View>

        <ScrollView contentContainerStyle={tw`p-5`}>
          {/* === Inputs === */}
          <FormInput label="Event Title" placeholder="Enter event title" value={formState.title} onChangeText={(val: any) => handleInputChange('title', val)} />
          <FormInput label="Description" placeholder="Describe your event" value={formState.description} onChangeText={(val: any) => handleInputChange('description', val)} multiline numberOfLines={4} />
          <FormInput label="Sport Name" placeholder="Enter sport name" value={formState.sport_name} onChangeText={(val: any) => handleInputChange('sport_name', val)} keyboardType="default" />
          <PickerInput label="Sport Type" placeholder="Select member entry type" value={formState.sport_type} onTapped={() => openPickerModal('sport_type')} />
          <PickerInput label="Starting Date" placeholder="mm/dd/yyyy" value={formState.starting_date.toLocaleDateString()} onTapped={() => setShowDatePicker({ ...showDatePicker, start: true })} />
          <PickerInput label="Ending Date" placeholder="mm/dd/yyyy" value={formState.ending_date.toLocaleDateString()} onTapped={() => setShowDatePicker({ ...showDatePicker, end: true })} />
          <PickerInput label="Time" placeholder="--:-- --" value={formState.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} onTapped={() => setShowDatePicker({ ...showDatePicker, time: true })} />
          <FormInput label="Location" placeholder="Enter event location" value={formState.location} onChangeText={(val: any) => handleInputChange('location', val)} />

          {/* Conditional fields */}
          {formState.sport_type === 'single' ? (
            <FormInput label="Number of players Required" placeholder="e.g., 14" value={formState.number_of_player_required} onChangeText={(val: any) => handleInputChange('number_of_player_required', val)} keyboardType="number-pad" />
          ) : (
            <>
              <FormInput label="Number Of Team Required" placeholder="e.g., 5" value={formState.number_of_team_required} onChangeText={(val: any) => handleInputChange('number_of_team_required', val)} keyboardType="number-pad" />
              <FormInput label="Number Of Player Required In a Team" placeholder="e.g., 4" value={formState.number_of_player_required_in_a_team} onChangeText={(val: any) => handleInputChange('number_of_player_required_in_a_team', val)} keyboardType="number-pad" />
            </>
          )}

          <FormInput label="Entry Fee ($)" placeholder="0.00" value={formState.entry_fee} onChangeText={(val: any) => handleInputChange('entry_fee', val)} keyboardType="decimal-pad" />
          <FormInput label="Prize Amount ($)" placeholder="0.00" value={formState.prize_amount} onChangeText={(val: any) => handleInputChange('prize_amount', val)} keyboardType="decimal-pad" />

          {/* Prize Distribution */}
          <View style={tw`flex-col gap-2 mb-4`}>
            {prizes.map((prize, index) => (
              <PrizeInput
                key={index}
                place={prize.place}
                percentage={prize.percentage}
                setPercentage={(val: any) => updatePrize(index, 'percentage', val)}
                calculatedAmount={prize.percentage_amount}
                extraTextValue={prize.additional_prize}
                onExtraTextChange={(val: any) => updatePrize(index, 'additional_prize', text)}
              />
            ))}
          </View>

          <FormInput label="Rules & Guidelines" placeholder="List the rules for your event" value={formState.rules_guidelines} onChangeText={(val: any) => handleInputChange('rules_guidelines', val)} multiline numberOfLines={5} />

          {/* Image Upload */}
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

          <TouchableOpacity onPress={() => handleUpdated()} style={tw`bg-[#1D0303] rounded-xl py-4 items-center`}>
            <Text style={tw`text-white text-base font-RoboBold`}>{isEdit ? 'Update Event' : 'Create Event'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Pickers */}
      {showDatePicker.start && <DateTimePicker value={formState.starting_date} mode="date" display="default" onChange={(e, d) => onDateChange(e, d, 'start')} />}
      {showDatePicker.end && <DateTimePicker value={formState.ending_date} mode="date" display="default" onChange={(e, d) => onDateChange(e, d, 'end')} />}
      {showDatePicker.time && <DateTimePicker value={formState.time} mode="time" display="default" onChange={(e, d) => onDateChange(e, d, 'time')} />}

      {/* Selection Modal */}
      <SelectionModal visible={modalVisible} options={modalOptions.options} onClose={() => setModalVisible(false)} onSelect={(val: string) => { handleInputChange(modalOptions.type, val); setModalVisible(false); }} />
    </SafeAreaView>
  );
};

export default CreateEventScreen;
