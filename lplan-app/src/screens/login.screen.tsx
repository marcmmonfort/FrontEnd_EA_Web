import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import ButtonGradient from '../components/buttons/ButtonGradient';
import MainContainer from '../components/containers/MainContainer';
import SubTitle from '../components/texts/Subtitle';
import Title from '../components/texts/Title';
import NormalText from '../components/texts/NormalText';
import Register from '../components/texts/Register';
import { useNavigation } from '@react-navigation/native';
import Svg, {SvgProps, Path, G, Defs, Pattern, Use, Image,} from "react-native-svg"
import StyledTextInputs from '../components/inputs/StyledTextInputs';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth.model';
import Swal from 'sweetalert2';

function LoginScreen() {
  
  const navigation = useNavigation();

  //const [formData, setFormData] = useState<Auth>({ mailUser: '', passwordUser: '' });

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  
  function SvgTop(){
    return (
      <Svg
      width={171}
      height={150}
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      //xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Path fill="url(#a)" d="M0 0h171v150H0z" />
      <Defs>
        <Pattern
          id="a"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#b" transform="scale(.0014 .00159)" />
        </Pattern>
        <Image
          id="b"
          width={715}
          height={630}
          xlinkHref=""
        />
      </Defs>
    </Svg>
  )

  }

  return (
      <MainContainer>
      <SvgTop/>
      <Title>Hello!</Title>
      <SubTitle>Sign in with your account</SubTitle>
      <StyledTextInputs 
        placeholder = 'Mail'
        value = {inputEmail}
        onChangeText = {setInputEmail}
        />         
      <StyledTextInputs 
        placeholder = 'Password' 
        value = {inputPassword} 
        onChangeText = {setInputPassword}
        secureTextEntry={true}
        />   
      <NormalText>Forgot your password?</NormalText>
      <ButtonGradient onPress={() => {
        const formData: Auth = {
          mailUser: inputEmail,
          passwordUser: inputPassword,
        };
        
        console.log("formData " + formData.mailUser)
        console.log("formData " + formData.passwordUser)
        AuthService.login(formData)
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                customClass: {
                  icon: 'swal-icon-color'
                },
                title: 'LogIn succesful!',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500,
                backdrop: `
                  rgba(0,0,0,0.8)
                `}).then(() => {
                  navigation.navigate('Home' as never);  
                });

              }
          })
          .catch((error) => {
            console.error("error: " + error);
            console.log("error.response: " + error.response)
            switch (error.response.status) {
              case 403:
                // Poner aquí el alert ...
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  customClass: {
                    icon: 'swal-icon-color'
                  },
                  title: 'Incorrect Password!',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 1500,
                  backdrop: `
                    rgba(0,0,0,0.8)
                  `
                });
                break;
          }
        });
      }} />
      <NormalText>Don't have an account?</NormalText>
      <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
        <Register>Sign Up!</Register>
      </TouchableOpacity>
      <StatusBar style="auto" /> 
    </MainContainer>
  )
}

export default LoginScreen;

