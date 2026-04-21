import { useState } from 'react';
import { Alert, Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ROUTES } from '../../utils';
import { apiRequest } from '../../utils/api';

const Register = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const onRegister = async () => {
    if (!emailAdd.trim() || !password || !confirmPassword) {
      Alert.alert('Missing Details', 'Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Password and confirm password must match.');
      return;
    }

    try {
      const response = await apiRequest('/register', 'POST', {
        email: emailAdd,
        password,
      });

      if (!response?.ok) {
        Alert.alert(
          'Registration Failed',
          response?.message || 'Email already exists or input is invalid.',
        );
        return;
      }
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error?.message || 'Email already exists or input is invalid.',
      );
      return;
    }

    Alert.alert('Success', 'Account created. You can now log in.');
    navigation.navigate(ROUTES.LOGIN);
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#5f2db8] px-6">
      <StatusBar barStyle="light-content" />
      <View
        className="absolute right-[-80px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#8149de] opacity-50"
        pointerEvents="none"
        style={{ zIndex: -1 }}
      />
      <View
        className="absolute bottom-[-150px] left-[-90px] h-[300px] w-[300px] rounded-full bg-[#3e1785] opacity-65"
        pointerEvents="none"
        style={{ zIndex: -1 }}
      />

      <View className="w-full max-w-[340px] rounded-[14px] border border-white/20 bg-[rgba(142,85,219,0.45)] px-5 py-7">
        <Text className="mb-5 text-center text-[34px] font-bold text-white">
          Register
        </Text>

        <View className="mb-3 rounded-3xl border border-white/25 bg-white/10 px-3.5">
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ded8ff"
            value={emailAdd}
            onChangeText={setEmailAdd}
            className="h-11 text-[15px] text-white"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-3 rounded-3xl border border-white/25 bg-white/10 px-3.5">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ded8ff"
            value={password}
            onChangeText={setPassword}
            className="h-11 text-[15px] text-white"
            secureTextEntry
          />
        </View>

        <View className="mb-3 rounded-3xl border border-white/25 bg-white/10 px-3.5">
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ded8ff"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            className="h-11 text-[15px] text-white"
            secureTextEntry
          />
        </View>

        <Pressable
          className="mb-4 mt-2 h-11 items-center justify-center rounded-3xl bg-white"
          onPress={onRegister}
        >
          <Text className="text-base font-semibold text-[#4a22a3]">
            Create Account
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate(ROUTES.LOGIN)}>
          <Text className="text-center text-[13px] text-white">
            Already have an account? <Text className="font-bold underline">Login</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;
