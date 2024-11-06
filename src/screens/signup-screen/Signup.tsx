import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from '../../validations/auth-validations/signup-validation';
import { useNavigation } from '@react-navigation/native';
import { TAuthNavigator } from '../../navigation/auth-navigator/AuthNavigator';

export default function Signup(){
  const navigation = useNavigation<TAuthNavigator>();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    navigation.navigate('Home');
  };
  return (
      <View style={styles.container}>
         <Text style={styles.signup}>Create an account</Text>
         <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Enter Your mobile number :</Text>
          <Controller
          control={control}
          name="phone_number"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            style={styles.inputBox}
            placeholder="+91 Mobile Number"
            placeholderTextColor= {colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          )}
        />
        {errors.phone_number && <Text style={styles.errorText}>{errors.phone_number.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Enter Your Full Name :</Text>
          <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            style={styles.inputBox}
            placeholder="Full Name"
            placeholderTextColor= {colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Enter Password :</Text>
          <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            style={styles.inputBox}
            placeholder="Password"
            placeholderTextColor= {colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Confirm Password :</Text>
          <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            style={styles.inputBox}
            placeholder="Confirm Password"
            placeholderTextColor= {colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          )}
        />
        {errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password.message}</Text>}
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
            <LinearGradient
              colors={[colors.color2,colors.color1]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.signInBtnContainer}>
              <Text style={styles.signInBtn}>Sign Up</Text>
            </LinearGradient>
      </TouchableOpacity>
      <View style={styles.alreadyHadAnAccountContainer}>
        <Text>Already had an account? </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('Login')}}>
          <Text style={styles.alreadyHadAnAccount}>Login</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      signup: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginLeft: 30,
        marginTop: 30,
      },
      inputContainer: {
        height: 75,
        backgroundColor: 'black',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        color: 'white',
        fontSize: 15,
        borderRadius: 7,
      },
      inputBox: {
        backgroundColor: colors.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.secondary,
        paddingLeft: 20,
      },
      inputText: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10,
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
      alreadyHadAnAccountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 30,
        top: 75,
      },
      alreadyHadAnAccount: {
        color: colors.btn,
        fontSize: 15,
      },
      errorText: {
        color: 'red',
        fontSize: 12,
      },
});
