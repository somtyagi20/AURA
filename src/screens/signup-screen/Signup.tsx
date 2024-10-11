import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { colors } from '../../colors';
import  CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';


export default function Signup() {
    const [phoneCountryCode, setPhoneCountryCode] = useState<CountryCode>('FR');
    const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef<PhoneInput>(null);

    const handleCountrySelect = (country:any) => {
        setPhoneCountryCode(country.cca2);
        const newPhoneNumber = `+${country.callingCode[0]}`;
        setPhoneNumber(newPhoneNumber);
        if (phoneInput.current) {
          phoneInput.current.selectCountry(country.cca2.toLowerCase());
          phoneInput.current.setValue(newPhoneNumber);
        }
        setShowPhoneCountryPicker(false);
      };

  return (
    <View style={styles.container}>
            <PhoneInput
              ref={phoneInput}
              style={styles.input}
              initialValue={phoneNumber}
              initialCountry={phoneCountryCode.toLowerCase()}
              onPressFlag={() => setShowPhoneCountryPicker(true)}
              onChangePhoneNumber={(text) => {
                setPhoneNumber(text);
              }}
            />

            <CountryPicker
                    countryCode={phoneCountryCode}
                    visible={showPhoneCountryPicker}
                    onSelect={
                        handleCountrySelect
                    }
                    onClose={ ()=>setShowPhoneCountryPicker(false)}
                    withFlagButton={false}
                    withFilter
                    />

            <Text style={{color: 'red'}}>{phoneInput.current?.isValidNumber() ? '' : 'Please enter a valid number'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: '100%',
      },
      signup: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.background,
        marginLeft: 30,
        marginTop: 30,
      },
      input: {
        width: '80%',
        height: 60,
        backgroundColor: 'black',
        padding: 10,
        color: 'white',
        fontSize: 20,
      },
});
