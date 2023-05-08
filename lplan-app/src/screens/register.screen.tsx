import { StatusBar } from 'expo-status-bar'; //Esto es lo que tenemos arriba del móvil, la hora la carga, etc. 
import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import ButtonGradientRegister from '../components/buttons/ButtonGradientRegister';
import MainContainer from '../components/containers/MainContainer';
import Title from '../components/texts/Title';
import { useNavigation } from '@react-navigation/native';
import Register from '../components/texts/Register';
import NormalText from '../components/texts/NormalText';
import StyledTextInputs from '../components/inputs/StyledTextInputs';
import SubTitle from '../components/texts/Subtitle';

export default function RegisterScreen() {
  
  const [inputName, setInputName] = useState('');
  const [inputSurname, setInputSurname] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigation = useNavigation();

  const data = { error: "ERROR_POST_USER" };

  return (
    <MainContainer>
    <SubTitle>Sign up to have a new account</SubTitle>
    <StyledTextInputs
          placeholder='Name'
          value={inputName}
          onChangeText={setInputName}
          />
    <StyledTextInputs
          placeholder='Surname'
          value={inputSurname}
          onChangeText={setInputSurname}         
          />
    <StyledTextInputs
          placeholder='Email'
          value={inputEmail}
          onChangeText={setInputEmail}
          />
    <StyledTextInputs
          placeholder='Password'
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry={true}
          />
    <ButtonGradientRegister onPress={() => {            
            fetch('http://192.168.15.253:3002/user', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  name: inputName,
                  surname: inputSurname,
                  email: inputEmail,
                  password:inputPassword,
                }),
            }).then((response) => response.json())
              .then((data) => {               
                console.log(data);
                if (data.error === "ERROR_POST_USER"){
                  Alert.alert(
                    'ALERT!',
                    'Error registering the account...',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false }
                    );
                }else{
                  ToastAndroid.showWithGravityAndOffset(
                    'Successful account registration',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  );
                navigation.navigate('Login' as never);
                };                                 
                
              }).catch((error) => {
                  Alert.alert(
                    'ALERT!',
                    'Error registering the account...',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false }
                    );
                console.error(error);
            });
          }} />
      <NormalText>Do you have an account?</NormalText>
      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Register>Log In!</Register>
      </TouchableOpacity>
    <StatusBar style="auto" /> 
    </MainContainer>
  );
}


