import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StatusBar, Text, View } from 'react-native';
import { IMG, ROUTES } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';

const HomeScreen = () => {
  const { data } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logout = () => dispatch(resetLogin());

  return (
    <View
      className="flex-1 items-center justify-center bg-[#5f2db8] px-6"
      pointerEvents="box-none"
    >
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

      <View
        className="w-full max-w-[340px] items-center rounded-[14px] border border-white/20 bg-[rgba(142,85,219,0.45)] px-5 py-7"
        style={{ zIndex: 1 }}
        pointerEvents="box-none"
      >
        <Image source={{ uri: IMG.LOGO }} className="mb-3 h-[120px] w-[120px] rounded-full" />
        <Text className="mb-2 text-[34px] font-bold text-white">Home</Text>
        <Text className="mb-[18px] text-[13px] text-white/95">
          Welcome, {data?.email || data?.username || 'User'}
        </Text>

        <Pressable
          className="mb-2.5 h-11 w-full items-center justify-center rounded-3xl bg-white"
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ zIndex: 2, elevation: 2 }}
        >
          <Text className="text-base font-semibold text-[#4a22a3]">Go To Profile</Text>
        </Pressable>

        <Pressable
          className="h-11 w-full items-center justify-center rounded-3xl border border-white/35 bg-white/20"
          onPress={logout}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ zIndex: 2, elevation: 2 }}
        >
          <Text className="text-[15px] font-semibold text-white">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
