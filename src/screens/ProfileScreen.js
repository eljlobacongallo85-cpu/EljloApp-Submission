import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { ROUTES } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileCompleted, resetLogin } from '../app/reducers/auth';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { data } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logout = () => dispatch(resetLogin());

  useEffect(() => {
    dispatch(getUserProfileCompleted(data));
  }, [dispatch, data]);

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
        <Text className="mb-2 text-[34px] font-bold text-white">Profile</Text>
        <Text className="mb-1 text-[13px] text-white/90">Logged in as:</Text>
        <Text className="mb-[22px] text-[15px] font-semibold text-white">
          {data?.email || data?.username || 'User'}
        </Text>

        <Pressable
          className="mb-2.5 h-11 w-full items-center justify-center rounded-3xl bg-white"
          onPress={() => navigation.navigate(ROUTES.HOME)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ zIndex: 2, elevation: 2 }}
        >
          <Text className="text-base font-semibold text-[#4a22a3]">Back To Home</Text>
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

export default ProfileScreen;
