import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import LogOut from '../components/LogOut';

const Tab = createMaterialTopTabNavigator();

const BottomTab = ({ navigation }) => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 14 }, 
      tabBarIndicatorStyle: { backgroundColor: 'black' } 
    }}>
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
};

export default BottomTab; 