import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidationSchema } from '../../validations/auth-validations/login-validation';


export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>
      Login
      </Text>
      <View style={styles.inputContainer}>
      <View style={styles.inputTextContainer}>
        <Text>Enter Your Email:</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor= {colors.primary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
         />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      </View>
      <View style={styles.inputTextContainer}>
        <Text>Enter Password:</Text>
        <View style={styles.passwordContainer}>
        <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={[styles.inputText,styles.input]}
              placeholder="Password"
              placeholderTextColor= {colors.primary}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              />
          )}
          />
            <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.passwordToggle}>
                    <Icon
                      name={passwordVisible ? 'eye' : 'eye-slash'}
                      size={20}
                      color= {colors.primary}
                    />
            </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
            <LinearGradient
              colors={[colors.color2,colors.color1]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.signInBtnContainer}>
              <Text style={styles.signInBtn}>Sign In</Text>
            </LinearGradient>
      </TouchableOpacity>
      <View style={styles.changePasswordContainer}>
        <Text>Forgot password? </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {console.log('change password')}}>
          <Text style={styles.changePassword}>Change Password</Text>
        </TouchableOpacity>
          
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%',
  },
  login: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 30,
    marginTop: 30,
  },
  inputContainer:{
    marginTop: 50,
    marginHorizontal: 30,
    gap: 25,
  },
  inputTextContainer:{
    gap: 18,
  },
  inputText: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingLeft: 20,
  },
  signInBtnContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 30,
  },
  signInBtn: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },
  changePasswordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
    top: 330,
  },
  changePassword: {
    color: colors.btn,
    fontSize: 15,
  },
  passwordToggle: {
    position: 'absolute',
    right: wp('6%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: hp('6.5%'),
    width: '100%',
    opacity: 0.9,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  }
});
