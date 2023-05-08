import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import StyledTextInputs from "../../components/inputs/StyledTextInputs";
import { TouchableOpacity, StatusBar, TextInput, Platform, Button, ScrollView } from "react-native";
import ButtonGradientRegister from "../../components/buttons/ButtonGradientRegister";
import MainContainer from "../../components/containers/MainContainer";
import NormalText from "../../components/texts/NormalText";
import Register from "../../components/texts/Register";
import SubTitle from "../../components/texts/Subtitle";
import { User } from "../../models/user.model";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";

import './register.screen.css';

export default function RegisterScreen() {
  const [user, setUser] = useState<User>({
    appUser: '',
    nameUser: '',
    surnameUser: '',
    mailUser: '',
    passwordUser: '',
    photoUser: 'photo.jpg',
    birthdateUser: new Date(),
    genderUser: 'male',
    ocupationUser: '',
    descriptionUser: '',
    roleUser: 'common',
    privacyUser: false,
    deletedUser: false,
  });

  const navigation = useNavigation();

  const handleInputChange = (field: string, value: string | Date | boolean) => {
    setUser({ ...user, [field]: value });
  };

  const [date, setDate] = useState(user.birthdateUser);



  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    handleInputChange('birthdateUser', currentDate);
  };

  
  return (
    <ScrollView>
      <MainContainer>
      <SubTitle>Join the @lplan Family!</SubTitle>
      <StyledTextInputs
        placeholder='nickname'
        value={user.appUser}
        onChangeText={(value:any) => handleInputChange('appUser', value)}
      />
      <StyledTextInputs
        placeholder='Name'
        value={user.nameUser}
        onChangeText={(value:any) => handleInputChange('nameUser', value)}
      />
      <StyledTextInputs
        placeholder='Surname'
        value={user.surnameUser}
        onChangeText={(value:any) => handleInputChange('surnameUser', value)}
      />
      <StyledTextInputs
        placeholder='Email'
        value={user.mailUser}
        onChangeText={(value:any) => handleInputChange('mailUser', value)}
      />
      <StyledTextInputs
        placeholder='Password'
        value={user.passwordUser}
        onChangeText={(value:any) => handleInputChange('passwordUser', value)}
        secureTextEntry={true}
      />
      <StyledTextInputs
        placeholder='Photo'
        value={user.photoUser}
        onChangeText={(value:any) => handleInputChange('photoUser', value)}
      />
      <>
      <Button title="Select Date" onPress={() => setShowPicker(true)} />
      {showPicker && (
        Platform.OS === 'ios' ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        ) : (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={handleDateChange}
          />
        )
      )}
    </>
      <Picker
        selectedValue={user.genderUser}
        onValueChange={(itemValue:any, itemIndex:any) => {
          handleInputChange('genderUser', itemValue);
        }}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      
      <StyledTextInputs
        placeholder='Occupation'
        value={user.ocupationUser}
        onChangeText={(value:any) => handleInputChange('ocupationUser', value)}
      />
      <StyledTextInputs
        placeholder='Description'
        value={user.descriptionUser}
        onChangeText={(value:any) => handleInputChange('descriptionUser', value)}
      />
      <StyledTextInputs
        placeholder='Role'
        value={user.roleUser}
        onChangeText={(value:any) => handleInputChange('roleUser', value)}
      />
      <Picker
        selectedValue={user.privacyUser}
        onValueChange={(itemValue:any, itemIndex:any) => {
          handleInputChange('privacyUser', itemValue);
        }}
      >
        <Picker.Item label="Private" value={true}/>
        <Picker.Item label="Public" value={false} />
      </Picker>

      <ButtonGradientRegister
        onPress={() => {
          AuthService.register(user)
            .then((response: any) => {
              console.log(user);
              console.log(response);
              console.log(response.status);
              if (response.status === 200) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  customClass: {
                    icon: 'swal-icon-color',
                    title: 'swal-title-font',
                    popup: 'swal-popup-width'
                  },
                  title: 'Register Succesful!',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 1000,
                  iconColor: '#000',
                  background: '#66fcf1',
                  backdrop: `rgba(0,0,0,0.8)`
                }).then(() => {
                  window.location.href = '/login';
                });
              }
            })
            .catch((error: any) => {
              console.error(error);
              console.log(error.status);
              console.log(error.response);
              Swal.fire({
                position: 'center',
                icon: 'info',
                customClass: {
                  icon: 'swal-icon-color',
                  title: 'swal-title-font',
                  popup: 'swal-popup-width'
                },
                title: 'This User already exists!',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000,
                iconColor: '#000',
                background: '#66fcf1',
                backdrop: `rgba(0,0,0,0.8)`
              }).then(() => {
                window.location.href = '/login';
              });
            });
        }}
      />
      <NormalText>Do you have an account?</NormalText>
      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Register>Log In!</Register>
      </TouchableOpacity>
    </MainContainer>

    </ScrollView>
  );
}