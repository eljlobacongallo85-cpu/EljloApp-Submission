import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../app/reducers/auth';

const Login = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage, data } = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (isError) {
      Alert.alert('Incorrect Credentials', errorMessage || 'Login failed.');
    }
  }, [isError, errorMessage]);

  useEffect(() => {
    if (data) {
      Alert.alert('Login Success', 'Welcome to HomeScreen.');
    }
  }, [data]);

  const onLogin = () => {
    dispatch(
      userLogin({
        identifier: emailAdd,
        password,
      }),
    );
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
        <Text className="mb-5 text-center text-4xl font-bold text-white">Login</Text>

        <View className="mb-3 rounded-3xl border border-white/25 bg-white/10 px-3.5">
          <TextInput
            placeholder="Username or Email"
            placeholderTextColor="#ded8ff"
            value={emailAdd}
            onChangeText={setEmailAdd}
            className="h-11 text-[15px] text-white"
            autoCapitalize="none"
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

        <View className="mb-4 mt-1 flex-row items-center justify-between">
          <Pressable
            className="flex-row items-center"
            onPress={() => setRememberMe(prev => !prev)}
          >
            <View
              className={`h-3 w-3 rounded-[2px] border border-white ${
                rememberMe ? 'bg-white' : 'bg-transparent'
              }`}
            />
            <Text className="ml-2 text-xs text-white">Remember me</Text>
          </Pressable>
          <Text className="text-xs text-white underline">Forgot password?</Text>
        </View>

        <Pressable
          className="mb-[18px] h-11 items-center justify-center rounded-3xl bg-white"
          onPress={onLogin}
          disabled={isLoading}
        >
          <Text className="text-base font-semibold text-[#4a22a3]">Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text className="mb-[18px] text-center text-[13px] text-white">
            Don&apos;t have an account? <Text className="font-bold underline">Register</Text>
          </Text>
        </Pressable>

        <Text className="mb-1 text-center text-xs text-white/90">Cafe web app login</Text>
        <Text className="text-center text-[11px] text-white/85">
          Use the same credentials as your cafe website.
        </Text>
      </View>
    </View>
  );
};

export default Login;
